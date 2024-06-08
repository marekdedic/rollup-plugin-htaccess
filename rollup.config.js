import typescript from "@rollup/plugin-typescript";

export default {
  input: "src/index.ts",
  external: ["fs", "path"],
  output: [
    {
      file: "dist/index.cjs",
      format: "cjs",
      compact: true,
    },
    {
      file: "dist/index.js",
      format: "es",
      compact: true,
    },
  ],
  plugins: [typescript()],
};
