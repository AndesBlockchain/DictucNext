"use client";
import React, { useState, useEffect } from "react";
import ModalAlerta from "./ModalAlerta";

const ModalContainer = ({ modals }) => {
    const [modalAbierto, setModalAbierto] = useState(false);
    const [modalMostrado, setModalMostrado] = useState(false);

    // Los modals ya vienen filtrados por fecha desde el servidor
    const modalsNodes = modals?.nodes || modals?.data || [];

    // Abrir modal automáticamente
    useEffect(() => {
        if (modalsNodes.length > 0 && !modalMostrado) {
            setModalAbierto(true);
            setModalMostrado(true);
        }
    }, [modalsNodes.length, modalMostrado]);

    const cerrarModal = () => {
        setModalAbierto(false);
    };

    if (!modalAbierto || modalsNodes.length === 0) return null;

    const currentModal = modalsNodes[0];
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
