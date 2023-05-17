const { withTemplate } = require('./webpack.config.template');
const withTM = require('next-transpile-modules')([
  '@mui/material',
  '@mui/system',
  '@mui/icons-material', // If @mui/icons-material is being used,
  // this make wagmi esm works
  // avoid unhandledRejection Error [ERR_REQUIRE_ESM]:
  '@lens-protocol/wagmi',
]);

module.exports = withTM({
  output: 'standalone',
  eslint: {
    // do not run on stories during build
    dirs: ['pages', 'libs', 'domain', 'app', 'components'],
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },

  webpack: (config, { webpack }) => {
    return withTemplate(config);
  },
});
