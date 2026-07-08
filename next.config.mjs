import { withSentryConfig } from '@sentry/nextjs';

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    reactCompiler: true,
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    qualities: [75, 90, 100],
    minimumCacheTTL: 31536000,
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '1337',
        pathname: '/uploads/**',
      },
      {
        protocol: 'http',
        hostname: '127.0.0.1',
        port: '1337',
        pathname: '/uploads/**',
      },
      {
        protocol: 'https',
        hostname: 'backend-dictuc.andesblockchain.com',

        pathname: '/uploads/**',
      },
      {
        protocol: 'https',
        hostname: 'backendweb.dictuc.cl',

        pathname: '/uploads/**',
      },
      {
        protocol: 'https',
        hostname: 'wwwdictuc.blob.core.windows.net',
        pathname: '/fotosnoticiasantiguas/**',
      },
    ],
  },
};

export default withSentryConfig(nextConfig, {
  org: "andes-blockchain",
  project: "javascript-nextjs",
  silent: !process.env.CI,

  // Desactivar widenClientFileUpload para reducir build time
  widenClientFileUpload: false,

  // Tunnel para evitar ad-blockers
  tunnelRoute: "/monitoring",

  webpack: {
    automaticVercelMonitors: false,
    treeshake: {
      removeDebugLogging: true,
    },
  },

  bundleSizeOptimizations: {
    excludeDebugStatements: true,
    excludeReplayIframe: true,
    excludeReplayShadowDom: true,
    excludeReplayWorker: true,
  },
});
