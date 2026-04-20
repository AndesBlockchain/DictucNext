import React from "react";
import StrapiImage from "../../StrapiImage";

const ItemEfemerides = ({ agno, evento, foto, index = 0, isFirst = false, isLast = false, onFotoClick }) => {
  const isRight = index % 2 === 0;
  const badgeColor = isRight ? "bg-azul-dictuc" : "bg-gris-dictuc";
  const borderColor = isRight ? "border-azul-dictuc" : "border-gris-dictuc";
  const lineColor = isRight ? "bg-azul-dictuc" : "bg-gris-dictuc";

  return (
    <>
      {/* Desktop */}
      <div className="hidden md:grid grid-cols-[1fr_20px_1fr] items-center relative">
        {/* Línea horizontal conectora desde foto al centro */}
        {foto && (
          <div
            className={`absolute top-1/2 -translate-y-1/2 h-0.5 ${lineColor}`}
            style={isRight
              ? { left: 'calc(50% - 13rem - 1.5rem)', right: '50%' }
              : { left: '50%', right: 'calc(50% - 13rem - 1.5rem)' }
            }
          />
        )}

        {/* Columna izquierda */}
        <div className="flex flex-col gap-2 items-end text-right px-6">
          {!isRight && (
            <>
              <span className={`${badgeColor} text-white rounded-full px-5 py-1 text-sm font-bold inline-block w-fit`}>
                {agno}
              </span>
              <p className="text-xs text-gris-dictuc max-w-[250px]">{evento}</p>
            </>
          )}
          {isRight && foto && (
            <div
              className={`relative z-10 w-44 h-28 md:w-52 md:h-32 rounded-lg overflow-hidden cursor-pointer hover:shadow-xl transition-shadow border-4 ${borderColor} shadow-md`}
              onClick={() => onFotoClick?.(foto)}
            >
              <StrapiImage imagen={foto} alt={`${evento} - ${agno}`} className="w-full h-full object-cover" />
            </div>
          )}
        </div>

        {/* Círculo central */}
        <div className="flex justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" className="h-5 w-5 shrink-0 relative z-10">
            <circle cx="10" cy="10" r="8" className="fill-azul-dictuc" />
          </svg>
        </div>

        {/* Columna derecha */}
        <div className="flex flex-col gap-2 items-start text-left px-6">
          {isRight && (
            <>
              <span className={`${badgeColor} text-white rounded-full px-5 py-1 text-sm font-bold inline-block w-fit`}>
                {agno}
              </span>
              <p className="text-xs text-gris-dictuc max-w-[250px]">{evento}</p>
            </>
          )}
          {!isRight && foto && (
            <div
              className={`relative z-10 w-44 h-28 md:w-52 md:h-32 rounded-lg overflow-hidden cursor-pointer hover:shadow-xl transition-shadow border-4 ${borderColor} shadow-md`}
              onClick={() => onFotoClick?.(foto)}
            >
              <StrapiImage imagen={foto} alt={`${evento} - ${agno}`} className="w-full h-full object-cover" />
            </div>
          )}
        </div>
      </div>

      {/* Mobile */}
      <div className="flex md:hidden items-start gap-4 relative">
        <div className="flex justify-center shrink-0 w-5">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" className="h-5 w-5 shrink-0 relative z-10 mt-1">
            <circle cx="10" cy="10" r="8" className="fill-azul-dictuc" />
          </svg>
        </div>
        <div className="flex flex-col gap-2 pb-8">
          <span className={`${badgeColor} text-white rounded-full px-5 py-1 text-sm font-bold inline-block w-fit`}>
            {agno}
          </span>
          <p className="text-xs text-gris-dictuc">{evento}</p>
          {foto && (
            <div
              className={`w-36 h-24 rounded-lg overflow-hidden cursor-pointer hover:shadow-xl transition-shadow mt-1 border-4 ${borderColor} shadow-md`}
              onClick={() => onFotoClick?.(foto)}
            >
              <StrapiImage imagen={foto} alt={`${evento} - ${agno}`} className="w-full h-full object-cover" />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ItemEfemerides;
