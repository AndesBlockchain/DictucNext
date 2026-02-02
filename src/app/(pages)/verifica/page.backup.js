"use client"
import React, {useState} from "react";
import PaginaInterior from "@/components/PaginaInterior";
const BannerVerificarInforme = "/images/BannerVerificarInforme.webp"
import Noticias from "@/components/Noticias";
import useHomeNoticias from "@/hooks/use-home-noticias";

 export default function VerificaPage() {

  const [codigo,setCodigo]= useState("")


  const noticias= useHomeNoticias();

  const handlerCambiarCodigo = (e) => {
    setCodigo(e.target.value)
  }

  const verificarCertificado = () => {
    // Crear un formulario temporal para enviar los datos por POST
    const form = document.createElement('form');
    form.method = 'POST';
    form.action = 'https://xnet.dictuc.cl/xnet/dictuc/firma_elect/descarga_doc.phtml';
    form.target = '_blank'; // Abrir en nueva ventana
    
    // Crear campo cod_val
    const codValInput = document.createElement('input');
    codValInput.type = 'hidden';
    codValInput.name = 'cod_val';
    codValInput.value = codigo;
    
    // Crear campo btnSubmitFormValidDoc
    const btnSubmitInput = document.createElement('input');
    btnSubmitInput.type = 'hidden';
    btnSubmitInput.name = 'btnSubmitFormValidDoc';
    btnSubmitInput.value = 'Verificar';
    
    // Agregar campos al formulario
    form.appendChild(codValInput);
    form.appendChild(btnSubmitInput);
    
    // Agregar formulario al DOM, enviarlo y removerlo
    document.body.appendChild(form);
    form.submit();
    document.body.removeChild(form);
    setCodigo("")
  }

  return (
    <PaginaInterior fallback={BannerVerificarInforme}
                    titulo="Verifica un Certificado"
                    breadcrum={[{ label: "Home", link: "/" }, { label: "Verifica", link: "/noticias" }]}> 
    <div className="pl-12 pr-12 pt-12">

    <p>Dictuc actualmente genera informes con una firma digital, en el caso de servicios rutinarios, y con dos firmas tradicionales en el caso de estudios y peritajes.</p>
    
    <p>Acá puedes verificar la autenticidad de un certificado emitido por Dictuc. Ingresa el código de verificación del documento y
    revisa si es genuino</p>
    <fieldset className="fieldset mt-6">
        <legend className="fieldset-legend">Ingresa el código de verificación</legend>
        <input type="text" className="input" placeholder="Ej: yrt439k" onChange={handlerCambiarCodigo} value={codigo}/>
    </fieldset>
    <button className="btn btn-primary mb-6 mt-4 rounded-full" onClick={verificarCertificado}>Verificar la autenticidad</button>
    </div>
    <p>En el caso de informes con dos firmas, estos se emiten sin código de verificación, si requieres confirmar su validez contacta a informes@dictuc.cl</p>
    <Noticias noticias={noticias} className="mt-6"
      titulo='<span class="text-azul-dictuc">En qué </span>estamos' 
    />
    </PaginaInterior>
  );
}

export const Head = () => <title>Dictuc | Verifica un Certificado</title>