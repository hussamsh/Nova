"use strict";

const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const nodeExternals = require('webpack-node-externals');
const EventHooksPlugin = require('event-hooks-webpack-plugin');
const shebangLoader = require('shebang-loader');

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

  
    // Supported file loaders
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          loader: ["shebang-loader"]
        },
        {
          test: /\.(ts|tsx)$/,
          exclude: /node_modules/,
          loader: ["ts-loader"]
        },
        {
          test: /\.css$/i,
          use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: '[name].[ext]',
                outputPath: 'fonts/'
              }
            }
          ]
        },
        {
          test: /\.(png|jpe?g|gif)$/i,
          use: {
            loader : 'file-loader',
            options : {
              name : '[name].[ext]',
              outputPath: 'images/'
            }
          }
        },
        {
          test: /\.node$/,
          use: 'node-loader'
        }
      ]
    },
    // File extensions to support resolving
    resolve: {
      extensions: [".ts", ".tsx", ".js" , ".css" , ".png"], 
    },

    externals: [nodeExternals({
      whitelist: [/\.css/]
  })],
  };

module.exports = [
    Object.assign(
        {
          target: 'electron-main',
          entry: { main: './src/main.ts' },
          output: {
            path: path.resolve(__dirname, '.'),
            filename: '[name].js'
          },
        },
        commonConfig),
      Object.assign(
        {
          target : 'electron-renderer',
          entry: { 
            renderer: './src/renderer.tsx',
            thread : './src/threads/CryptoThread.ts',
          },
          plugins: [new HtmlWebpackPlugin({
              template : "./app/index.html",
          }),
          new HtmlWebpackPlugin({
            template : "./app/empty.html",
          })],
          output: {
            path: path.resolve(__dirname, 'dist'),
            filename: '[name].js'
          },
        },
        commonConfig),
        Object.assign(
            {
              target : 'electron-preload',
              entry: { preload: './src/preload.ts' },
              output: {
                path: path.resolve(__dirname, 'dist'),
                filename: '[name].js'
              },
            },
            commonConfig),
        Object.assign(
          {
            target : 'node',
            entry: { 
              release : './src/cli/release.ts',
            },
            output: {
              path: path.resolve(__dirname, 'dist'),
              filename: '[name].js'
            },
          },
          commonConfig),
          Object.assign(
            {
              target : 'node',
              entry: { 
                dh : './src/tests/DH.ts',
                logitsic : './src/tests/Logistic.ts',
                henon : './src/tests/Henon.ts',
                general : './src/tests/General.ts',
              },
              output: {
                path: path.resolve(__dirname, 'dist/tests'),
                filename: '[name].js'
              },
            },
            commonConfig),

]