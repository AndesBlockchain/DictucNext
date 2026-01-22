import React from "react";
import Breadcrumbs from "./Breadcrumbs";
import { faCog, faChartLine, faNewspaper, faLaptop } from '@fortawesome/free-solid-svg-icons';

const BreadcrumbsExample = () => {
  // Ejemplo de breadcrumbs para una página de servicios con iconos
  const breadcrumbItems = [
    { label: "Servicios", link: "/servicios", icon: faCog },
    { label: "Consultoría", link: "/servicios/consultoria", icon: faChartLine },
    { label: "Evaluación de Proyectos", icon: faChartLine } // Este es el último item (sin link)
  ];

  // Ejemplo de breadcrumbs para una página de noticias con iconos
  const newsBreadcrumbItems = [
    { label: "Noticias", link: "/noticias", icon: faNewspaper },
    { label: "Tecnología", icon: faLaptop } // Este es el último item (sin link)
  ];

  // Ejemplo de breadcrumbs sin iconos (comportamiento original)
  const simpleBreadcrumbItems = [
    { label: "Servicios", link: "/servicios" },
    { label: "Consultoría", link: "/servicios/consultoria" },
    { label: "Evaluación de Proyectos" }
  ];

  return (
    <div className="p-6 space-y-8">
      <div>
        <h2 className="text-xl font-bold mb-4">Ejemplo 1: Breadcrumbs con Iconos</h2>
        <Breadcrumbs items={breadcrumbItems} />
        <div className="bg-gray-100 p-4 rounded">
          <h3 className="text-lg font-semibold">Evaluación de Proyectos</h3>
          <p className="text-gray-600">Contenido de la página...</p>
        </div>
      </div>

      <div>
        <h2 className="text-xl font-bold mb-4">Ejemplo 2: Breadcrumbs de Noticias con Iconos</h2>
        <Breadcrumbs items={newsBreadcrumbItems} />
        <div className="bg-gray-100 p-4 rounded">
          <h3 className="text-lg font-semibold">Noticias de Tecnología</h3>
          <p className="text-gray-600">Contenido de la página...</p>
        </div>
      </div>

      <div>
        <h2 className="text-xl font-bold mb-4">Ejemplo 3: Breadcrumbs Sin Iconos</h2>
        <Breadcrumbs items={simpleBreadcrumbItems} />
        <div className="bg-gray-100 p-4 rounded">
          <h3 className="text-lg font-semibold">Evaluación de Proyectos</h3>
          <p className="text-gray-600">Contenido de la página...</p>
        </div>
      </div>

      <div>
        <h2 className="text-xl font-bold mb-4">Ejemplo 4: Breadcrumbs Vacío</h2>
        <Breadcrumbs items={[]} />
        <div className="bg-gray-100 p-4 rounded">
          <h3 className="text-lg font-semibold">Página Principal</h3>
          <p className="text-gray-600">Contenido de la página...</p>
        </div>
      </div>
    </div>
  );
};

export default BreadcrumbsExample; 