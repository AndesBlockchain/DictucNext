"use client"
import React, { useState, useEffect } from "react"
import { createPortal } from "react-dom"
import Markdown from "react-markdown"

const ModalAgente = ({ onClose, pregunta }) => {
  const [puntos, setPuntos] = useState("")
  const [respuesta, setRespuesta] = useState("")
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setPuntos("")
    setRespuesta("")
    setIsLoading(true)

    const llamarAPI = async () => {
      try {
        const response = await fetch('/api/claude', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ data: { input: pregunta } })
        })

        if (!response.ok) {
          throw new Error(`Error del servidor: ${response.status}`)
        }

        const data = await response.json()
        const mensaje = data.data.message || "No fue posible procesar la respuesta."
        // Convertir URLs planas en links Markdown
        const mensajeConLinks = mensaje.replace(
          /(?<!\()(https?:\/\/[^\s\)]+)/g,
          (url) => `[${url}](${url})`
        )
        setRespuesta(mensajeConLinks)
      } catch (error) {
        console.error('Error al llamar a la API:', error)
        setRespuesta("Lo siento, hubo un error al procesar tu consulta.")
      } finally {
        setIsLoading(false)
      }
    }

    llamarAPI()
  }, [pregunta])

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose()
    }
    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [onClose])

  useEffect(() => {
    if (isLoading) {
      const interval = setInterval(() => {
        setPuntos(prev => {
          if (prev === "...") return ""
          return prev + "."
        })
      }, 500)

      return () => clearInterval(interval)
    }
  }, [isLoading])

  return createPortal(
    <div className="fixed inset-0 flex items-center justify-center z-[200]">
      <div className="absolute inset-0 bg-black opacity-40" onClick={onClose}></div>
      <div className="relative bg-white rounded-2xl shadow-2xl p-4 w-[75vw] h-[50vh] flex flex-col items-center justify-start overflow-hidden">
        <button className="absolute top-4 right-6 text-2xl text-gray-400 hover:text-gray-700 transition-colors" onClick={onClose}>&times;</button>
        <div className="w-full border border-gray-200 rounded-2xl h-full flex flex-col items-start px-8 pt-8 pb-4 gap-6 overflow-y-auto">
          <div className="text-base md:text-lg font-bold flex justify-center w-full"><h2>Asistente de Búsqueda Dictuc</h2></div>
          <div id="pregunta" className="min-w-[250px] max-w-xl border border-gray-300 rounded-xl bg-gray-50 px-6 py-4 text-gray-700 text-center text-base shadow-sm self-end">
            {pregunta}
          </div>
          <div id="respuesta" className="w-full text-gray-800 text-left space-y-4 bg-white px-2">
            {isLoading ? (
              <div className="flex items-center space-x-1">
                <span className="text-gray-600">Procesando (la respuesta toma del orden de 30 segundos)</span>
                <span className="text-blue-600 font-bold text-lg">{puntos}</span>
              </div>
            ) : (
              <div className="prose prose-xs max-w-none text-xs [&_a]:text-azul-dictuc [&_a]:underline [&_a]:cursor-pointer [&_a]:pointer-events-auto [&_a:hover]:text-blue-800 [&_h3]:text-sm [&_h2]:text-base [&_ul]:mt-1 [&_ul]:mb-1 [&_ol]:mt-1 [&_ol]:mb-1 [&_li]:mb-0 [&_li_p]:mb-0 [&_li_p]:mt-0 [&_p]:mb-1">
                <Markdown
                  components={{
                    a: ({ href, children }) => {
                      const isInternal = href?.includes('dictuc.cl/');
                      const finalHref = isInternal
                        ? href.replace(/https?:\/\/(www\.)?dictuc\.cl/, '')
                        : href;
                      return (
                        <a
                          href={finalHref}
                          target={isInternal ? "_self" : "_blank"}
                          rel={isInternal ? undefined : "noopener noreferrer"}
                        >
                          {children}
                        </a>
                      );
                    }
                  }}
                >
                  {respuesta}
                </Markdown>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>,
    document.body
  )
}

export default ModalAgente
