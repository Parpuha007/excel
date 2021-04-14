const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');


const isProd = process.env.NODE_ENV === 'production'
const isDev = !isProd

const filename = ext => isDev ? `bundle.${ext}` : `bundle.[hash].${ext}`

module.exports = {
   context: path.resolve(__dirname, 'src'),
   mode: "development",
   entry: './index.js',
   output: {
      filename: filename('js'),
      path: path.resolve(__dirname, 'dist'),
   },

   plugins: [
      new HtmlWebpackPlugin({
         template: 'index.html',
         minify: {
            removeComments: isProd,
            collapseWhitespace: isProd
         }
      }),
      new CopyPlugin({
         patterns: [
            {
               from: path.resolve(__dirname, 'src/favicon.ico'),
               to: path.resolve(__dirname, 'dist')
            }
         ]
      }),
      new CleanWebpackPlugin(),
      new MiniCssExtractPlugin({
         filename: filename('css')
      }),
   ],
   module: {
      rules: [
         {
            test: /\.s[ac]ss$/i,
            use: [
               MiniCssExtractPlugin.loader,
               "css-loader",
               "sass-loader",
            ],
         },
      ],
   },
   devServer: {
      contentBase: path.join(__dirname, 'src'),
      port: 9000,
      open: true,
   },
};