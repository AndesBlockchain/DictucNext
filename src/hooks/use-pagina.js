import { useStaticQuery, graphql } from "gatsby";

const usePagina = (slug) => {
  const data = useStaticQuery(graphql`
{
  allStrapiPagina {
    nodes {
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
          Bloque {
            Alias
            FotoFondo {
              formats {
                medium {
                  url
                }
              }
            }
            OcultarTitulo
            MargenSuperior
            MargenInferior
            Titulo
            colorBarrita {
              Codigo
              Color
            }
            colorFondoBloque {
              Codigo
              Color
            }
          }
          strapi_component
        }

        ... on STRAPI__COMPONENT_BLOQUES_BLOQUE_TIPOSDE_SERVICIO {
          strapi_component
        }

        ... on STRAPI__COMPONENT_BLOQUES_BLOQUE_TABS {
          id
          strapi_component
          Bloque {
            Alias
            FotoFondo {
              formats {
                medium {
                  url
                }
              }
            }
            OcultarTitulo
            MargenSuperior
            MargenInferior
            Titulo
            colorBarrita {
              Codigo
              Color
            }
            colorFondoBloque {
              Codigo
              Color
            }
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
            Alias
            FotoFondo {
              formats {
                medium {
                  url
                }
              }
            }
            OcultarTitulo
            MargenSuperior
            MargenInferior
            Titulo
            colorBarrita {
              Codigo
              Color
            }
            colorFondoBloque {
              Codigo
              Color
            }
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
            Alias
            FotoFondo {
              formats {
                medium {
                  url
                }
              }
            }
            OcultarTitulo
            MargenSuperior
            MargenInferior
            Titulo
            colorBarrita {
              Codigo
              Color
            }
            colorFondoBloque {
              Codigo
              Color
            }
          
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
            Alias
            FotoFondo {
              formats {
                medium {
                  url
                }
              }
            }
            OcultarTitulo
            MargenSuperior
            MargenInferior
            Titulo
            colorBarrita {
              Codigo
              Color
            }
            colorFondoBloque {
              Codigo
              Color
            }
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
            Alias
            FotoFondo {
              formats {
                medium {
                  url
                }
              }
            }
            OcultarTitulo
            MargenSuperior
            MargenInferior
            Titulo
            colorBarrita {
              Codigo
              Color
            }
            colorFondoBloque {
              Codigo
              Color
            }
          }
          strapi_component
        }
        ... on STRAPI__COMPONENT_BLOQUES_BLOQUE_GALERIA {
          id
          strapi_component
          Bloque {
            Alias
            FotoFondo {
              formats {
                medium {
                  url
                }
              }
            }
            OcultarTitulo
            MargenSuperior
            MargenInferior
            Titulo
            colorBarrita {
              Codigo
              Color
            }
            colorFondoBloque {
              Codigo
              Color
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
          etiqueta_noticia {
            etiqueta
            documentId
          }
          Bloque {
            Alias
            FotoFondo {
              formats {
                medium {
                  url
                }
              }
            }
            OcultarTitulo
            MargenSuperior
            MargenInferior
            Titulo
            colorBarrita {
              Codigo
              Color
            }
            colorFondoBloque {
              Codigo
              Color
            }
          }
          strapi_component
        }
        ... on STRAPI__COMPONENT_BLOQUES_BLOQUE_TARJETAS {
          id
          TarjetasPorFila
          Bloque {
            Alias
            FotoFondo {
              formats {
                medium {
                  url
                }
              }
            }
            OcultarTitulo
            MargenSuperior
            MargenInferior
            Titulo
            colorBarrita {
              Codigo
              Color
            }
            colorFondoBloque {
              Codigo
              Color
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
              localFile {
                childImageSharp {
                  gatsbyImageData(width: 400, placeholder: BLURRED, formats: [AUTO, WEBP, AVIF])
                }
              }
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
          }
          strapi_component
        }
        ... on STRAPI__COMPONENT_BLOQUES_BLOQUE_TEXTO {
          id
          Bloque {
            Alias
            FotoFondo {
              formats {
                medium {
                  url
                }
              }
            }
            OcultarTitulo
            MargenSuperior
            MargenInferior
            Titulo
            colorBarrita {
              Codigo
              Color
            }
            colorFondoBloque {
              Codigo
              Color
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
}
  `);
  
  const pagina = data.allStrapiPagina.nodes.find(p => p.slug === slug);
  
  return pagina || null;
}

export default usePagina; 