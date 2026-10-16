// eslint-disable-next-line n/no-unpublished-import
import nodeTypescriptPrettier from "@cybozu/eslint-config/presets/node-typescript-prettier";

export default [
  {
    ignores: ["build/", "dev-build/", "web-ext-artifacts/"],
  },
  ...nodeTypescriptPrettier,
];
