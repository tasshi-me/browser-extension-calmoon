import CopyPlugin from "copy-webpack-plugin";
import path from "path";
import { Configuration } from "webpack";
// eslint-disable-next-line @typescript-eslint/no-var-requires
const MinifyJSONWebpackPlugin = require("minify-json-webpack-plugin");

module.exports = (
  env: "production" | "development" | "none" | undefined,
  argv: { mode: "production" | "development" }
): Configuration => {
  const mode = argv.mode || "development";
  const dist =
    mode === "development"
      ? path.resolve(__dirname, "dev-build")
      : path.resolve(__dirname, "build");

  return {
    mode,

    entry: {
      main: "src/app/calmoon.ts",
    },

    output: {
      path: dist,
      filename: "js/[name].js",
    },
    resolve: {
      extensions: [".ts", ".tsx", ".js"],
      alias: {
        src: path.resolve(__dirname, "src/"),
        images: path.resolve(__dirname, "images/"),
      },
    },
    watch: mode === "development",
    devtool: mode === "development" ? "inline-source-map" : false,
    plugins: [
      new MinifyJSONWebpackPlugin(),
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
  } as Configuration;
};
