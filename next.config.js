const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: ["localhost", "0.0.0.0", "axiom-bucket-media.s3.amazonaws.com"],
  },
  webpack: (config) => {
    config.externals.push({
      "utf-8-validate": "commonjs utf-8-validate",
      bufferutil: "commonjs bufferutil",
    });
    return config;
  },
  async rewrites() {
    return [
      {
        source: "/socket.io/:path*",
        destination: "http://0.0.0.0:3000/socket.io/:path*",
      },
    ];
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

module.exports = nextConfig;
