const webpack = require("webpack");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./src/index.js",
  module: {
    rules: [
      {
        test: /\.(t|j)sx?$/,
        use: { loader: "ts-loader" },
        exclude: /node_modules/
      },
      {
        enforce: "pre",
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "source-map-loader"
      }
    ]
  },
  resolve: {
    extensions: ["*", ".js", ".jsx", ".ts", ".tsx"]
  },
  devtool: "source-map",
  output: {
    path: __dirname + "/dist",
    publicPath: "/",
    filename: "[name].[hash].js"
  },
  plugins: [
    new CleanWebpackPlugin(),
    new CopyPlugin([{ from: "./src/assets/**/**", to: ".", flatten: true }]),
    new HtmlWebpackPlugin({
      filename: "./index.html",
      template: "./src/index.html"
    }),
    new webpack.HotModuleReplacementPlugin()
  ],
  devServer: {
    contentBase: "./dist",
    hot: true
  }
};
