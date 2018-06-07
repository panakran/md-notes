const webpack = require('webpack');
const path = require('path');
const fs = require('fs');
const gracefulFs = require('graceful-fs');
const entryPath = "./entry-webpack.js";
const mode = "development";
gracefulFs.gracefulify(fs);

module.exports = {
    context: path.join(__dirname, ''),
    mode: mode,
    module: {
        rules: [
            {
//                css loader 
//                ex. require('./node_modules/bootstrap/dist/css/bootstrap.css'); webpac entry
//                import 'bootstrap/dist/css/bootstrap.min.css'; start of angular module
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {// used to support all browsers @https://webpack.js.org/loaders/babel-loader/
                        presets: ['babel-preset-env']
                    }
                }
            },
            {
                test: /\.(png|woff|woff2|eot|ttf|svg)$/, //used to load bootstrap extra files used in app
                loader: 'url-loader?limit=100000'
            }
        ]
    },
    plugins: [
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            Showdown:"showdown"
        })
    ],
    entry: {
        "bundle": entryPath
    },
    output: {
        path: __dirname,
        filename: "./dist/[name].js"
    }
};