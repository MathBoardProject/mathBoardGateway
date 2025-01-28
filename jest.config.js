/** @type {import('ts-jest').JestConfigWithTsJest} **/
module.exports = {
  rootDir:"./",
  preset: 'ts-jest',
  testEnvironment: "node",
  transform: {
    "^.+.tsx?$": ["ts-jest",{}],
  },
};