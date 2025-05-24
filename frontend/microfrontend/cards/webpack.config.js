const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: './src/index.js',
  mode: 'development',
  devServer: {
    port: 3002,
  },
  output: {
    publicPath: 'http://localhost:3002/',
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
    new ModuleFederationPlugin({
      name: 'cards',
      filename: 'remoteEntry.js',
      exposes: {
        './AddPlacePopup': './src/components/AddPlacePopup',
        './Card': './src/components/Card',
        './ImagePopup': './src/components/ImagePopup',
        './Main': './src/components/Main'
      },
      shared: ['react', 'react-dom'],
    }),
  ],
};