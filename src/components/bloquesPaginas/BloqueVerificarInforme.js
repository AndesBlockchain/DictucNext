import React from "react";
import Bloque from "./Bloque";
import VerificaForm from "../VerificaForm";

const BloqueVerificarInforme = ({ datosBloque }) => {
  const verificacionUrl = process.env.VERIFICACION_URL || 'https://xnet.dictuc.cl/xnet/dictuc/firma_elect/descarga_doc.phtml';

  return (
    <Bloque datosBloque={datosBloque.Bloque}>
      <div className="container mx-auto max-w-2xl border border-gray-200 rounded-md p-4">
        <VerificaForm verificacionUrl={verificacionUrl} />
      </div>
    </Bloque>
  );
};

export default BloqueVerificarInforme;
