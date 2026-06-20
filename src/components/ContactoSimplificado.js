"use client"
import React from "react";
import FranjaAzul from "./FranjaAzul";
import { useForm } from "react-hook-form";

export default function ContactoSimplificado({ strapiApiUrl, mostrarTelefono, mostrarEmpresa, campanaId }) {
  const { register, formState: { errors }, handleSubmit, reset } = useForm();

  const [toast, setToast] = React.useState({ show: false, message: "", type: "success" });
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  React.useEffect(() => {
    if (!toast.show) return;
    const id = setTimeout(() => setToast({ show: false, message: "", type: "success" }), 3000);
    return () => clearTimeout(id);
  }, [toast.show]);

  const handleOnSubmit = async (data) => {
    if (isSubmitting) return;
    setIsSubmitting(true);
    try {
      const formData = new FormData();
      formData.append("persona", data.nombre);
      formData.append("email", data.email);
      if (mostrarTelefono) formData.append("telefono", data.telefono);
      if (mostrarEmpresa) formData.append("empresa", data.empresa);
      if (campanaId) formData.append("campana_id", campanaId);
      formData.append("consulta", data.consulta);
      formData.append("newsletter", data.newsletter ? "1" : "0");
      formData.append("url_origen", window.location.href);

      const response = await fetch(strapiApiUrl + "/api/contacto-simplificado", {
        method: "POST",
        body: formData,
      });
      if (!response.ok) throw new Error(`Error HTTP: ${response.status}`);

      setToast({ show: true, message: "Formulario enviado correctamente", type: "success" });
      reset();
    } catch (error) {
      console.error("Error al enviar formulario:", error);
      setToast({ show: true, message: "Error al enviar el formulario. Por favor, inténtelo nuevamente.", type: "error" });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full col-md-8 mt-5 rounded-xl p-6 border">
      {toast.show && (
        <div className="toast toast-top toast-end">
          <div className={`alert ${toast.type === "success" ? "alert-success" : "alert-error"}`}>
            <span>{toast.message}</span>
          </div>
        </div>
      )}

      <FranjaAzul />
      <form className="w-full max-w-[900px]" onSubmit={handleSubmit(handleOnSubmit)}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4">
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Nombre</legend>
            <input
              className="input validator border border-gray-300 w-full"
              {...register("nombre", { required: true })}
              aria-invalid={errors.nombre ? "true" : "false"}
            />
            {errors.nombre?.type === "required" && (
              <p className="text-red-500" role="alert">Ingrese su nombre</p>
            )}
          </fieldset>

          <fieldset className="fieldset">
            <legend className="fieldset-legend">E-Mail</legend>
            <input
              className="input validator border border-gray-300 w-full"
              type="email"
              {...register("email", {
                required: true,
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Ingrese un email válido",
                },
              })}
              aria-invalid={errors.email ? "true" : "false"}
            />
            {errors.email?.type === "required" && (
              <p className="text-red-500" role="alert">Ingrese su correo</p>
            )}
            {errors.email?.type === "pattern" && (
              <p className="text-red-500" role="alert">{errors.email.message}</p>
            )}
          </fieldset>

          {mostrarTelefono && (
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Teléfono</legend>
              <input
                className="input validator border border-gray-300 w-full"
                {...register("telefono", { required: true })}
                aria-invalid={errors.telefono ? "true" : "false"}
              />
              {errors.telefono?.type === "required" && (
                <p className="text-red-500" role="alert">Ingrese su teléfono</p>
              )}
            </fieldset>
          )}

          {mostrarEmpresa && (
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Empresa</legend>
              <input
                className="input validator border border-gray-300 w-full"
                {...register("empresa", { required: true })}
                aria-invalid={errors.empresa ? "true" : "false"}
              />
              {errors.empresa?.type === "required" && (
                <p className="text-red-500" role="alert">Ingrese su empresa</p>
              )}
            </fieldset>
          )}
        </div>

        <fieldset className="fieldset">
          <legend className="fieldset-legend">Consulta</legend>
          <textarea
            className="textarea border border-gray-300 w-full"
            placeholder="Escriba su consulta"
            {...register("consulta", { required: true })}
          ></textarea>
          {errors.consulta?.type === "required" && (
            <p className="text-red-500" role="alert">Ingrese su consulta</p>
          )}
        </fieldset>

        <fieldset className="fieldset">
          <div className="join">
            <input type="checkbox" {...register("newsletter")} />
            &nbsp;Deseo recibir información de Dictuc
          </div>
        </fieldset>

        <fieldset className="fieldset">
          <div className="join">
            <input type="checkbox" {...register("politica", { required: true })} />
            &nbsp;Acepto la&nbsp;
            <a
              className="font-semibold"
              href="https://backend-dictuc.andesblockchain.com/uploads/Politica_de_Tratamiento_de_Datos_Personales_Dictuc_406721e9e7.pdf"
              target="_blank"
            >
              &nbsp;política de tratamiento de datos
            </a>
          </div>
          {errors.politica?.type === "required" && (
            <p className="text-red-500" role="alert">Debe aceptar nuestra política de uso de datos</p>
          )}
        </fieldset>

        <div className="text-center">
          <button
            className="ml-auto mr-auto btn btn-primary mt-2 rounded-full"
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <span className="loading loading-spinner loading-sm"></span>
                Enviando...
              </>
            ) : (
              "Enviar"
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
