const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const config = {
  /* Entry property for handle any import js file from other directory and combine all into bundle js and use inside html page
    => The controller of app for manipulate from models.js and views.js files.
  */
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js',
    publicPath: 'build/'
  },
  module: {
    rules : [
      {
        use: 'babel-loader',
        test: /\.js$/
      },
      {
        // Thu vien xu ly file css cho webpack
        /*  1. style-loader
            2. css-loader
        */
        loader: ExtractTextPlugin.extract({
          loader: 'css-loader'
        }),
        test: /\.css$/
      },
      {
        // Compress image from server before render into html page.
        test: /\.(jpe?g|png|gif|svg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 40000 // Larger than 40Kb -> save into seperate file, otherwise include it into bundle.js
            }
          },
          'image-webpack-loader'
        ]
      }
    ]
  },
  plugins: [
    /* 3. extract-text-webpack-plugin: 
            extract all css file into one => style.css*/
    new ExtractTextPlugin('style.css')
  ]
};

module.exports = config;