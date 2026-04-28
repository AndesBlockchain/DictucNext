import React from "react";
import Bloque from "./Bloque";
import Contacto from "../Contacto";
import useTipoDeContacto from "@/hooks/use-tipo-de-contacto";

const BloqueContacto = async ({ datosBloque }) => {
  const tiposDeContacto = await useTipoDeContacto();
  const strapiApiUrl = process.env.STRAPI_API_URL;
  const accionInicial = datosBloque.tipo_de_contacto?.Tipo || null;

  return (
    <Bloque datosBloque={datosBloque.Bloque}>
      <div className="ml-auto mr-auto xl:w-2/5 lg:w-2/5 md:w-3/5 sm:w-4/5 justify-center items-center mb-6">
        <Contacto
          border={true}
          tiposDeContacto={tiposDeContacto}
          strapiApiUrl={strapiApiUrl}
          accionInicial={accionInicial}
        />
      </div>
    </Bloque>
  );
};

export default BloqueContacto;
