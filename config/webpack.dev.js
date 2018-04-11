const path = require('path');
const webpack = require('webpack');

module.exports = require('./webpack.common')({
    mode: 'development',
    plugins: []
})