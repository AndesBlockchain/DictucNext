import { withSentryConfig } from '@sentry/nextjs';
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactCompiler: true,  
  images: {
    dangerouslyAllowLocalIP: true,
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

  // Desactivar features pesadas que no se usan
  disableLogger: true,

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
