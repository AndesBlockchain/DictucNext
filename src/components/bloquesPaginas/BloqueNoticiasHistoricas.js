import React from "react";
import Bloque from "./Bloque";
import BuscadorNoticias from "../BuscadorNoticias";

const BloqueNoticiasHistoricas = ({ datosBloque }) => {
  const noticias = datosBloque.categoria_noticia?.noticias || [];

  // Agrupar por año, noticias sin fecha van en "Sin fecha"
  const noticiasPorAgno = {};
  noticias.forEach((noticia) => {
    const agno = noticia.fecha ? new Date(noticia.fecha).getFullYear().toString() : "Sin fecha";
    if (!noticiasPorAgno[agno]) noticiasPorAgno[agno] = [];
    noticiasPorAgno[agno].push(noticia);
  });

  // Ordenar noticias dentro de cada año por fecha desc
  Object.keys(noticiasPorAgno).forEach((agno) => {
    noticiasPorAgno[agno].sort((a, b) => new Date(b.fecha || 0) - new Date(a.fecha || 0));
  });

  // Ordenar años desc, "Sin fecha" al final
  const noticiasOrdenadas = Object.entries(noticiasPorAgno).sort(([a], [b]) => {
    if (a === "Sin fecha") return 1;
    if (b === "Sin fecha") return -1;
    return parseInt(b) - parseInt(a);
  });

  return (
    <Bloque datosBloque={datosBloque.Bloque}>
      <BuscadorNoticias noticiasOrdenadas={noticiasOrdenadas} />
    </Bloque>
  );
};

export default BloqueNoticiasHistoricas;
