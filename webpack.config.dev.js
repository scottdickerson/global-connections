const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const config = {
  // absolute path for project root
  context: path.resolve(__dirname, "src"),
  mode: "development",

  entry: {
    // relative path declaration
    app: "./index.jsx"
  },

  output: {
    // absolute path declaration
    path: path.resolve(__dirname, "dist"),
    filename: "./assets/js/[name].bundle.js"
  },
  resolve: {
    extensions: [".js", ".jsx"]
  },

  module: {
    rules: [
      // babel-loader with 'env' preset
      {
        test: /\.jsx?$/,
        include: /src/,
        exclude: /node_modules/,
        use: { loader: "babel-loader" }
      },
      // html-loader
      {
        test: /\.html$/,
        include: /src/,
        use: ["html-loader"]
      },
      // sass-loader with sourceMap activated

      // file-loader(for images)
      {
        test: /\.(jpg|png|gif|svg)$/,
        include: [/src/, /node_modules/],
        use: [
          {
            loader: "file-loader",
            options: { name: "[name].[ext]", outputPath: "./assets/media/" }
          }
        ]
      },
      // css time!
      {
        test: /\.css$/,
        include: [/src/, /node_modules/],
        use: ["style-loader", "css-loader"]
      },
      // file-loader(for fonts)
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        include: [/src/, /node_modules/],
        use: ["file-loader"]
      }
    ]
  },

  plugins: [new HtmlWebpackPlugin({ template: "../public/index.html" })],

  devServer: {
    // static files served from here
    contentBase: path.resolve(__dirname, "./public"),
    compress: true,
    // open app in localhost:2000
    port: 8989,
    stats: "errors-only",
    open: true
  },

  devtool: "inline-source-map"
};

module.exports = config;
