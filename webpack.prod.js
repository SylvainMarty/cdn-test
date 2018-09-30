const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");

module.exports = merge(common, {
    mode: 'production',
    output: {
        path: path.resolve(__dirname, 'dist')
    },
    optimization: {
        concatenateModules: true,
        minimizer: [
            new UglifyJsPlugin({
                parallel: 4,
                uglifyOptions: {
                    compress: {
                        inline: true,
                        warnings: false, // Suppress uglification warnings
                        pure_getters: true,
                        unsafe: true,
                        unsafe_comps: true,
                        drop_console: true
                    },
                    output: {
                        comments: false,
                        beautify: false
                    },
                    exclude: [/\.min\.js$/gi, /\.min\.css/gi] // skip pre-minified libs
                }
            }),
            new OptimizeCSSAssetsPlugin({})
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('production')
            }
        }),
        new webpack.LoaderOptionsPlugin({
            minimize: true
        }),
        new CleanWebpackPlugin(['dist/*'])
    ],
    performance: {
        hints: false
    }
});