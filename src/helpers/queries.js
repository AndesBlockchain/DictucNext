import { graphql } from "gatsby";

export const PAGE_QUERY = graphql`
  query PageQuery($slug: String) {
    allStrapiPagina(filter: {slug: {eq: $slug}})  {
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
          ... on STRAPI__COMPONENT_BLOQUES_BLOQUE_TIPOSDE_SERVICIO {
            id
            strapi_component
          }

          ... on STRAPI__COMPONENT_BLOQUES_BLOQUE_TABS {
            id
            strapi_component
            Bloque {
              Titulo
              Alias
              OcultarTitulo
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
              Titulo
              Alias
              OcultarTitulo
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
  }
`;
