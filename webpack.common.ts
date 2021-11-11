import CopyPlugin from "copy-webpack-plugin";
import path from "path";
import { Configuration } from "webpack";
// eslint-disable-next-line @typescript-eslint/no-var-requires
const JsonMinimizerWebpackPlugin = require("json-minimizer-webpack-plugin");

const config: Configuration = {
  mode: "production",
  entry: {
    main: "src/app/calmoon.ts",
  },

  output: {
    path: path.resolve(__dirname, "build"),
    filename: "js/[name].js",
    publicPath: "",
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
    alias: {
      src: path.resolve(__dirname, "src/"),
      images: path.resolve(__dirname, "images/"),
    },
  },
  watch: false,
  devtool: false,
  plugins: [
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
