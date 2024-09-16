const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: './src/index.js',
  mode: 'development',
  devServer: {
    port: 3001,
  },
  output: {
    publicPath: 'http://localhost:3001/',
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
    new ModuleFederationPlugin({
      name: 'profile',
      filename: 'remoteEntry.js',
      exposes: {
        './EditAvatarPopup': './src/components/EditAvatarPopup',
        './EditProfilePopup': './src/components/EditProfilePopup'
      },
      shared: ['react', 'react-dom'],
    }),
  ],
};