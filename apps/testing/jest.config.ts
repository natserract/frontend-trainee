import type { JestConfigWithTsJest } from "ts-jest";

const config: JestConfigWithTsJest = {
  displayName: "UI Core",
  roots: ["<rootDir>/src"],
  testMatch: ["**/*.test.{js,ts,jsx,tsx}"],
  testEnvironment: "jsdom",
  /* Tells jest to ignore duplicated manual mock files, such as index.js */
  modulePathIgnorePatterns: [".*__mocks__.*"],
  testPathIgnorePatterns: ["node_modules/", "dist/"],
  transform: {
    "^.+\\.tsx?$": [
      "ts-jest",
      {
        useESM: true,
      },
    ],
  },
  transformIgnorePatterns: [
    "/node_modules/",
    "^.+\\.module\\.(css|sass|scss)$",
  ],
  globalSetup: "<rootDir>/src/test/global-setup.js",
  setupFiles: [require.resolve("whatwg-fetch")],
  moduleNameMapper: {
    "\\.(gif|ttf|eot|svg|png)$": "<rootDir>/test/__mocks__/fileMock.js", // for imgs/assets
    "\\.(css|less|sass|scss)$": "identity-obj-proxy", // for styles
    "^@/(.*)$": "<rootDir>/$1", // for Path aliases
  },
  setupFilesAfterEnv: ["<rootDir>/jest-setup.ts"],
  watchPlugins: [
    "jest-watch-typeahead/filename",
    "jest-watch-typeahead/testname",
  ],
};

module.exports = config;
