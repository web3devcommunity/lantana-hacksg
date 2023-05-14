const path = require('path');
const webpack = require('webpack');

const template = {
    resolve: {
        fallback: {
            buffer: require.resolve('buffer/'),
        },
        alias: {
            '@': path.resolve(__dirname, "./src/"),
            '@mui/styled-engine': '@mui/styled-engine-sc'
        }
    },
    plugins: [
        new webpack.ProvidePlugin({
            process: 'process/browser',
            Buffer: ['buffer', 'Buffer'],
        }),
    ]

}

withTemplate = (config) => {
    const newConfig = { ...config };
    newConfig.resolve.fallback = Object.assign({}, config.resolve.fallback, template.resolve.fallback);
    newConfig.resolve.alias = Object.assign({}, config.resolve.alias, template.resolve.alias);
    newConfig.plugins = [...config.plugins, ...template.plugins];

    newConfig.module.rules.push({
        exclude: /\.(stories|fixture)\.ts$/,
    });

    return newConfig
}

module.exports = {
    withTemplate
}
