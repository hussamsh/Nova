"use strict";

const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin')


const commonConfig = {
    node: {
        __dirname: false,
        __filename: false
      },
    
    mode : "development",
    // Set debugging source maps to be "inline" for
    // simplicity and ease of use
    devtool: "inline-source-map",
  
    // Where to compile the bundle
    // By default the output directory is `dist`
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: '[name].js'
    },
  
    // Supported file loaders
    module: {
      rules: [
        {
          test: /\.(ts|tsx)$/,
          exclude: /node_modules/,
          loader: "ts-loader"
        }
      ]
    },
  
    // File extensions to support resolving
    resolve: {
      extensions: [".ts", ".tsx", ".js"]
    }
  };

module.exports = [
    Object.assign(
        {
          target: 'electron-main',
          entry: { main: './src/main.ts' }
        },
        commonConfig),
      Object.assign(
        {
          target : 'electron-renderer',
          entry: { renderer: './src/renderer.tsx' },
          plugins: [new HtmlWebpackPlugin({
              template : "./app/index.html"
          })]
        },
        commonConfig),
        Object.assign(
            {
              target : 'electron-preload',
              entry: { preload: './src/preload.ts' },
            },
            commonConfig)
]