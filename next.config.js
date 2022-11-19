/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    local: {
      APIMASTER: 'http://localhost:50001/api/v1'
    }
  },
}

module.exports = nextConfig
