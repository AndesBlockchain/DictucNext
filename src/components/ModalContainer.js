"use client";
import React, { useState, useEffect } from "react";
import ModalAlerta from "./ModalAlerta";

const ModalContainer = ({ modals }) => {
    const [modalAbierto, setModalAbierto] = useState(false);
    const [modalMostrado, setModalMostrado] = useState(false);

    // Los modals ya vienen filtrados (con imagen configurada) desde el servidor
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
    const imagen = currentModal.imagen || currentModal.attributes?.imagen;
    const nombre = currentModal.Nombre || currentModal.attributes?.Nombre;

    return (
        <ModalAlerta
            onClose={cerrarModal}
            imagen={imagen}
            alt={nombre}
        />
    );
};

export default ModalContainer;
