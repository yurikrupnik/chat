const ExtractTextPlugin = require('extract-text-webpack-plugin');
const path = require('path');
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');

module.exports = {
    resolve: {
        extensions: ['.ts', '.tsx', '.js']
    },
    context: path.resolve(process.cwd(), 'src'),
    target: 'node',
    entry: './server.js',
    externals: [nodeExternals()], // in order to ignore all modules in node_modules folder
    devtool: '#cheap-module-eval-source-map',
    output: {
        path: path.join(process.cwd(), 'dist'),
        filename: '[name].js',
        chunkFilename: '[chunkhash].chunk.js',
        publicPath: '/',
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
                    use: ['css-loader', 'sass-loader?sourceMap']
                })
            },
            {
                test: /\.(png|jpeg|woff|woff2|eot|ttf|svg)$/,
                use: 'file-loader'
            }
        ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.NamedModulesPlugin(),
    ]
};