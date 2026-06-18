/**
 * Recibe noticias agrupadas por año: [[agno, noticias[]], ...]
 * Devuelve la estructura de dos niveles esperada por BuscadorNoticias: [[agno, [[mes, noticias[]], ...]], ...]
 * Los meses se ordenan en forma descendente dentro de cada año.
 */
export function agruparPorMes(noticiasOrdenadasPorAgno) {
  return noticiasOrdenadasPorAgno.map(([agno, noticiasDelAgno]) => {
    const meses = {};

    noticiasDelAgno.forEach((noticia) => {
      const fecha = noticia.fecha ? new Date(noticia.fecha) : null;
      const mesNum = fecha ? String(fecha.getMonth() + 1).padStart(2, "0") : "00";
      const mesNombre = fecha
        ? fecha.toLocaleDateString("es-ES", { month: "long" })
        : "Sin fecha";
      const mesLabel = mesNombre.charAt(0).toUpperCase() + mesNombre.slice(1);
      const mesId = `${mesNum}|${mesLabel}`;

      if (!meses[mesId]) meses[mesId] = [];
      meses[mesId].push(noticia);
    });

    const mesesOrdenados = Object.entries(meses)
      .sort(([a], [b]) => {
        const numA = a.split("|")[0];
        const numB = b.split("|")[0];
        if (numA === "00") return 1;
        if (numB === "00") return -1;
        return parseInt(numB) - parseInt(numA);
      })
      .map(([mesId, nots]) => [mesId.split("|")[1], nots]);

    return [agno, mesesOrdenados];
  });
}
