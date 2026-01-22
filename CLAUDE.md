# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js 16.1.3 frontend application for DICTUC (a Chilean organization), built with the App Router architecture. It consumes content from a Strapi CMS backend running on port 1337 and uses a dynamic block-based content system for rendering pages.

## Development Commands

```bash
# Start development server (runs on http://localhost:3000)
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run ESLint
npm run lint
```

## Tech Stack

- **Framework**: Next.js 16.1.3 with App Router
- **React**: 19.2.3 with React Compiler enabled (experimental)
- **Styling**: Tailwind CSS 4 + DaisyUI 5.5.14
- **Icons**: Font Awesome 7.1.0
- **CMS Backend**: Strapi (local at http://127.0.0.1:1337)
- **Fonts**: Montserrat (Google Fonts), Geist Sans & Geist Mono

## Architecture

### Directory Structure

```
src/
├── app/(pages)/        # App Router pages (route group)
│   ├── layout.js       # Root layout with fonts and metadata
│   ├── page.js         # Home page
│   └── globals.css     # Global styles and Tailwind config
├── components/         # React components
│   ├── bloquesPaginas/ # Dynamic block components for CMS content
│   └── carrusel/       # Carousel components
├── helpers/            # Utility functions
│   ├── bloque-renderer.js  # Maps Strapi block types to components
│   ├── queries.js          # Legacy Gatsby GraphQL queries
│   └── [other helpers]
└── hooks/              # Custom React hooks for data fetching
```

### Key Patterns

#### Block-Based Content System

The app uses a dynamic block rendering system for CMS content:

1. **Block Renderer** (`src/helpers/bloque-renderer.js`): Central switch statement that maps Strapi component types to React components
2. **Block Components** (`src/components/bloquesPaginas/`): Each block type has its own component
3. **Block Wrapper** (`src/components/bloquesPaginas/Bloque.js`): Common wrapper providing titles, backgrounds, and styling

Available block types:
- `bloques.bloque-texto` → BloqueTexto
- `bloques.bloque-hero` → BloqueHero
- `bloques.bloque-galeria` → BloqueGaleria
- `bloques.bloque-noticias` → BloqueNoticias
- `bloques.bloque-tarjetas` → BloqueTarjetas
- `bloques.bloque-efemerides` → BloqueEfemerides
- `bloques.bloque-personas` → BloquePersonas
- `bloques.bloque-documentos` → BloqueDocumentos
- `bloques.bloque-tiposde-servicio` → BloqueTiposServicio
- `bloques.bloque-tabs` → BloqueTabs (with BloqueAcordeon variant)
- `bloques.bloque-sectores-pais` → BloqueSectoresPais

#### Data Fetching with Custom Hooks

Data is fetched server-side using async custom hooks (prefixed `use-`):
- Hooks are async functions that fetch from Strapi API
- Called in Server Components with `await`
- Example: `const noticias = await useUltimasNoticias()`

#### Path Aliases

Use `@/` to reference the `src/` directory:
```javascript
import Component from '@/components/Component'
import useHook from '@/hooks/use-hook'
```

## Configuration

### Environment Variables

Required in `.env.local`:
```
STRAPI_API_URL=http://127.0.0.1:1337
```

### Next.js Config

- **React Compiler**: Enabled in experimental mode
- **Image Domains**: Configured for Strapi on localhost:1337

### Tailwind/DaisyUI Theme

Custom color tokens defined in `globals.css`:
- `--color-azul-dictuc`: #307fe2 (primary blue)
- `--color-gris-dictuc`: #53565A (text gray)
- Sustainability colors: rojo, amarillo, verde, azul, fucsia (sostenibilidad variants)

## Important Notes

- The codebase contains legacy Gatsby GraphQL queries in `src/helpers/queries.js` - these are not used in the Next.js version
- Strapi backend must be running on port 1337 for the app to function
- The app uses Server Components by default (Next.js App Router)
- Font Awesome is loaded globally
- Route group `(pages)` is used but doesn't affect URL structure
