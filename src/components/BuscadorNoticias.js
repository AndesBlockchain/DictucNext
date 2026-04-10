"use client"
import React, { useState, useMemo } from "react"

const normalizarTexto = (str) =>
  str?.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase() ?? '';

const BuscadorNoticias = ({ noticiasOrdenadas }) => {
  const [busqueda, setBusqueda] = useState("")

  const noticiasFiltradas = useMemo(() => {
    if (!busqueda.trim()) return noticiasOrdenadas;
    const termino = normalizarTexto(busqueda);
    return noticiasOrdenadas
      .map(([agno, noticiasDelAgno]) => {
        const filtradas = noticiasDelAgno.filter((noticia) =>
          normalizarTexto(noticia.titulo).includes(termino)
        );
        return filtradas.length > 0 ? [agno, filtradas] : null;
      })
      .filter(Boolean);
  }, [noticiasOrdenadas, busqueda])

  return (
    <>
      <div className="container m-auto max-w-6xl pl-8 pr-8">
        <div className="flex justify-end mb-4">
          <input
            type="text"
            placeholder="Buscar dentro de noticias"
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            className="px-3 py-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-azul-dictuc text-sm w-64"
          />
        </div>
      </div>

      <div className="mt-8">
        {noticiasFiltradas.length > 0 ? (
          noticiasFiltradas.map(([agno, noticiasDelAgno], index) => (
            <div key={agno} className="container m-auto max-w-6xl pl-8 pr-8 collapse collapse-plus bg-base-100 border border-base-300">
              <input type="checkbox" name="my-accordion-3" defaultChecked={index === 0} />
              <div className="collapse-title font-semibold text-xl">{agno}</div>
              <div className="collapse-content text-sm">
                <div className="space-y-4">
                  {noticiasDelAgno.map((noticia, noticiaIndex) => (
                    <div key={noticiaIndex} className="border-b border-gray-200 pb-3 last:border-b-0">
                      <h4 className="font-medium text-gray-900 mb-2">
                        <a href={`/noticias/${noticia.slug}`} className="hover:text-blue-600 transition-colors">
                          {new Date(noticia.fecha).toLocaleDateString('es-ES', {
                            year: 'numeric',
                            month: 'numeric',
                            day: 'numeric'
                          })} - {noticia.titulo}
                        </a>
                      </h4>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="container m-auto max-w-6xl pl-8 pr-8 text-center text-sm text-gray-500 py-6">
            No se encontraron noticias
          </div>
        )}
      </div>
    </>
  )
}

export default BuscadorNoticias
