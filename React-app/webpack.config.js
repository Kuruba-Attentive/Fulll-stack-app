const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./src/index.tsx",
  output: {
    path: path.join(__dirname, "build"),
    filename: "bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: "ts-loader",
        exclude: /node_modules/
      },
      {
        test: /\.jsx?$/,
        loader: "babel-loader",
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader", "postcss-loader"],
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: [".js", ".ts", ".jsx", ".tsx"]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/main.html"
    })
  ]
};
