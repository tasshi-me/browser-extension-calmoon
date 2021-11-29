// eslint-disable-next-line node/no-unpublished-import
import CopyPlugin from "copy-webpack-plugin";
import path from "path";
// eslint-disable-next-line node/no-unpublished-import
import { Configuration, ProvidePlugin } from "webpack";
// eslint-disable-next-line @typescript-eslint/no-var-requires
// eslint-disable-next-line node/no-unpublished-require
const JsonMinimizerWebpackPlugin = require("json-minimizer-webpack-plugin");
// eslint-disable-next-line node/no-unpublished-import
import HtmlWebpackPlugin from "html-webpack-plugin";
// eslint-disable-next-line node/no-unpublished-import
import MiniCssExtractPlugin from "mini-css-extract-plugin";
// eslint-disable-next-line node/no-unpublished-require
const MergeJsonWebpackPlugin = require("merge-jsons-webpack-plugin");

const targetBrowser = process.env.TARGET === "firefox" ? "firefox" : "chrome";

const config: Configuration = {
  mode: "production",
  entry: {
    "prevent-send-notification": {
      import: "src/content-scripts/prevent-send-notification.ts",
      filename: "content-scripts/[name].js",
    },
    "auto-read-notifications": {
      import: "src/content-scripts/auto-read-notifications.ts",
      filename: "content-scripts/[name].js",
    },
    options: {
      import: "src/settings/options.ts",
      filename: "settings/[name].js",
    },
  },

  output: {
    path: path.resolve(__dirname, `build/${targetBrowser}`),
    filename: "[name].js",
    publicPath: "",
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
    alias: {
      src: path.resolve(__dirname, "src/"),
      images: path.resolve(__dirname, "images/"),
    },
    fallback: {
      stream: require.resolve("stream-browserify"),
      buffer: require.resolve("buffer/"),
      timers: require.resolve("timers-browserify"),
    },
  },
  watch: false,
  devtool: false,
  plugins: [
    new ProvidePlugin({
      process: require.resolve("process/browser"),
    }),
    new MiniCssExtractPlugin({
      filename: "settings/options.css",
    }),
    new HtmlWebpackPlugin({
      filename: "settings/options.html",
      template: "src/settings/options.html",
      chunks: ["options"],
      // publicPath: "../",
      publicPath: "/",
      // inject: "body",
    }),
    new MergeJsonWebpackPlugin({
      files: [
        "manifest.json",
        targetBrowser === "chrome"
          ? "src/manifest.chrome.json"
          : "src/manifest.firefox.json",
      ],
      output: { fileName: "manifest.json" },
    }),
    new CopyPlugin({
      patterns: [
        {
          from: "src/icons",
          to: "./icons",
        },
        {
          from: "src/locales",
          to: "./_locales",
        },
      ],
    }),
  ],
  optimization: {
    minimize: true,
    minimizer: ["...", new JsonMinimizerWebpackPlugin()],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      {
        test: /\.html$/,
        loader: "html-loader",
      },
      {
        test: /\/manifest\.json$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[ext]",
            },
          },
          "extract-loader",
          {
            loader: "chrome-manifest-loader",
            options: {
              mapVersion: true,
            },
          },
        ],
        type: "javascript/auto",
      },
    ],
  },
};

export default config;
