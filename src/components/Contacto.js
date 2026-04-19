"use client"
import React from "react";
import FranjaAzul from "./FranjaAzul";
import {useForm} from 'react-hook-form';
import { formatearRut, validarRut } from "../helpers/rut-helpers";
const codigoUnidadDefault = "5401";

export default function Contacto({ titulo = "Formulario de Contacto", border = false, isCotizacion=false, servicio="", tiposDeContacto, strapiApiUrl, codigoUnidad = codigoUnidadDefault, accionInicial = null}) {

  // Buscar el documentId del tipo de contacto que coincida con la acción inicial
  const defaultTipoConsulta = React.useMemo(() => {
    if (!accionInicial || !tiposDeContacto) return "0";
    const tipo = tiposDeContacto.find(t => t.Tipo?.toLowerCase() === accionInicial.toLowerCase());
    return tipo?.documentId || "0";
  }, [accionInicial, tiposDeContacto]);

  const { register, formState: {errors}, handleSubmit, setValue, watch, setError, clearErrors, reset } = useForm({
    defaultValues: {
      tipo_consulta: defaultTipoConsulta
    }
  })

  const watchRut = watch("rut_empresa", false);
  const watchEmpresaExtranjera = watch("empresa_extranjera", false);

  // Estado para manejar el toast
  const [toast, setToast] = React.useState({ show: false, message: '', type: 'success' });

  // Estado para manejar el loading durante el envío
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  // Estado para manejar el loading de consulta de RUT
  const [isConsultingRut, setIsConsultingRut] = React.useState(false);

  // Limpiar el timeout del toast al desmontar para evitar memory leaks
  React.useEffect(() => {
    let timeoutId;

    if (toast.show) {
      timeoutId = setTimeout(() => {
        setToast({ show: false, message: '', type: 'success' });
      }, 3000);
    }

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [toast.show]);

  // Función para mostrar toast
  const showToast = (message, type = 'success') => {
    setToast({ show: true, message, type });
  };

  // Efecto para manejar cambios en el checkbox empresa extranjera
  React.useEffect(() => {
    if (watchEmpresaExtranjera) {
      // Si se marca el checkbox: desactivar campo RUT y establecer "extranjero"
      setValue("rut_empresa", "extranjero");
      clearErrors("rut_empresa");
    } else {
      // Si se desmarca el checkbox: reactivar campo RUT y limpiar valor
      setValue("rut_empresa", "");
    }
  }, [watchEmpresaExtranjera, setValue, clearErrors]);

  const handleOnSubmit = async (data) => {
    // Prevenir múltiples envíos
    if (isSubmitting) return;

    setIsSubmitting(true);

    try {

      // Determinar la URL del endpoint según si es cotización o contacto
      const endpoint = isCotizacion ? '/api/cotizador' : '/api/contacto';

      const body = {
        tipo_contacto: data.tipo_consulta,
        rut_empresa: data.rut_empresa.replaceAll(".",""),
        empresa: data.empresa,
        persona: data.persona,
        cargo: data.cargo,
        email: data.email,
        telefono: data.telefono,
        consulta: data.consulta,
        servicio: servicio,
        codigo_unidad: codigoUnidad 
      }
      const response = await fetch(strapiApiUrl + endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body)
      });
      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`);
      }

      const result = await response.json();

      // Mostrar toast de éxito
      showToast('Formulario enviado correctamente', 'success');

      // Resetear el formulario después del envío exitoso
      reset();

    } catch (error) {
      console.error('Error al enviar formulario:', error);
      // Mostrar toast de error
      showToast('Error al enviar el formulario. Por favor, inténtelo nuevamente.', 'error');
    } finally {
      setIsSubmitting(false);
    }
  }

  // Handler para formatear RUT en tiempo real
  const handleRutChange = (e) => {
    const valor = e.target.value;
    const rutFormateado = formatearRut(valor);
    setValue("rut_empresa", rutFormateado);
  }

  // Handler para validar RUT cuando pierde el foco
  const handleRutBlur = async (e) => {
    const valor = e.target.value;
    const empresaExtranjera = watch("empresa_extranjera");
    
    // Limpiar errores previos
    clearErrors("rut_empresa");
    
    // Si es empresa extranjera, no validar RUT
    if (empresaExtranjera) {
      return;
    }
    
    // Si el campo está vacío, no validar (la validación required se encarga)
    if (!valor || valor.trim() === '') {
      return;
    }
    
    // Validar el RUT usando la función del helper
    if (!validarRut(valor)) {
      setError("rut_empresa", {
        type: "manual",
        message: "El RUT ingresado no es válido"
      });
    } else {
      setIsConsultingRut(true);
      const resultado = await obtenerNombrePorRut(valor);
      setIsConsultingRut(false);
      if (resultado.success && resultado.data) {
        // Extraer cuerpo del RUT (sin puntos, guión ni dígito verificador)
        const rutLimpio = valor.replace(/[.\-]/g, '');
        const rutNumero = parseInt(rutLimpio.slice(0, -1), 10);
        if (rutNumero < 50000000) {
          // Persona natural
          setValue("persona", resultado.data);
          setValue("empresa", "Particular");
          setValue("cargo", "Particular");
        } else {
          setValue("empresa", resultado.data);
        }
      } else {
        console.error("Error al obtener nombre de empresa:", resultado.error);
      }
    }
  }

  const obtenerNombrePorRut = async (rut) => {
    try {
      const response = await fetch(strapiApiUrl + `/api/rutificador`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ rut })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (data.data?.message) {
        return {
          success: true,
          data: data.data.message,
          error: null
        };
      } else {
        throw new Error('Estructura de respuesta inesperada');
      }
    } catch (error) {
      console.error('Error al consultar RUT:', error);
      return {
        success: false,
        data: null,
        error: error.message || 'Error al consultar el RUT'
      };
    }
  }

  return (
    <div className={`w-full col-md-8 mt-5 rounded-xl p-6 ${border ? 'border' : ''}`}>
      {/* Toast container */}
      {toast.show && (
        <div className="toast toast-top toast-end">
          <div className={`alert ${toast.type === 'success' ? 'alert-success' : 'alert-error'}`}>
            <span>{toast.message}</span>
          </div>
        </div>
      )}

      <FranjaAzul />
      <h3 className="text-center uppercase mb-2 font-semibold" dangerouslySetInnerHTML={{__html:titulo}} />
      <form className="w-full max-w-[900px]" onSubmit={handleSubmit(handleOnSubmit)}>
      {!isCotizacion && (
        <fieldset className="fieldset">
        <legend className="fieldset-legend">Tipo de Consulta</legend>
          <select className="select border border-gray-300" defaultValue={defaultTipoConsulta} disabled={isConsultingRut} {...register("tipo_consulta",{required: true})}>
          <option value="0">-- Seleccione --</option>
          {tiposDeContacto.map((tipo) =>(
            <option key={tipo.id} value={tipo.documentId}>{tipo.Tipo}</option>
          ))}
          </select>
          {errors.tipo_consulta?.type === "required" && (
            <p className="text-red-500" role="alert">Seleccione un tipo de consulta</p>
          )}
        </fieldset>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4">
        <fieldset className="fieldset">
        <legend className="fieldset-legend">RUT Empresa</legend>
          <div className="relative w-full">
            <input
              className="input validator border border-gray-300 w-full"
              {...register("rut_empresa",{
                onBlur: handleRutBlur,
                required: true,
              })}
              onChange={handleRutChange}
              disabled={watchEmpresaExtranjera || isConsultingRut}
              aria-invalid={errors.rut_empresa ? "true" : "false"}
              placeholder="Ej: 12.345.678-9"
            />
            {isConsultingRut && (
              <span className="loading loading-spinner loading-sm absolute right-3 top-1/2 -translate-y-1/2"></span>
            )}
          </div>
          {errors.rut_empresa?.type === "required" && (
            <p className="text-red-500" role="alert">Revise el RUT de la empresa</p>
          )}
          {errors.rut_empresa?.type === "manual" && (
            <p className="text-red-500" role="alert">{errors.rut_empresa.message}</p>
          )}
            <div className="label join"><input type="checkbox" name="extranjero" {...register("empresa_extranjera")}/> Empresa Extranjera</div>
        </fieldset>
        <fieldset className="fieldset">
        <legend className="fieldset-legend">Empresa</legend>
          <input className="input validator border border-gray-300 w-full" disabled={isConsultingRut} {...register("empresa",{required: true})} aria-invalid={errors.empresa ? "true" : "false"} />
          {errors.empresa?.type === "required" && (
            <p className="text-red-500" role="alert">Revise el nombre de la empresa</p>
          )}
        </fieldset>
        <fieldset className="fieldset">
        <legend className="fieldset-legend">Persona de Contacto</legend>
          <input className="input validator border border-gray-300 w-full" disabled={isConsultingRut} {...register("persona",{required: true})} aria-invalid={errors.persona ? "true" : "false"} />
          {errors.persona?.type === "required" && (
            <p className="text-red-500" role="alert">Revise el nombre de la persona de contacto</p>
          )}
        </fieldset>
        <fieldset className="fieldset">
        <legend className="fieldset-legend">Cargo</legend>
          <input className="input validator border border-gray-300 w-full" disabled={isConsultingRut} {...register("cargo",{required: true})} aria-invalid={errors.cargo ? "true" : "false"} />
          {errors.cargo?.type === "required" && (
            <p className="text-red-500" role="alert">Revise el cargo de contacto</p>
          )}
        </fieldset>
        <fieldset className="fieldset">
        <legend className="fieldset-legend">E-Mail</legend>
          <input
            className="input validator border border-gray-300 w-full"
            type="email"
            disabled={isConsultingRut}
            {...register("email",{
              required: true,
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Ingrese un email válido"
              }
            })}
            aria-invalid={errors.email ? "true" : "false"}
          />
          {errors.email?.type === "required" && (
           <p className="text-red-500" role="alert">Revise el correo</p>
          )}
          {errors.email?.type === "pattern" && (
           <p className="text-red-500" role="alert">{errors.email.message}</p>
          )}
        </fieldset>
        <fieldset className="fieldset">
        <legend className="fieldset-legend">Teléfono</legend>
          <input className="input validator border border-gray-300 w-full" disabled={isConsultingRut} {...register("telefono",{required: true})} aria-invalid={errors.telefono ? "true" : "false"} />
          {errors.telefono?.type === "required" && (
           <p className="text-red-500" role="alert">Revise el teléfono</p>
          )}
        </fieldset>
      </div>

      <fieldset className="fieldset">
      <legend className="fieldset-legend">Consulta</legend>
          <textarea className="textarea border border-gray-300 w-full" placeholder="Escriba su consulta" disabled={isConsultingRut} {...register("consulta",{required:true})}></textarea>
          {errors.consulta?.type === "required" && (
            <p className="text-red-500" role="alert">Ingrese su consulta</p>
          )}
      </fieldset>
      <fieldset className="fieldset">
          <div className="join"><input type="checkbox" disabled={isConsultingRut} {...register("politica", {required:true})}/> &nbsp;Acepto la política de tratamiento de datos</div>
            {errors.politica?.type === "required" && (
            <p className="text-red-500" role="alert">Debe aceptar nuestra política de uso de datos</p>
          )}
        </fieldset>
      <fieldset className="fieldset">
          <div className="join"><input type="checkbox" disabled={isConsultingRut} {...register("newsletter")} /> &nbsp;Deseo recibir información de Dictuc</div>
      </fieldset>

      <div className="text-center"> 
        <button
          className="ml-auto mr-auto btn btn-primary mt-2 rounded-full"
          type="submit"
          disabled={isSubmitting || isConsultingRut}
        >
          {isSubmitting ? (
            <>
              <span className="loading loading-spinner loading-sm"></span>
              Enviando...
            </>
          ) : (
            'Enviar'
          )}
        </button>
      </div>

      </form>
    </div>
  );
} 