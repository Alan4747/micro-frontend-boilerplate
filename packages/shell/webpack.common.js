const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin =
  require("webpack").container.ModuleFederationPlugin;

const federationConfig = require("./federation.config.json");
const deps = require("./package.json").dependencies;

module.exports = {
  entry: {
    app: "./src/index",
  },
  plugins: [
    new ModuleFederationPlugin({
      ...federationConfig,
      filename: "remoteEntry.js",
      shared: {
        ...deps,
        react: {
          singleton: true,
          eager: true,
          requiredVersion: deps.react,
        },
        "react-dom": {
          singleton: true,
          eager: true,
          requiredVersion: deps["react-dom"],
        },
      },
    }),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
      favicon: "./public/favicon.ico",
      filename: "./index.html",
      manifest: "./public/manifest.json",
    }),
  ],
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx"],
    alias: {
      src: path.resolve(__dirname, "./src"),
    },
  },
  module: {
    rules: [
      {
        test: /bootstrap\.tsx$/,
        loader: "bundle-loader",
        options: {
          lazy: true,
        },
      },
      {
        test: /\.tsx?$/,
        loader: "babel-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.(css|scss)$/i,
        use: [
          // Creates `style` nodes from JS strings
          "style-loader",
          // Translates CSS into CommonJS
          "css-loader",
          // Compiles Sass to CSS
          "sass-loader",
        ],
      },
    ],
  },
};
