import globals from "globals";
import pluginJs from "@eslint/js";

export default [
  {
    files: ["**/*.js"],
    languageOptions: {
      sourceType: "commonjs",
      globals: {...globals.browser, ...globals.node}
    },
    ignores: ["dist/","node_modules/"],
  },
  pluginJs.configs.recommended,
];
