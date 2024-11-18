import type { Config } from "jest";
import nextJest from "next/jest.js";

const createJestConfig = nextJest({
  dir: "./",
});

const config: Config = {
  coverageProvider: "v8",
  testEnvironment: "jsdom",
  moduleNameMapper: {
    "^@/(.*)": "<rootDir>/src/$1",
    "next-auth": "<rootDir>/src/__mocks__/auth/headers.ts",
    "@auth/core/jwt": "<rootDir>/src/__mocks__/auth/core-jwt.ts",
    "@auth/core": "<rootDir>/src/__mocks__/auth/core-jwt.ts",
    "@t3-oss": "<rootDir>/src/__mocks__/auth/core-jwt.ts",
  },
};

export default createJestConfig(config);
