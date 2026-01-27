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

export default nextConfig;
