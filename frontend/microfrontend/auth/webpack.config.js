const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: './src/index.js',
  mode: 'development',
  devServer: {
    port: 3003,
  },
  output: {
    publicPath: 'http://localhost:3003/',
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
    new ModuleFederationPlugin({
      name: 'auth',
      filename: 'remoteEntry.js',
      exposes: {
        './Login': './src/components/Login',
        './InfoTooltip': './src/components/InfoTooltip',
        './ProtectedRoute': './src/components/ProtectedRoute',
        './Register': './src/components/Register',
        './Header': './src/components/Header',
      },
      shared: ['react', 'react-dom'],
    }),
  ],
};