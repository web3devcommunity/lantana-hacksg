/** @type {import('next').NextConfig} */

const nextConfig = {
  experimental: {
    appDir: true,
  },
  output: 'standalone',
  transpilePackages: [
    '@mui/material',
    '@mui/system',
    '@mui/icons-material', // If @mui/icons-material is being used,
    // this make wagmi esm works
    // avoid unhandledRejection Error [ERR_REQUIRE_ESM]:
    '@lens-protocol/wagmi',
  ],
  eslint: {
    // do not run on stories during build
    dirs: ['pages', 'libs', 'domain', 'app', 'components'],
  },
  webpack: (config) => {
    config.resolve.fallback = {
      buffer: require.resolve('buffer/'),
    };
    config.resolve.alias = {
      ...config.resolve.alias,
      '@mui/styled-engine': '@mui/styled-engine-sc',
    };
    return config;
  },
};

module.exports = nextConfig;
