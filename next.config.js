/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://localhost:8081/:path*',
      },
      {
        source: '/webhook',
        destination: 'http://localhost:8081/webhook',
      },
    ]
  },
}