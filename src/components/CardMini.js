
export default function CardMini({ titulo, color_fondo, color_texto, callToAction }) {

  return (
    <div className={`border rounded-lg shadow-md p-4 h-full flex flex-col text-left ${color_fondo} ${color_texto}`}>
      <h2 className="text-sm font-bold">{titulo}</h2>
      {callToAction && callToAction.url && (
        <div className="mt-auto pt-4 text-xs text-right"><a className="text-azul-dictuc" href={callToAction.url}>Ver detalle →</a></div>
      )}
    </div>
  );
}