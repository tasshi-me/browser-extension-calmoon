// eslint-disable-next-line node/no-unpublished-import
import { Configuration } from "webpack";
// eslint-disable-next-line node/no-unpublished-import
import { merge } from "webpack-merge";
import common from "./webpack.common";

const config: Configuration = merge(common, {
  mode: "production",
});

export default config;
