/** @type {import('jest').Config} */
export default {
  collectCoverage: true,
  collectCoverageFrom: ["src/**/*"],
  coverageDirectory: "coverage",
  extensionsToTreatAsEsm: [".ts"],
  preset: "ts-jest/presets/default-esm",
  resetMocks: true,
  testMatch: ["**/__tests__/**/*.test.ts"],
};
