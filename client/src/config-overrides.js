const webpack = require('webpack');

module.exports = function override(config) {
    const fallback = config.resolve.fallback || {};
    Object.assign(fallback, {
        "crypto": require.resolve("crypto-browserify"),
        "stream": require.resolve("stream-browserify"),
        "assert": require.resolve("assert"),
        "http": require.resolve("stream-http"),
        "https": require.resolve("https-browserify"),
        "os": require.resolve("os-browserify"),
        "url": require.resolve("url")
    })
    config.resolve.fallback =   { "zlib": require.resolve("browserify-zlib") }
    config.plugins = (config.plugins || []).concat([
        new webpack.ProvidePlugin({
            Buffer: ['buffer', 'Buffer'],
            'process/browser': require.resolve('process/browser')
        })
    ])
    config.ignoreWarnings = [/Failed to parse source map/];
    return config;
}