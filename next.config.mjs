/** @type {import('next').NextConfig} */
const nextConfig = {
  // If you fetch images from Strapi, you might need an image domain
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '1337',
        pathname: '/uploads/**',
      },
    ],
  },
};

export default nextConfig
