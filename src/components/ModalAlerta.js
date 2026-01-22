import React from "react";
import StrapiImage from "./StrapiImage";

const ModalAlerta = ({ onClose, imagen, gatsbyImageData }) => (
  <div className="fixed inset-0 flex items-center justify-center z-50">
    <div className="absolute inset-0 bg-black opacity-40" onClick={onClose}></div>
    <div
      className="relative bg-white rounded-2xl shadow-2xl p-0 flex items-center justify-center overflow-hidden"
      style={{ maxWidth: '500px', height: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
    >
      <button className="absolute top-4 right-6 text-2xl text-gray-400 hover:text-gray-700 transition-colors z-10" onClick={onClose}>&times;</button>
      <StrapiImage
        imagen={imagen}
        gatsbyImageData={gatsbyImageData}
        alt="Alerta"
        className="object-contain"
        containerClassName="max-w-[500px] h-auto block mx-auto"
      />
    </div>
  </div>
);

export default ModalAlerta; 