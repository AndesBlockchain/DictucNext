# Componente Breadcrumbs

Este componente crea una navegación de migas de pan (breadcrumbs) para mejorar la experiencia de navegación del usuario.

## Características

- ✅ Icono de casa para el inicio
- ✅ Separadores con iconos de chevron
- ✅ Enlaces navegables para items anteriores
- ✅ Iconos personalizados para cada nivel (opcional)
- ✅ Estilo consistente con el diseño del proyecto
- ✅ Accesibilidad con aria-labels
- ✅ Responsive design
- ✅ Transiciones suaves en hover

## Uso Básico

```jsx
import Breadcrumbs from "./Breadcrumbs";
import { faCog, faChartLine } from '@fortawesome/free-solid-svg-icons';

const MiPagina = () => {
  const breadcrumbItems = [
    { label: "Servicios", link: "/servicios", icon: faCog },
    { label: "Consultoría", link: "/servicios/consultoria", icon: faChartLine },
    { label: "Evaluación de Proyectos", icon: faChartLine } // Sin link = página actual
  ];

  return (
    <div>
      <Breadcrumbs items={breadcrumbItems} />
      {/* Contenido de la página */}
    </div>
  );
};
```

## Props

### `items` (array, opcional)
Array de objetos que representan cada nivel del breadcrumb.

Cada objeto debe tener:
- `label` (string, requerido): Texto que se muestra
- `link` (string, opcional): URL de navegación. Si no se proporciona, se considera la página actual
- `icon` (FontAwesome icon, opcional): Icono de FontAwesome para mostrar junto al texto

## Ejemplos

### Breadcrumbs con iconos
```jsx
import { faCog, faChartLine, faNewspaper, faLaptop } from '@fortawesome/free-solid-svg-icons';

const items = [
  { label: "Servicios", link: "/servicios", icon: faCog },
  { label: "Consultoría", link: "/servicios/consultoria", icon: faChartLine },
  { label: "Evaluación de Proyectos", icon: faChartLine }
];
```

### Breadcrumbs simple (sin iconos)
```jsx
const items = [
  { label: "Noticias", link: "/noticias" },
  { label: "Tecnología" }
];
```

### Breadcrumbs con múltiples niveles
```jsx
import { faCog, faChartLine, faFileAlt, faProjectDiagram } from '@fortawesome/free-solid-svg-icons';

const items = [
  { label: "Servicios", link: "/servicios", icon: faCog },
  { label: "Consultoría", link: "/servicios/consultoria", icon: faChartLine },
  { label: "Evaluación", link: "/servicios/consultoria/evaluacion", icon: faFileAlt },
  { label: "Proyectos", icon: faProjectDiagram }
];
```

### Sin breadcrumbs (solo inicio)
```jsx
const items = [];
// Mostrará solo el icono de casa
```

## Estilos

El componente usa Tailwind CSS con las siguientes clases:
- Contenedor: `flex items-center space-x-2 text-sm text-gray-600 mb-4`
- Enlaces: `hover:text-blue-600 transition-colors duration-200 flex items-center gap-1`
- Página actual: `text-gray-900 font-medium flex items-center gap-1`
- Separadores: `w-3 h-3 text-gray-400`
- Iconos de items: `w-3 h-3`

## Accesibilidad

- Usa `aria-label="Breadcrumb"` en el nav
- Usa `aria-label="Ir al inicio"` en el enlace de inicio
- Usa `aria-current="page"` en la página actual

## Dependencias

- React
- Gatsby (para Link)
- FontAwesome (para iconos)
- Tailwind CSS (para estilos) 