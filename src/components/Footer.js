import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXTwitter, faInstagram, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { faLocationDot, faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons';
import useMenuFooter from "@/hooks/use-menu-footer";

const Footer = async () => {
  const data = await useMenuFooter();

  return (
    <div>
      <footer className="text-sm text-white flex flex-col lg:flex-row justify-between items-center pt-6 pb-6 pl-10 pr-10 bg-gray-500">
        <div id="footer-sobre-dictuc" className="flex flex-col w-full lg:w-auto basis-full">
          <div className="mb-2 font-bold text-lg">Sobre Dictuc</div>
          <div className="flex flex-col lg:flex-row gap-4">
            {data.map(item => (
              <div key={item.id || item.documentId} className="flex flex-col basis-full lg:basis-1/4 mb-4 lg:mb-0">
                <div className="font-bold mb-1">{item.Heading}</div>
                {item.links.map((nestedItem, index) => (
                  <div key={`${item.id}-${index}`}>
                    <a href={nestedItem.url}>{nestedItem.texto}</a>
                  </div>
                ))}
              </div>
            ))}

            <div className="flex flex-col basis-full lg:basis-1/4 mb-4 lg:mb-0">
              <div>
                <a href="https://x.com/Dictuc" target="_blank" rel="noopener noreferrer">
                  <FontAwesomeIcon icon={faXTwitter} className="text-2xl mr-2" />
                </a>
                <a href="https://www.instagram.com/dictuc.ingenieriaquetransforma/" target="_blank" rel="noopener noreferrer">
                  <FontAwesomeIcon icon={faInstagram} className="text-2xl mr-2" />
                </a>
                <a href="https://www.linkedin.com/company/dictuc-sa/" target="_blank" rel="noopener noreferrer">
                  <FontAwesomeIcon icon={faLinkedin} className="text-2xl mr-2" />
                </a>
              </div>
              <div>
                <FontAwesomeIcon icon={faLocationDot} className="mr-2" />
                Vicuña Mackenna 4860, Macul, Santiago
              </div>
              <div>
                <FontAwesomeIcon icon={faEnvelope} className="mr-2" />
                Código Postal: 78204376
              </div>
              <div>
                <FontAwesomeIcon icon={faPhone} className="mr-2" />
                Fono: +56 9 5504 4886
              </div>
            </div>
          </div>
        </div>
      </footer>
      <div className="flex flex-row bg-black text-white text-xs p-1 justify-center">
        <a href="/nosotros/condiciones-de-uso-del-sitio">Condiciones de Uso del Sitio</a>
      </div>
    </div>
  );
};

export default Footer;