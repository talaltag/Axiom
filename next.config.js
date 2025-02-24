
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['localhost', '0.0.0.0'],
  },
  webpack: (config) => {
    config.externals.push({
      'utf-8-validate': 'commonjs utf-8-validate',
      'bufferutil': 'commonjs bufferutil',
    });
    return config;
  },
  async rewrites() {
    return [
      {
        source: '/socket.io/:path*',
        destination: 'http://0.0.0.0:3000/socket.io/:path*',
      },
    ];
  },
}

module.exports = nextConfig
