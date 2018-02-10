const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const config = require('../src/config');

module.exports = {
    context: path.resolve(process.cwd(), 'src'),
    resolve: {
        extensions: ['.ts', '.tsx', '.js']
    },
    devtool: 'cheap-module-eval-source-map',
    target: 'web',
    entry: {
        'vendor': './vendor.js',
        'app': './client.js'
    },
    output: {
        path: path.join(process.cwd(), './dist/public'),
        filename: '[name].js',
        chunkFilename: '[chunkhash].chunk.js',
        publicPath: '/',
    },
    devServer: {
        historyApiFallback: true,
        stats: 'minimal',
        inline: true,
        hot: true,
        proxy: {
            "/": {
                target: config.host
            }
        }
    },
    module: {
        rules: [
            {
                test: /\.(js)$/,
                use: 'babel-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.(css|scss)$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: ['css-loader', 'sass-loader']
                })
            },
            {
                test: /\.(png|jpeg|woff|woff2|eot|ttf|svg)$/,
                use: 'file-loader'
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin('style.css'),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.NamedModulesPlugin(),
    ]
};