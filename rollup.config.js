import typescript from "@rollup/plugin-typescript";

export default {
  external: ["fs", "path", "domutils", "htmlparser2"],
  input: "src/index.ts",
  output: {
    compact: true,
    file: "dist/rollup-plugin-htaccess.js",
    format: "es",
    sourcemap: true,
  },
  plugins: [typescript()],
};
