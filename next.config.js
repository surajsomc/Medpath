/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production'
const basePath = isProd ? '/Medpath' : ''

const nextConfig = {
  output: 'export',
  basePath,
  ...(basePath && { assetPrefix: `${basePath}/` }),
  images: {
    unoptimized: true,
  },
}

module.exports = nextConfig
