import React from "react";
import Bloque from "./Bloque";
import ContactoSimplificado from "../ContactoSimplificado";

const BloqueContactoSimplificado = ({ datosBloque }) => {
  const strapiApiUrl = process.env.STRAPI_API_URL;
  const mostrarTelefono = datosBloque.mostrar_telefono === true;
  const mostrarEmpresa = datosBloque.mostrar_empresa === true;
  const campanaId = datosBloque.Campaña?.id ?? null;

  return (
    <Bloque datosBloque={datosBloque.Bloque}>
      <div className="ml-auto mr-auto xl:w-2/5 lg:w-2/5 md:w-3/5 sm:w-4/5 justify-center items-center mb-6 !text-left [&>*]:!text-left [&_legend]:!text-left [&_label]:!text-left">
        <ContactoSimplificado
          strapiApiUrl={strapiApiUrl}
          mostrarTelefono={mostrarTelefono}
          mostrarEmpresa={mostrarEmpresa}
          campanaId={campanaId}
        />
      </div>
    </Bloque>
  );
};

export default BloqueContactoSimplificado;
