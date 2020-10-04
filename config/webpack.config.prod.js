const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const webpack = require("webpack");
const path = require("path");

const PATHS = {
  src: path.join(__dirname, "../src"),
  dist: path.join(__dirname, "../dist"),
};

module.exports = {
  context: __dirname,
  mode: "production",
  entry: {
    app: [PATHS.src],
  },
  output: {
    path: PATHS.dist,
    filename: "[name].[chunkhash].js",
    publicPath: "./",
  },
  optimization: {
    runtimeChunk: "single",
    splitChunks: {
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendors",
          enforce: true,
          chunks: "all",
        },
      },
    },
  },
  module: {
    rules: [
      {
        test: /.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
          },
          {
            loader: "resolve-url-loader",
          },
          {
            loader: "sass-loader",
          },
        ],
      },
      {
        test: /\.(jpg|png)$/,
        use: "file-loader",
      },
      {
        test: /\.(js)$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        options: {
          presets: [
            "@babel/preset-env",
            {
              plugins: ["@babel/plugin-proposal-class-properties"],
            },
          ],
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      hash: true,
      title: "Dynamic products Showcase with CRUD - mongodb",
      template: path.join(PATHS.src, "index.html"),
      filename: path.join(PATHS.dist, "index.html"),
    }),
    new CopyWebpackPlugin([
      {
        from: path.join(PATHS.src, "favicon.ico"),
        to: path.join(PATHS.dist, "favicon.ico"),
      },
      {
        from: path.join(PATHS.src, "assets"),
        to: path.join(PATHS.dist, "assets"),
      },
    ]),
    new MiniCssExtractPlugin({
      filename: "[name].[chunkhash].css",
    }),
    new webpack.DefinePlugin({
      PRODUCTION: JSON.stringify(true),
      VERSION: JSON.stringify("1.2.0"),
      DEBUG: false,
    }),
  ],
};
