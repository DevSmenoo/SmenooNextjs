/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    output: 'standalone', // Aiuta con il deploy su Vercel
    experimental: {
      serverActions: true, // Se usi server components
    },
  };
  
  module.exports = nextConfig;
  