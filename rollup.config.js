import typescript from "@rollup/plugin-typescript";
import dts from "unplugin-dts/rollup";

export default {
  external: ["fs", "path", "domutils", "glob", "htmlparser2"],
  input: "src/index.ts",
  output: {
    compact: true,
    file: "dist/rollup-plugin-htaccess.js",
    format: "es",
  },
  plugins: [typescript(), dts({ bundleTypes: true })],
};
