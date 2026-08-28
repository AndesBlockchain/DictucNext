import Bloque from "./Bloque";
import CallToAction from "../CallToAction";
import { oembedToIframe } from "@/helpers/oembed-to-iframe";
import { invertirSpanStrong } from "@/helpers/invertir-span-strong";
import parse from 'html-react-parser';

const TAMANOS_BAJADA = {
    'pequeña': 'text-xs',
    'normal': 'text-sm',
    'grande': 'text-md',
    'extra grande': 'text-lg',
    '2xl': 'text-2xl',
};

const BloqueTexto = ({ datosBloque }) => {


    const letra = datosBloque.Texto?.tipografia?.class || "text-sm";
    const sizeBajada = datosBloque.Bajada?.tipografia?.Size?.trim().toLowerCase();
    const letraBajada = TAMANOS_BAJADA[sizeBajada] || "text-sm";
    const colorLetra = datosBloque.Texto?.colorTexto?.Codigo || "black";
    const colorBajada = datosBloque.Bajada?.colorTexto?.Codigo || "black";
    const botones = datosBloque.CallToAction || [];

    // Obtener el texto de forma segura y transformar oembeds
    const textoHTML = invertirSpanStrong(oembedToIframe(datosBloque.Texto?.Texto || ''));
    const textoBajada = invertirSpanStrong(datosBloque.Bajada?.Texto || '');

    return (
        <Bloque datosBloque={datosBloque.Bloque}>
            <div className="max-w-4xl m-auto">
                {textoBajada && (
                    <div
                        className={`${letraBajada} font-semibold mb-8 text-${colorBajada}`}
                        dangerouslySetInnerHTML={{ __html: textoBajada }}
                    />
                )}
                <div
                    className={`${letra} prose prose-sm max-w-none strapi-content`}
                    style={{ color: colorLetra }}
                    dangerouslySetInnerHTML={{ __html: textoHTML }}/>
                <div className="flex flex-row mt-4 items-center justify-center gap-4">
                    {botones.map((item, index) => (
                        <CallToAction
                            key={index}
                            url={item.url}
                            colorFondo={item.colorBoton}
                            colorTexto={item.colorTexto}
                            ComoAbrir={item.ComoAbrir}
                            texto={item.texto}
                        />
                    ))}
                </div>
            </div>
        </Bloque>
    );
};

export default BloqueTexto;