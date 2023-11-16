export default {
  moduleFileExtensions: ["js", "mjs", "jsx", "ts", "tsx"],
  testEnvironment: "node",
  transform: {
    "^.+\\.(js|jsx)$": "babel-jest",
  },
  transformIgnorePatterns: ["node_modules/"],
};
