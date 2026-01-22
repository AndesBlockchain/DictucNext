"use client";

import React, { useTransition, useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import SeparadorHorizontal from "./SeparadorHorizontal";
import Agente from "./Agente";

/**
 * Componente Client para interacción de filtros
 * Actualiza URL search params sin estado de filtros interno
 * Server Component maneja el filtrado real
 */
const FiltroServiciosClient = ({
  currentTipo = '',
  currentBusqueda = '',
  conteoPorTipo = {},
  tiposDeServicio = { nodes: [] }
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();
  const [searchValue, setSearchValue] = useState(currentBusqueda);

  // Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => {
      updateURL({ busqueda: searchValue });
    }, 500);
    return () => clearTimeout(timer);
  }, [searchValue]);

  const updateURL = (newParams) => {
    const params = new URLSearchParams(window.location.search);

    Object.entries(newParams).forEach(([key, value]) => {
      if (value) {
        params.set(key, value);
      } else {
        params.delete(key);
      }
    });

    const newUrl = params.toString() ? `${pathname}?${params.toString()}` : pathname;

    startTransition(() => {
      router.push(newUrl, { scroll: false });
    });
  };

  const handleTipoServicioChange = (e) => {
    updateURL({ tipo: e.target.value });
  };

  const handleFiltroTextChange = (e) => {
    setSearchValue(e.target.value);
  };

  return (
    <div className="border-1 border-x-gray-500 rounded-md text-xs p-4 flex-1">
      <div className="mb-1 font-semibold text-center font-md mb-2">
        Filtros de Búsqueda
      </div>

      <div className="mt-3 font-semibold">Búsqueda por palabra</div>
      <input
        type="text"
        value={searchValue}
        onChange={handleFiltroTextChange}
        style={{
          width: "100%",
          padding: 8,
          margin: "8px 0",
          borderRadius: 4,
          border: "1px solid #ccc"
        }}
      />

      {conteoPorTipo && Object.keys(conteoPorTipo).length > 0 && (
        <>
          <div className="font-semibold mb-1">Tipo de Servicio</div>
          <div>
            {tiposDeServicio.nodes.map((item) => {
              const count = conteoPorTipo[item.slug];
              if (!count || count === 0) return null;

              return (
                <div key={item.slug} style={{ display: "flex", alignItems: "center", marginBottom: 8 }}>
                  <input
                    type="radio"
                    id={`servicio-${item.slug}`}
                    name="tipo-servicio"
                    value={item.slug}
                    checked={currentTipo === item.slug}
                    onChange={handleTipoServicioChange}
                  />
                  <label htmlFor={`servicio-${item.slug}`} style={{ marginLeft: 8 }}>
                    {item.nombre}
                  </label>
                  <div className="badge badge-soft badge-primary" style={{ marginLeft: "auto" }}>
                    {count}
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}

      <SeparadorHorizontal />
      <Agente
        titulo="Asistente IA"
        franja={false}
        backgroundColor="bg-white"
        padding={1}
        marginTop={4}
      />

      {isPending && (
        <div className="text-xs text-gray-500 mt-2">Actualizando...</div>
      )}
    </div>
  );
};

export default FiltroServiciosClient;
