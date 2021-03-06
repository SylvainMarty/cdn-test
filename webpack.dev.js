const path = require('path');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = merge(common, {
    mode: 'development',
    devtool: 'eval-source-map',
    output: {
        path: path.resolve(__dirname, 'build')
    },
    performance: {
        hints: 'warning'
    },
    plugins: [
        new CleanWebpackPlugin(['build/*'])
    ]
});