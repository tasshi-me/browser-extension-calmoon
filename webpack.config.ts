import CopyPlugin from "copy-webpack-plugin";
import path from "path";
import { Configuration } from "webpack";

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
      new CopyPlugin({
        patterns: [
          {
            from: "src/manifest.json",
            to: "./manifest.json",
          },
          {
            from: "src/icons",
            to: "./icons",
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
      ],
    },
  } as Configuration;
};
