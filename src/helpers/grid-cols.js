// Tailwind solo genera CSS para clases que puede detectar como texto literal en el código,
// por eso no se puede armar "grid-cols-" + N ni "lg:grid-cols-" + N dinámicamente
// a partir de un valor que viene del CMS (ver bloques que usan "columnas por fila" configurables).

export const GRID_COLS = {
  1: "grid-cols-1",
  2: "grid-cols-2",
  3: "grid-cols-3",
  4: "grid-cols-4",
  5: "grid-cols-5",
  6: "grid-cols-6",
  9: "grid-cols-9",
  12: "grid-cols-12",
};

export const LG_GRID_COLS = {
  1: "lg:grid-cols-1",
  2: "lg:grid-cols-2",
  3: "lg:grid-cols-3",
  4: "lg:grid-cols-4",
  5: "lg:grid-cols-5",
  6: "lg:grid-cols-6",
  9: "lg:grid-cols-9",
  12: "lg:grid-cols-12",
};
