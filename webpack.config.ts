import CopyPlugin from "copy-webpack-plugin";
import path from "path";
import { Configuration } from "webpack";

module.exports = (
  env: "production" | "development" | "none" | undefined,
  argv: { mode: "production" | "development" }
): Configuration => {
  const mode = argv.mode || "development",
    dist =
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
    devtool: mode === "development" ? "inline-source-map" : false,
    devServer: {
      contentBase: dist,
      port: 3000,
    },
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
