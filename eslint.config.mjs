// eslint-disable-next-line n/no-unpublished-import
import nodeTypescriptPrettier from "@cybozu/eslint-config/presets/node-typescript-prettier";

export default [
  {
    ignores: ["build/", "dev-build/", "web-ext-artifacts/"],
  },
  ...nodeTypescriptPrettier,
  {
    files: ["**/*.test.ts"],
    rules: {
      "n/no-unpublished-import": "off",
    },
  },
];
