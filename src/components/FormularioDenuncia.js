"use client"
import React from "react";
import FranjaAzul from "./FranjaAzul";
import { useForm } from 'react-hook-form';

// Opciones para los campos (movidas fuera del componente para evitar recreación)
const RELACIONES_DICTUC = [
  { value: 'trabajador', label: 'Trabajador' },
  { value: 'cliente', label: 'Cliente' },
  { value: 'proveedor', label: 'Proveedor' },
  { value: 'comunidad', label: 'Comunidad' },
  { value: 'universidad', label: 'Universidad' },
  { value: 'otro', label: 'Otro' }
];

const LUGARES_INCIDENTE = [
  'Instalaciones de Dictuc',
  'Terreno',
  'Instalaciones del cliente o proveedor',
  'Otro'
];

const TIPOS_DENUNCIA = [
  { value: 'fraude_corrupcion', label: 'Fraude y corrupción' },
  { value: 'delitos_informaticos', label: 'Delitos informáticos' },
  { value: 'competencia_desleal', label: 'Competencia desleal' },
  { value: 'delitos_tributarios', label: 'Delitos tributarios' },
  { value: 'infracciones_laborales', label: 'Infracciones a la legislación laboral' },
  { value: 'delitos_ambientales', label: 'Delitos contra el medio ambiente' },
  { value: 'propiedad_intelectual', label: 'Propiedad intelectual e industrial' },
  { value: 'desigualdad_genero', label: 'Desigualdad de género' },
  { value: 'discriminacion_y_violencia_en_el_trabajo', label: 'Discriminación y violencia en el trabajo' },
  { value: 'acoso_laboral', label: 'Acoso laboral' },
  { value: 'acoso_sexual', label: 'Acoso sexual' },
  { value: 'otro', label: 'Otro' }
];

const COMO_SE_ENTERO = [
  { value: 'experiencia_personal', label: 'Experiencia personal' },
  { value: 'me_contaron', label: 'Me lo contaron' },
  { value: 'lo_observe', label: 'Lo observé' },
  { value: 'encontre_documentacion', label: 'Encontré documentación' },
  { value: 'otro', label: 'Otro' }
];

const MESES = [
  { value: '01', label: 'Enero' },
  { value: '02', label: 'Febrero' },
  { value: '03', label: 'Marzo' },
  { value: '04', label: 'Abril' },
  { value: '05', label: 'Mayo' },
  { value: '06', label: 'Junio' },
  { value: '07', label: 'Julio' },
  { value: '08', label: 'Agosto' },
  { value: '09', label: 'Septiembre' },
  { value: '10', label: 'Octubre' },
  { value: '11', label: 'Noviembre' },
  { value: '12', label: 'Diciembre' }
];

export default function FormularioDenuncia() {

  const { register, formState: { errors }, handleSubmit, watch, reset } = useForm({
    defaultValues: {
      anonimo: 'no',
      relacion_dictuc: '',
      lugar_incidente: '',
      tipo_denuncia: [],
      como_se_entero: '',
      mes_incidente: '',
      anio_incidente: '',
      descripcion: '',
      nombre: '',
      telefono: '',
      email: '',
    }
  })

  // Observar el valor de anonimo para mostrar/ocultar campos
  const watchAnonimo = watch("anonimo");
  const watchRelacion = watch("relacion_dictuc");
  const watchLugar = watch("lugar_incidente");
  const watchComoSeEntero = watch("como_se_entero");
  const watchTipoDenuncia = watch("tipo_denuncia", []);

  // Estado para manejar el toast
  const [toast, setToast] = React.useState({ show: false, message: '', type: 'success' });

  // Estado para manejar el loading durante el envío
  const [isSubmitting, setIsSubmitting] = React.useState(false);

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

  const handleOnSubmit = async (data) => {
    // Prevenir múltiples envíos
    if (isSubmitting) return;

    setIsSubmitting(true);

    try {
      // Preparar los datos en formato JSON
      const payload = {
        anonimo: data.anonimo === 'si',
        relacion_dictuc: data.relacion_dictuc === 'otro' ? data.relacion_dictuc_otro : data.relacion_dictuc,
        lugar_incidente: data.lugar_incidente === 'Otro' ? data.lugar_incidente_otro : data.lugar_incidente,
        tipo_denuncia: data.tipo_denuncia.map(t => t === 'otro' && data.tipo_denuncia_otro ? data.tipo_denuncia_otro : t),
        como_se_entero: data.como_se_entero === 'otro' ? data.como_se_entero_otro : data.como_se_entero,
        fecha_incidente: {
          mes: data.mes_incidente,
          anio: data.anio_incidente
        },
        descripcion: data.descripcion
      };

      // Si no es anónimo, agregar datos de contacto
      if (data.anonimo === 'no') {
        payload.datos_contacto = {
          nombre: data.nombre,
          telefono: data.telefono,
          email: data.email
        };
      }

     
      // TODO: Aquí se enviará a la URL que indique el usuario
      // const response = await fetch(URL_A_CONFIGURAR, {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify(payload)
      // });

      showToast('Formulario preparado correctamente (pendiente configurar URL de envío)', 'success');
      console.log(payload);
      // Resetear el formulario después del envío exitoso
      reset();

    } catch (error) {
      console.error('Error al procesar formulario:', error);
      showToast('Error al procesar el formulario. Por favor, inténtelo nuevamente.', 'error');
    } finally {
      setIsSubmitting(false);
    }
  }

  const currentYear = new Date().getFullYear();
  const anios = Array.from({ length: 12 }, (_, i) => currentYear - 11 + i);

  return (
    <div className="max-w-4xl mx-auto mt-5 rounded-xl p-6 border border-gray-300">
      {toast.show && (
        <div className="toast toast-top toast-end">
          <div className={`alert ${toast.type === 'success' ? 'alert-success' : 'alert-error'}`}>
            <span>{toast.message}</span>
          </div>
        </div>
      )}

      <form className="w-full max-w-2xl mx-auto text-left" onSubmit={handleSubmit(handleOnSubmit)}>
        {/* Anonimato */}
        <fieldset className="fieldset">
          <legend className="fieldset-legend">¿Desea permanecer en el anonimato para esta denuncia?</legend>
          <div className="flex gap-4">
            <label className="flex items-center gap-2">
              <input type="radio" value="no" {...register("anonimo", { required: true })} className="radio border-1 border-gray-400" />
              <span>No</span>
            </label>
            <label className="flex items-center gap-2">
              <input type="radio" value="si" {...register("anonimo", { required: true })} className="radio border-1 border-gray-400" />
              <span>Sí</span>
            </label>
          </div>
          {errors.anonimo?.type === "required" && (
            <p className="text-red-500" role="alert">Debe seleccionar una opción</p>
          )}
        </fieldset>

        {/* Campos de contacto - Solo si no es anónimo */}
        {watchAnonimo === 'no' && (
          <>
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Nombre *</legend>
              <input
                className="input border border-gray-300"
                {...register("nombre", { required: watchAnonimo === 'no' })}
                aria-invalid={errors.nombre ? "true" : "false"}
                placeholder="Ingrese su nombre completo"
              />
              {errors.nombre?.type === "required" && (
                <p className="text-red-500" role="alert">El nombre es requerido</p>
              )}
            </fieldset>

            <fieldset className="fieldset">
              <legend className="fieldset-legend">Teléfono *</legend>
              <input
                className="input validator border border-gray-300"
                type="tel"
                {...register("telefono", { required: watchAnonimo === 'no' })}
                aria-invalid={errors.telefono ? "true" : "false"}
                placeholder="Ej: +56912345678"
              />
              {errors.telefono?.type === "required" && (
                <p className="text-red-500" role="alert">El teléfono es requerido</p>
              )}
            </fieldset>

            <fieldset className="fieldset">
              <legend className="fieldset-legend">Correo Electrónico *</legend>
              <input
                className="input validator border border-gray-300"
                type="email"
                {...register("email", {
                  required: watchAnonimo === 'no',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Ingrese un email válido"
                  }
                })}
                aria-invalid={errors.email ? "true" : "false"}
                placeholder="ejemplo@correo.com"
              />
              {errors.email?.type === "required" && (
                <p className="text-red-500" role="alert">El correo electrónico es requerido</p>
              )}
              {errors.email?.type === "pattern" && (
                <p className="text-red-500" role="alert">{errors.email.message}</p>
              )}
            </fieldset>
          </>
        )}

        {/* Relación con Dictuc */}
        <fieldset className="fieldset">
          <legend className="fieldset-legend">¿Cuál es su relación con Dictuc? *</legend>
          <div className="flex flex-col gap-2">
            {RELACIONES_DICTUC.map((opcion) => (
              <label key={opcion.value} className="flex items-center gap-2">
                <input
                  type="radio"
                  value={opcion.value}
                  {...register("relacion_dictuc", { required: true })}
                  className="radio border-1 border-gray-400"
                />
                <span>{opcion.label}</span>
              </label>
            ))}
          </div>
          {watchRelacion === 'otro' && (
            <input
              className="input border border-gray-300 mt-2"
              {...register("relacion_dictuc_otro", { required: watchRelacion === 'otro' })}
              placeholder="Especifique su relación con Dictuc"
            />
          )}
          {errors.relacion_dictuc?.type === "required" && (
            <p className="text-red-500" role="alert">Debe seleccionar una opción</p>
          )}
          {errors.relacion_dictuc_otro?.type === "required" && (
            <p className="text-red-500" role="alert">Debe especificar su relación</p>
          )}
        </fieldset>

        {/* Lugar del incidente */}
        <fieldset className="fieldset">
          <legend className="fieldset-legend">Lugar dónde sucedió el incidente *</legend>
          <div className="flex flex-col gap-2">
            {LUGARES_INCIDENTE.map((lugar, index) => (
              <label key={index} className="flex items-center gap-2">
                <input
                  type="radio"
                  value={lugar}
                  {...register("lugar_incidente", { required: true })}
                  className="radio border-1 border-gray-400"
                />
                <span>{lugar}</span>
              </label>
            ))}
          </div>
          {watchLugar === 'Otro' && (
            <input
              className="input border border-gray-300 mt-2"
              {...register("lugar_incidente_otro", { required: watchLugar === 'Otro' })}
              placeholder="Especifique el lugar"
            />
          )}
          {errors.lugar_incidente?.type === "required" && (
            <p className="text-red-500" role="alert">Debe seleccionar un lugar</p>
          )}
          {errors.lugar_incidente_otro?.type === "required" && (
            <p className="text-red-500" role="alert">Debe especificar el lugar</p>
          )}
        </fieldset>

        {/* Tipo de denuncia */}
        <fieldset className="fieldset">
          <legend className="fieldset-legend">Identifique y seleccione el tipo de denuncia *</legend>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
            {TIPOS_DENUNCIA.map((tipo) => (
              <label key={tipo.value} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  value={tipo.value}
                  {...register("tipo_denuncia", {
                    validate: (value) => value.length > 0 || "Debe seleccionar al menos un tipo"
                  })}
                  className="checkbox border-1 border-gray-400"
                />
                <span>{tipo.label}</span>
              </label>
            ))}
          </div>
          {watchTipoDenuncia?.includes('otro') && (
            <input
              className="input border border-gray-300 mt-2"
              {...register("tipo_denuncia_otro", { required: watchTipoDenuncia?.includes('otro') })}
              placeholder="Especifique el tipo de denuncia"
            />
          )}
          {errors.tipo_denuncia && (
            <p className="text-red-500" role="alert">{errors.tipo_denuncia.message}</p>
          )}
          {errors.tipo_denuncia_otro?.type === "required" && (
            <p className="text-red-500" role="alert">Debe especificar el tipo de denuncia</p>
          )}
        </fieldset>

        {/* Cómo se enteró */}
        <fieldset className="fieldset">
          <legend className="fieldset-legend">¿Cómo se enteró de este suceso? *</legend>
          <div className="flex flex-col gap-2">
            {COMO_SE_ENTERO.map((opcion) => (
              <label key={opcion.value} className="flex items-center gap-2">
                <input
                  type="radio"
                  value={opcion.value}
                  {...register("como_se_entero", { required: true })}
                  className="radio border-1 border-gray-400"
                />
                <span>{opcion.label}</span>
              </label>
            ))}
          </div>
          {watchComoSeEntero === 'otro' && (
            <input
              className="input border border-gray-300 mt-2"
              {...register("como_se_entero_otro", { required: watchComoSeEntero === 'otro' })}
              placeholder="Especifique cómo se enteró"
            />
          )}
          {errors.como_se_entero?.type === "required" && (
            <p className="text-red-500" role="alert">Debe seleccionar una opción</p>
          )}
          {errors.como_se_entero_otro?.type === "required" && (
            <p className="text-red-500" role="alert">Debe especificar cómo se enteró</p>
          )}
        </fieldset>

        {/* Fecha del incidente */}
        <fieldset className="fieldset">
          <legend className="fieldset-legend">Fecha en que sucedió la infracción *</legend>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="label">Mes</label>
              <select className="select border border-gray-300" {...register("mes_incidente", { required: true })}>
                <option value="">-- Mes --</option>
                {MESES.map((mes) => (
                  <option key={mes.value} value={mes.value}>{mes.label}</option>
                ))}
              </select>
              {errors.mes_incidente?.type === "required" && (
                <p className="text-red-500 text-sm" role="alert">Requerido</p>
              )}
            </div>
            <div>
              <label className="label">Año</label>
              <select className="select border border-gray-300" {...register("anio_incidente", { required: true })}>
                <option value="">-- Año --</option>
                {anios.map((anio) => (
                  <option key={anio} value={anio}>{anio}</option>
                ))}
              </select>
              {errors.anio_incidente?.type === "required" && (
                <p className="text-red-500 text-sm" role="alert">Requerido</p>
              )}
            </div>
          </div>
        </fieldset>

        {/* Descripción */}
        <fieldset className="fieldset">
          <legend className="fieldset-legend">Descripción de la situación</legend>
          <textarea
            className="textarea w-full border border-gray-300"
            rows="5"
            placeholder="Describa la situación que desea denunciar"
            {...register("descripcion")}
          ></textarea>
        </fieldset>

        {/* Nota informativa */}
        <div className="bg-blue-50 border-l-4 border-azul-dictuc p-4 mb-4">
          <p className="text-sm">
            <strong>Documentación de respaldo:</strong> Si tiene algún archivo o documento que respalde su denuncia,
            por favor enviar al mail <a href="mailto:epd@dictuc.cl" className="text-azul-dictuc underline">epd@dictuc.cl</a>
          </p>
          <p className="text-sm mt-2">
            <strong>Confidencialidad:</strong> Dictuc se compromete a velar porque toda persona de Dictuc o de la comunidad, 
            que denuncie hechos constitutivos de faltas, infracciones o delitos, en los que presuntamente tuviere participación Dictuc, 
            tenga el derecho a que su denuncia se tramite con confidencialidad y a ser protegida contra eventuales represalias de terceros, 
            según la <a href="https://backend-dictuc.andesblockchain.com/uploads/Politica_de_Proteccion_de_Denunciantes_v1_8cc1be21bc.pdf" target="_blank">Política de Protección a Denunciantes</a>
          </p>
        </div>

        {/* Aceptación de condiciones */}
        <fieldset className="fieldset">
          <div className="join">
            <input
              type="checkbox"
              {...register("aceptacion_condiciones", { required: true })}
            />
            &nbsp;Acepto las &nbsp;<a className="font-semibold" href="https://backend-dictuc.andesblockchain.com/uploads/Politica_de_Proteccion_de_Denunciantes_v1_8cc1be21bc.pdf" target="_blank"> condiciones del canal de denuncia </a>&nbsp; y autorizo el tratamiento de mis datos
          </div>
          {errors.aceptacion_condiciones?.type === "required" && (
            <p className="text-red-500" role="alert">Debe aceptar las condiciones para enviar la denuncia</p>
          )}
        </fieldset>

<div className="flex justify-center mt-4 mb-4">
        <button
          className="btn btn-primary mt-2 rounded-full btn-sm"
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <span className="loading loading-spinner loading-sm"></span>
              Enviando...
            </>
          ) : (
            'Enviar Denuncia'
          )}
        </button>
</div>
      </form>
    </div>
  );
}
