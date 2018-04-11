const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");


module.exports = (options) => ({
    mode:options.mode,
    entry: path.join(process.cwd(), 'app/app.js'),
    output: {
        filename: '[name].js',
        chunkFilename: '[name].chunk.js',
        path: path.join(process.cwd(), 'public'),
        publicPath: '/'
    },
    module:{
        rules:[{
            test: /\.css$/,
            use:  [
                MiniCssExtractPlugin.loader,
                "css-loader"
              ]
        },{
            test: /\.js$/,
            exclude: /node_modules/,
            use: [{
                loader: 'babel-loader',
                options: {
                    presets: ['es2015']
                }
            }]
        },{
            test: /\.html$/,
            use: ['html-loader']
        },{
            test: /\.(jpg|png|gif)$/,
            use: [{
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]',
                    outputPath: 'images/',
                    publicPath: 'images/'
                }
            }]
        }]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "[name].css"
          }),
        new HtmlWebpackPlugin({
            template: 'app/index.html'
        })
    ],
    optimization: {
    },
});