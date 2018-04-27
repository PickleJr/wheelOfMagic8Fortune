const path = require('path');
const webpack = require('webpack');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader');

module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /\.scss$/,
                use: [
                    'vue-style-loader',
                    'css-loader',
                    'sass-loader'
                ]
            },
            {
                test: /\.pug$/,
                loader: 'pug-plain-loader'
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin('dist'),
        new VueLoaderPlugin(),
        new HtmlWebPackPlugin({
            title: 'Vue',
            template: require('html-webpack-template'),
            inject: false,
            appMountId: 'root',
            meta: [
                {
                    name: 'keywords',
                    content: 'Magic,Eight,8,Ball,Wheel,Of,Fortune'
                },
                {
                    name: 'description',
                    content: 'A Wheel of Fortune Themed Magic 8 Ball'
                }
            ],
            mobile: true,
        })
    ]
}