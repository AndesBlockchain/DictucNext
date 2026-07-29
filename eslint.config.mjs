import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals"),
  {
    ignores: [".next/**", "out/**", "build/**", "next-env.d.ts"],
  },
  {
    // strapi-contexto-agente/ es un plugin/backend Strapi (CommonJS), no código Next.js.
    files: ["strapi-contexto-agente/**/*.js"],
    languageOptions: {
      globals: { strapi: "readonly" },
      sourceType: "script",
    },
  },
  {
    // Estos Server Components llaman funciones async de fetching nombradas "use-*"
    // por convención del proyecto (ver CLAUDE.md), no son hooks de React reales.
    files: [
      "src/app/(pages)/**/page.js",
      "src/components/Agente.js",
      "src/components/BarraSuperior.js",
      "src/components/BarraSuperiorInterior.js",
      "src/components/ContenedorSectoresPais.js",
      "src/components/ContenedorTiposServicio.js",
      "src/components/Footer.js",
      "src/components/FooterSuperior.js",
      "src/components/SectoresPais.js",
      "src/components/bloquesPaginas/BloqueContacto.js",
      "src/components/bloquesPaginas/BloqueDocumentos.js",
      "src/components/bloquesPaginas/BloqueNoticias.js",
      "src/components/bloquesPaginas/BloqueSectoresPais.js",
      "src/components/bloquesPaginas/bloqueTiposDeServicio.js",
    ],
    rules: {
      "react-hooks/rules-of-hooks": "off",
    },
  },
];

export default eslintConfig;
