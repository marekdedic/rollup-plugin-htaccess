import typescript from "@rollup/plugin-typescript";

export default {
  input: "src/index.ts",
  external: ["fs", "path", "domutils", "htmlparser2"],
  output: [
    {
      file: "dist/rollup-plugin-htaccess.cjs",
      format: "cjs",
      compact: true,
    },
    {
      file: "dist/rollup-plugin-htaccess.js",
      format: "es",
      compact: true,
    },
  ],
  plugins: [typescript()],
};
