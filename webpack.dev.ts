import path from "path";
import { Configuration } from "webpack";
import { merge } from "webpack-merge";
import common from "./webpack.common";

process.traceDeprecation = true;

const config: Configuration = merge(common, {
  mode: "development",

  output: {
    path: path.resolve(__dirname, "dev-build"),
  },
  watch: true,
  devtool: "inline-source-map",
  optimization: {
    minimize: false,
  },
});

export default config;
