import React from "react";
import Bloque from "./Bloque";
import CardServicio from "../CardServicio";
import CardSmall from "../CardSmall";
import CardMini from "../CardMini";

// SRP: lógica de layout aislada del renderizado
// OCP: maneja cualquier nColumnas via valores arbitrarios de Tailwind JIT
const getDesktopBasis = (nColumnas) => {
  const predefinidas = {
    1: "lg:basis-full",
    2: "lg:basis-1/2",
    3: "lg:basis-1/3",
    4: "lg:basis-1/4",
    5: "lg:basis-[20%]",
    6: "lg:basis-1/6",
  };
  return predefinidas[nColumnas] ?? `lg:basis-[${(100 / nColumnas).toFixed(4)}%]`;
};

// ISP: adapta los datos crudos del CMS al contrato de CardServicio
const normalizarTarjeta = (tarjeta) => ({
  id: tarjeta.id,
  titulo: tarjeta.Titulo || "",
  colorFondo: tarjeta?.color_fondo?.Codigo || "white",
  colorTexto: tarjeta?.color_texto?.Codigo || "black",
  imagen: tarjeta.Imagen,
  contenido: tarjeta.Texto || "",
  callToAction: tarjeta.CallToAction,
});

const BloqueTarjetas = ({ datosBloque }) => {
  const tarjetas = datosBloque?.Tarjetas;

  if (!tarjetas?.length) return null;

  const desktopBasis = getDesktopBasis(datosBloque.TarjetasPorFila ?? 3);
  const responsiveBasis = `basis-full sm:basis-1/2 ${desktopBasis}`;
  console.log(datosBloque);

  return (
    <Bloque datosBloque={datosBloque.Bloque}>
      <div
        id="tarjetas"
        className="flex flex-wrap justify-center gap-y-8"
      >
        {tarjetas.map((tarjeta, index) => {
          const { id, titulo, colorFondo, colorTexto, imagen, contenido, callToAction } = normalizarTarjeta(tarjeta);
          return (
            <div key={id ?? index} className={`${responsiveBasis} p-4 pl-8 pr-8`}>

              {datosBloque.TipoTarjeta === "Full" && (
                <CardServicio
                titulo={titulo}
                color_fondo={colorFondo}
                color_texto={colorTexto}
                imagen={imagen}
                contenido={contenido}
                callToAction={callToAction}
              />
            )}

              {datosBloque.TipoTarjeta === "Small" && (
                <CardSmall
                titulo={titulo}
                color_fondo={colorFondo}
                color_texto={colorTexto}
                imagen={imagen}
                contenido={contenido}
                callToAction={callToAction}
              />
            )}
              {datosBloque.TipoTarjeta === "Mini" && (
                <CardMini
                titulo={titulo}
                color_fondo={colorFondo}
                color_texto={colorTexto}
                imagen={imagen}
                contenido={contenido}
                callToAction={callToAction}
              />
            )}

            </div>
          );
        })}
      </div>
    </Bloque>
  );
};

export default BloqueTarjetas;
