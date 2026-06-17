import React from "react";
import Bloque from "./Bloque";
import BuscadorNoticias from "../BuscadorNoticias";

const BloqueNoticiasHistoricas = ({ datosBloque }) => {
  const noticias = datosBloque.categoria_noticia?.noticias || [];
  const estiloFecha = datosBloque.categoria_noticia?.EstiloFecha;

  // Agrupar por año y mes, noticias sin fecha van en "Sin fecha"
  const noticiasPorAgno = {};
  noticias.forEach((noticia) => {
    const fecha = noticia.fecha ? new Date(noticia.fecha) : null;
    const agno = fecha ? fecha.getFullYear().toString() : "Sin fecha";
    const mesNum = fecha ? String(fecha.getMonth() + 1).padStart(2, "0") : "00";
    const mesNombre = fecha
      ? fecha.toLocaleDateString("es-ES", { month: "long" })
      : "Sin fecha";
    const mesLabel = mesNombre.charAt(0).toUpperCase() + mesNombre.slice(1);
    const mesId = `${mesNum}|${mesLabel}`;

    if (!noticiasPorAgno[agno]) noticiasPorAgno[agno] = {};
    if (!noticiasPorAgno[agno][mesId]) noticiasPorAgno[agno][mesId] = [];
    noticiasPorAgno[agno][mesId].push(noticia);
  });

  // Ordenar años desc, "Sin fecha" al final; dentro de cada año ordenar meses desc;
  // dentro de cada mes ordenar noticias por fecha desc
  const noticiasOrdenadas = Object.entries(noticiasPorAgno)
    .sort(([a], [b]) => {
      if (a === "Sin fecha") return 1;
      if (b === "Sin fecha") return -1;
      return parseInt(b) - parseInt(a);
    })
    .map(([agno, meses]) => {
      const mesesOrdenados = Object.entries(meses)
        .sort(([a], [b]) => {
          const numA = a.split("|")[0];
          const numB = b.split("|")[0];
          if (numA === "00") return 1;
          if (numB === "00") return -1;
          return parseInt(numB) - parseInt(numA);
        })
        .map(([mesId, nots]) => {
          const mesLabel = mesId.split("|")[1];
          const notsOrdenadas = [...nots].sort(
            (a, b) => new Date(b.fecha || 0) - new Date(a.fecha || 0)
          );
          return [mesLabel, notsOrdenadas];
        });
      return [agno, mesesOrdenados];
    });

  return (
    <Bloque datosBloque={datosBloque.Bloque}>
      <BuscadorNoticias noticiasOrdenadas={noticiasOrdenadas} seccion={datosBloque.categoria_noticia?.slug} estiloFecha={estiloFecha} />
    </Bloque>
  );
};

export default BloqueNoticiasHistoricas;
