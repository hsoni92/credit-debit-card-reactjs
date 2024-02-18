// Generated using webpack-cli https://github.com/webpack/webpack-cli

require('dotenv').config();
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "build"),
  },
  watchOptions: {
    ignored: '/node_modules/',
    poll: true,
    aggregateTimeout: 300,
    followSymlinks: false
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "public/index.html",
      baseUrl: '/aitestforge',
      filename: './index.html',
      favicon: './public/favicon.ico'
    }),
    new MiniCssExtractPlugin()
    // Add your plugins here
    // Learn more about plugins from https://webpack.js.org/configuration/plugins/
  ],
  module: {
    rules: [
      {
        test: /\.(?:js|jsx|mjs|cjs)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              ['@babel/preset-env', { targets: "defaults" }]
            ]
          }
        }
      },
      {
        test: /\.less$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader", "less-loader"],
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
        type: "asset",
      },
      // Add your rules for custom modules here
      // Learn more about loaders from https://webpack.js.org/loaders/
      {
        test: /\.ttf$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'fonts/',
            },
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: [".jsx", ".js", "..."],
    alias: {
      '@src': path.resolve(__dirname, 'src'),
      '@images': path.resolve(__dirname, 'src/images'),
      '@fonts': path.resolve(__dirname, 'src/fonts'),
      '@utils': path.resolve(__dirname, 'src/Utils'),
      '@components': path.resolve(__dirname, 'src/Components'),
    },
    fallback: {
      assert: require.resolve('assert'),
      path: require.resolve("path-browserify"),
      crypto: require.resolve('crypto-browserify'),
      http: require.resolve('stream-http'),
      https: require.resolve('https-browserify'),
      os: require.resolve('os-browserify/browser'),
      stream: require.resolve('stream-browserify'),
    }
  },
};
