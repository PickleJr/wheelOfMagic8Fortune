const path = require('path');
const webpack = require('webpack');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader');
const HtmlWebpackIncludeAssetsPlugin = require('html-webpack-include-assets-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

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
        new CopyWebpackPlugin([
            {
                from: 'node_modules/materialize-css/dist/css/materialize.min.css',
                to: 'css/'
            },
            {
                from: 'node_modules/materialize-css/dist/js/materialize.min.js',
                to: 'js/'
            },
            {
                from: 'src/Winwheel.min.js',
                to: 'js/'
            },
            {
                from: 'node_modules/animate.css/animate.min.css',
                to: 'css/'
            }
        ]),
        new VueLoaderPlugin(),
        new HtmlWebPackPlugin({
            title: 'Wheel of 8 Ball',
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
            scripts: [
                'js/materialize.min.js',
                'js/Winwheel.min.js',
                'http://cdnjs.cloudflare.com/ajax/libs/gsap/latest/TweenMax.min.js'
            ],
            links: [
                'https://fonts.googleapis.com/icon?family=Material+Icons'
            ]
        }),
        new HtmlWebpackIncludeAssetsPlugin({
            assets: ['css/materialize.min.css', 'css/animate.min.css'],
            append: false
        })
    ]
}