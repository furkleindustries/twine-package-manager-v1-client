const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin');

module.exports = {
    webpack(config, { dev }) {
        /* Enable only in Production */
        if (!dev) {
            /* Service Worker */
            config.plugins.push(
                new SWPrecacheWebpackPlugin({
                    filename: 'service-worker.js',
                    minify: true,
                    staticFileGlobsIgnorePatterns: [
                        /\.next\//,
                    ],

                    staticFileGlobs: [
                        /* Precache all static files by default */
                        'static/**/*',
                    ],

                    forceDelete: true,

                    runtimeCaching: [
                        /* Example with different handlers */
                        {
                            handler: 'fastest',
                            urlPattern: /\.(png|jpe?g|css)$/i,
                        },

                        {
                            handler: 'networkFirst',
                            urlPattern: /^http.*/, //cache all files
                        },
                    ],
                })
            );
        }

        return config;
    },

    assetPrefix: './',
};