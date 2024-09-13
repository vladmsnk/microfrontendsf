const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: './src/index.js',
  mode: 'development',
  output: {
    publicPath: 'http://localhost:3000/',
  },
  devServer: {
    port: 3000,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
    new ModuleFederationPlugin({
      name: 'host',
      remotes: {
        authApp: 'auth@http://localhost:3003/remoteEntry.js',
        cardsApp: 'card@http://localhost:3003/remoteEntry.js',
        profileApp: 'profile@http://localhost:3002/remoteEntry.js',
        sharedApp: 'shared@http://localhost:3005/remoteEntry.js',
      },
      shared: ['react', 'react-dom'],
    }),
  ],
};