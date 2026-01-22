
import React from "react";
import MenuSecundario from "../../components/MenuSecundario";
import PaginaInterior from "../../components/PaginaInterior";
import ScrollSpy from "../../components/ScrollSpy";
import { renderBloque } from "../../helpers/bloque-renderer";
import { graphql } from "gatsby";


export default function PaginasContenido({pageContext,data}) {

  const slug = pageContext.slug;
  const pagina = data.strapiPagina

  return (
    <PaginaInterior
      gatsbyImageData={pagina.Banner?.localFile?.childImageSharp?.gatsbyImageData}
      banner={pagina.Banner?.localFile?.childImageSharp?.gatsbyImageData ? null : pagina.Banner?.url}
      titulo = {pagina.titulo}
      titulo_visible={pagina.TituloVisible}
      color_titulo= {pagina.color_titulo.Codigo}
      breadcrum={[
        { label: "Home", link: "/" }, 
        { label: pagina?.titulo || "Página", link: "/" }
      ]}> 
      <MenuSecundario slug={slug} />
      {(pagina.ScrollSpyVisible !== false) && (
        <ScrollSpy datosBloques={pagina.Bloques}/>
      )}
      {pagina?.Bloques && Array.isArray(pagina.Bloques) && pagina.Bloques.length > 0 ? (
        pagina.Bloques.map((bloque, index) => (
          <div key={bloque.id || index} id={bloque.id}>
            {renderBloque(bloque)}
          </div>
        ))
      ) : (
        <div className="bg-yellow-100 p-4 rounded-lg border border-yellow-300">
          <p className="text-yellow-800">No se encontraron bloques para mostrar.</p>
        </div>
      )}
      </PaginaInterior>
  );
  }

export const Head = (props) => {
  return (
      <title>Dictuc</title>
  );
};

export const PAGE_QUERY = graphql`
  query PageQuery($slug: String!) {
    strapiPagina(slug: {eq: $slug}) {
      slug
      titulo
      TituloVisible
      ScrollSpyVisible
      color_titulo {
        Codigo
      }
      Banner {
        url
        localFile {
          childImageSharp {
            gatsbyImageData(width: 1920, placeholder: BLURRED, formats: [AUTO, WEBP, AVIF])
          }
        }
      }

      Bloques {

        ... on STRAPI__COMPONENT_BLOQUES_BLOQUE_SECTORES_PAIS {
            id
            strapi_component
          Bloque {
            Titulo
            Alias
            OcultarTitulo
            MargenSuperior
            MargenInferior
          }
          }

        ... on STRAPI__COMPONENT_BLOQUES_BLOQUE_TIPOSDE_SERVICIO {
            id
            strapi_component
          }

          ... on STRAPI__COMPONENT_BLOQUES_BLOQUE_TABS {
            id
            strapi_component
            MostrarAcordeon
          Bloque {
            Titulo
            Alias
            OcultarTitulo
            MargenSuperior
            MargenInferior
          }
            texto {
              Texto {
                data {
                  Texto
                }
              }
            }
            Tabs {
              Titulo
              Foto {
                formats {
                  medium {
                    url
                  }
                }
                localFile {
                  childImageSharp {
                    gatsbyImageData(width: 800, placeholder: BLURRED, formats: [AUTO, WEBP, AVIF])
                  }
                }
              }
              Texto {
                data {
                  Texto
                }
              }
              CallToAction {
                url
                texto
                ComoAbrir
                colorTexto {
                  Codigo
                }
                }
                
            }
          }

          ... on STRAPI__COMPONENT_BLOQUES_BLOQUE_HERO {
            id
            strapi_component
            posicion_foto
            color {
              Color
              Codigo
            }
          Bloque {
            Titulo
            Alias
            OcultarTitulo
            MargenSuperior
            MargenInferior
            FotoFondo {
                formats {
                  medium {
                    url
                  }
                }
              }
          }
            Bloque {
              Alias

              OcultarTitulo
              Titulo

            }
            texto {
              data {
                texto
              }
            }
            foto {
              formats {
                medium {
                  url
                }
              }
              localFile {
                childImageSharp {
                  gatsbyImageData(width: 800, placeholder: BLURRED, formats: [AUTO, WEBP, AVIF])
                }
              }
            }
          }

          ... on STRAPI__COMPONENT_BLOQUES_BLOQUE_DOCUMENTOS {
            id
            Bloque {
              Titulo
              Alias
              OcultarTitulo
              FotoFondo {
                url
              }
              colorFondoBloque {
                Color
                Codigo
              }
              colorBarrita {
                Codigo
              }
              id
            }
            strapi_component
            etiqueta_documentos {
              documentos {
                Descripcion
                Titulo
                sortOrder
                Archivo {
                  url
                }
                Foto {
                  formats {
                    medium {
                      url
                    }
                  }
                  url
                }
              }
            }
          }

          ... on STRAPI__COMPONENT_BLOQUES_BLOQUE_PERSONAS {
            id
            strapi_component
            Bloque {
              Titulo
              Alias
              OcultarTitulo
              FotoFondo {
                url
              }
              colorFondoBloque {
                Color
                Codigo
              }
              colorBarrita {
                Codigo
              }
              id
            }
            etiqueta_persona {
              personas {
                Cargo
                Nombre
                Link
                sortOrder
                Foto {
                  formats {
                    medium {
                      url
                    }
                    small {
                      url
                    }
                    thumbnail {
                      url
                    }
                  }
                }
              }
            }
          }

          ... on STRAPI__COMPONENT_BLOQUES_BLOQUE_EFEMERIDES {
            id
            Efemerides {
              Evento
              agno
            }
            Bloque {
              Titulo
              Alias
              OcultarTitulo
              FotoFondo {
                url
              }
              colorFondoBloque {
                Color
                Codigo
              }
              colorBarrita {
                Codigo
              }
            }
            strapi_component
          }

          ... on STRAPI__COMPONENT_BLOQUES_BLOQUE_GALERIA {
            id
            strapi_component
            Bloque {
              Titulo
              Alias
              OcultarTitulo
              colorFondoBloque {
                Color
                Codigo
              }
              FotoFondo {
                url
              }
              colorBarrita {
                Codigo
              }
            }
            FotosGaleria {
              Texto
              Foto {
                url
                localFile {
                  childImageSharp {
                    gatsbyImageData(width: 1200, placeholder: BLURRED, formats: [AUTO, WEBP, AVIF])
                  }
                }
              }
            }
          }

          ... on STRAPI__COMPONENT_BLOQUES_BLOQUE_NOTICIAS {
            id
            MostrarFecha
            CantidadNoticias
            etiqueta_noticia {
              etiqueta
              documentId
            }
            Bloque {
              Titulo
              Alias
              OcultarTitulo
              colorFondoBloque {
                Color
                Codigo
              }
              FotoFondo {
                url
              }
              colorBarrita {
                Codigo
              }
            }
            strapi_component
          }

          ... on STRAPI__COMPONENT_BLOQUES_BLOQUE_TARJETAS {
            id
            TarjetasPorFila
            Bloque {
              Titulo
              Alias
              OcultarTitulo
              FotoFondo {
                url
              }
              colorFondoBloque {
                Color
                Codigo
              }
              colorBarrita {
                Codigo
              }
            }
            Tarjetas {
              CallToAction {
                url
                texto
                ComoAbrir
                colorTexto {
                  Codigo
                }

                colorBoton {
                  Codigo
                }
              }
              Imagen {
                url
              }
              Texto {
                data {
                  id
                  Texto
                }
              }
              Titulo
              tamagnoletra {
                Size
                class
              }
              color_texto {
                Color
                Codigo
              }
              color_fondo {
              Codigo
              Color
              }
            }
            strapi_component
          }

          ... on STRAPI__COMPONENT_BLOQUES_BLOQUE_TEXTO {
            id
            Bloque {
              Titulo
              Alias
              OcultarTitulo
              MargenSuperior
              MargenInferior
              colorBarrita {
                Codigo
                Color
              }
              FotoFondo {
                url
              }
              colorFondoBloque {
                Color
                Codigo
              }
              colorBarrita {
                Codigo
              }
            }
            Texto {
              tipografia {
                class
                Size
              }
              Texto {
                data {
                  Texto
                  id
                }
              }
              colorTexto {
                Color
                Codigo
              }
            }
            CallToAction {
              texto
              url
              ComoAbrir
              colorTexto {
                Codigo
              }
              colorBoton {
                Codigo
              }
            }
            strapi_component
          }
        }
      }
    }
`;
