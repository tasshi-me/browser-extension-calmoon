import path from "path";
// eslint-disable-next-line node/no-unpublished-import
import { Configuration } from "webpack";
// eslint-disable-next-line node/no-unpublished-import
import { merge } from "webpack-merge";
import common from "./webpack.common";

process.traceDeprecation = true;

const targetBrowser = process.env.TARGET === "firefox" ? "firefox" : "chrome";

const config: Configuration = merge(common, {
  mode: "development",

  output: {
    path: path.resolve(__dirname, `dev-build/${targetBrowser}`),
  },
  watch: true,
  devtool: "inline-source-map",
  optimization: {
    minimize: false,
  },
});

export default config;
