import Bloque from "./Bloque";
import VerificaForm from "../VerificaForm";

const BloqueVerificarInforme = ({ datosBloque }) => {
  return (
    <Bloque datosBloque={datosBloque.Bloque}>
      <div className="container mx-auto max-w-2xl border border-gray-200 rounded-md p-4">
        <VerificaForm />
      </div>
    </Bloque>
  );
};

export default BloqueVerificarInforme;
