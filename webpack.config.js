var webpack = require('webpack');
var path = require('path');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
    devtool: 'inline-source-map',
    entry: {
        bundle: "./src/components/App.jsx"
    },
    output: {
        filename: './assets/js/bundle.js'
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                loaders: [
                    'react-hot-loader', 'babel-loader?presets[]=react,presets[]=es2015'
                ],
                exclude: /node_modules/
            },
            {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: 'css-loader!autoprefixer-loader!sass-loader'
                }),
            }
        ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        new ExtractTextPlugin({
            filename: './assets/css/styles.css',
            allChunks: true
        })
    ]
};
