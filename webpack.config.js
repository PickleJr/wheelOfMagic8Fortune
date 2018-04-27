const path = require('path');
const webpack = require('webpack');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader');

module.exports = {
    mode: 'development',
    entry: './src/index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    resolve: {
        alias: {
            vue: 'vue/dist/vue.js'
        }
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 1
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            sourceMap: true,
                        }
                    }
                ]
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader'
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