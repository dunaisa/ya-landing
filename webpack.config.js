const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  entry: './src/js/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index.js',
    publicPath: ''
  },
  mode: 'development',
  devServer: {
    static: {
      directory: path.join(__dirname, './dist'),
    },
    compress: true,
    port: 8080,
    open: true,
    hot: true,
    liveReload: true,
    watchFiles: ['src/**/*'],
  },
  module: {
    
    rules: [
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
        ],
      },
      {
        test: /\.(sass|scss)$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg)$/,
        type: 'asset/resource',
        generator: {
          filename: 'img/[name][ext][query]'
        }
      },      
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'fonts/',
              publicPath: 'fonts/'
            }
          }
        ]
      },
      {
        test: /\.html$/,
        use: ['html-loader']
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: 'index.html'
    }),
    new MiniCssExtractPlugin({
      filename: 'style.css'
    })
  ]
};