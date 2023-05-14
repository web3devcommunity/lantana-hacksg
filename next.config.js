const withTM = require('next-transpile-modules')([
    '@mui/material',
    '@mui/system',
    '@mui/icons-material', // If @mui/icons-material is being used,
    // this make wagmi esm works
    // '@lens-protocol/wagmi'
]);

module.exports = withTM({

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

