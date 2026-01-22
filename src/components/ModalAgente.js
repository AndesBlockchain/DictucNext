import React, { useState, useEffect } from "react"

const ModalAgente = ({ onClose, pregunta }) => {
  const [puntos, setPuntos] = useState("")
  const [respuesta, setRespuesta] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [isActionCheckServicesAvailable, setIsActionCheckServicesAvailable]= useState(false);
  const [isActionGoServicesAvailable, setIsActionGoServicesAvailable]= useState(false);
  const [isActionGetQuoteAvailable, setIsActionGetQuoteAvailable]= useState(false);
  const [serviceLink,setServiceLink]= useState("");


  // Resetear variables cuando se abre el modal
  useEffect(() => {
    setPuntos("")
    setRespuesta("")
    setIsLoading(true)
    setIsActionCheckServicesAvailable(false)
    setIsActionGoServicesAvailable(false)
    setIsActionGetQuoteAvailable(false)
    setServiceLink("")
  }, [pregunta])

  useEffect(() => {

    const llamarAPI = async () => {
      try {
        const response = await fetch(process.env.STRAPI_API_URL + '/api/chatgpt', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ data: {input: pregunta }})
        })
        
        const data = await response.json()
        const respuesta= JSON.parse(data.data.message)
        setRespuesta(respuesta.respuesta)
        if (respuesta.exito=="si") {
          setServiceLink(respuesta.link)
          setIsActionGetQuoteAvailable(true)
        } else {
          setIsActionGoServicesAvailable(true);
        }
        setIsLoading(false)
      } catch (error) {
        console.error('Error al llamar a la API:', error)
        setRespuesta("Lo siento, hubo un error al procesar tu consulta.")
        setIsLoading(false)
      }
    }

    llamarAPI()
  }, [pregunta])

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

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
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
                <span className="text-gray-600">Procesando</span>
                <span className="text-blue-600 font-bold text-lg">{puntos}</span>
              </div>
            ) : (
              <div className="whitespace-pre-line">
                {respuesta}
              </div>
            )}
          </div>
          <div>
            {isActionGetQuoteAvailable && (
              <a 
                href={serviceLink}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-medium py-1.5 px-4 rounded-full shadow text-sm transition-colors mr-2 inline-block"
              >
                ¿Desea cotizar este servicio?
              </a>
            )}
            {isActionGoServicesAvailable && (
              <a 
                href="/servicios"
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-medium py-1.5 px-4 rounded-full shadow text-sm transition-colors mr-2 inline-block"
              >
                ¿Desea ir a nuestro listado de servicios?
              </a>
            )}
            {isActionGetQuoteAvailable && (
              <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-medium py-1.5 px-4 rounded-full shadow text-sm transition-colors">¿Desea cotizar este servicio?</button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ModalAgente 