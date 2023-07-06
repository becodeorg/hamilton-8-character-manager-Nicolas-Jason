const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
     main: path.join(__dirname, 'src/js/index.js'),
     create: path.join(__dirname, 'src/js/create_character.js'),
     edit: path.join(__dirname, 'src/js/edit_character.js'),
     redirect: path.join(__dirname, 'src/js/redirect.js'),
  },
  output: {
    filename: 'js/[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'assets/images/[name].[contenthash][ext]',
        },
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader',
          {
            loader: 'sass-resources-loader',
            options: {
              resources: [
                './src/scss/utils/_variables.scss',
                './src/scss/utils/_mixins.scss',
                './src/scss/base/_font.scss',
                './src/scss/base/_reset.scss',
                './src/scss/base/_base.scss',
                './src/scss/layout/_header.scss',
                './src/scss/layout/_navbar.scss',
                './src/scss/page/_index.scss',
                './src/scss/page/_create_character.scss',
                './src/scss/layout/_footer.scss',
                './src/scss/layout/_modal.scss',
                './src/scss/page/_edit_character.scss',
                './src/scss/page/_redirect.scss',
                './src/scss/style.scss',
                
              ],
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/styles.css',
    }),
         new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.join(__dirname, './src/index.html'),
      chunks: ['main'],
    }),
    new HtmlWebpackPlugin({
      filename: 'page/create_character.html',
      template: './src/page/create_character.html',
      chunks: ['create'],
    }),
    new HtmlWebpackPlugin({
      filename: 'page/redirect.html',
      template: './src/page/redirect.html',
      chunks: ['redirect'],
    }),
    new HtmlWebpackPlugin({
      filename: 'page/edit_character.html',
      template: './src/page/edit_character.html',
      chunks: ['edit'],
    }),
  ],
  devtool: "source-map",
  mode: "development",
  devServer: {
    static: path.resolve(__dirname, './dist'),
    open: true,
    watchFiles: ['./src/**'],
    port: 4000,
    hot: true,
  }
};