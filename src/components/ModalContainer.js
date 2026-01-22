"use client";
import React, { useState, useEffect } from "react";
import ModalAlerta from "./ModalAlerta";

const ModalContainer = ({ modals }) => {
    const [modalAbierto, setModalAbierto] = useState(false);
    const [modalMostrado, setModalMostrado] = useState(false);

    // Filtrar modals por fecha vigente
    const modalsNodes = modals?.nodes || modals?.data || []; // Handle Strapi structure variations

    // Need to process date filtering here or receive filtered data? 
    // Dates are in the data, so we can filter here.
    const modalsFiltrados = modalsNodes.filter(modal => {
        // Check structure compatibility (Gatsby/Strapi vs Pure REST)
        // Assuming data might need adaptation if usage changed
        // Current usage in page.js: atributes or root?
        // Let's assume standard Strapi REST structure or the one from hook
        const publication = modal.Publicacion || modal.attributes?.Publicacion;
        if (!publication) return false;

        const desde = new Date(publication.fechaDesde);
        const hasta = new Date(publication.fechaHasta);
        const hoy = new Date();

        return hoy >= desde && hoy <= hasta;
    });

    // Abrir modal automáticamente
    useEffect(() => {
        if (modalsFiltrados.length > 0 && !modalMostrado) {
            setModalAbierto(true);
            setModalMostrado(true);
        }
    }, [modalsFiltrados, modalMostrado]);

    const cerrarModal = () => {
        setModalAbierto(false);
    };

    if (!modalAbierto || modalsFiltrados.length === 0) return null;

    const currentModal = modalsFiltrados[0];
    // Adapt image access to new StrapiImage prop expectation or existing one
    const imagen = currentModal.imagen || currentModal.attributes?.imagen;

    return (
        <ModalAlerta
            onClose={cerrarModal}
            imagen={imagen}
        // gatsbyImageData logic removed as we use StrapiImage with next/image
        />
    );
};

export default ModalContainer;
