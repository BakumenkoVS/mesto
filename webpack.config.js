const path = require('path');
const HtmlWebpackPack = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    mode: 'development',
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'main.js',
    },
    devServer: {
        port: 8090,
        compress: true,
        hot: true,
    },
        module: {
        rules: [
            {
                test: /\.js$/,
                use: 'babel-loader',
                exclude: /node-modules/,
            },
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader'],
            },
            {
                // регулярное выражение, которое ищет все файлы с такими расширениями
                test: /\.(png|svg|jpg|gif|woff(2)?|eot|ttf|otf)$/,
                type: 'asset/resource'
            },
        ],
    },
    plugins: [
        new HtmlWebpackPack({
            template: './src/index.html',
        }),
        new MiniCssExtractPlugin(),
    ],
}