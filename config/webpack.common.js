const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CleanCSSPlugin = require('less-plugin-clean-css');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');



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
            test: /\.(css|less)$/,
            exclude: /node_modules/,
            use: [
                MiniCssExtractPlugin.loader,
            {
                loader: 'css-loader'
            }, {
                loader: 'less-loader',
                options: {
                    plugins: [
                      new CleanCSSPlugin({ advanced: true })
                    ]
                }
            }]
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
            exclude: /node_modules/,
            use: ['html-loader']
        },{
            test: /\.(jpg|png|gif)$/,
            exclude: /node_modules/,
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
        new OptimizeCssAssetsPlugin({
            // assetNameRegExp: /\.optimize\.css$/g,
            cssProcessor: require('cssnano'),
            cssProcessorOptions: { discardComments: { removeAll: true } },
            canPrint: true
        }),
        new HtmlWebpackPlugin({
            template: 'app/index.html'
        }),
    ],
    optimization: {
    },
});