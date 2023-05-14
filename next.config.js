const withTM = require('next-transpile-modules')([
    '@mui/material',
    '@mui/system',
    '@mui/icons-material', // If @mui/icons-material is being used,
    // this make wagmi esm works
    // avoid unhandledRejection Error [ERR_REQUIRE_ESM]:
    '@lens-protocol/wagmi'
]);

module.exports = withTM({
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
    }
});

