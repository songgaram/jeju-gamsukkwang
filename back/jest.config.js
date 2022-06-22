module.exports = {
  moduleFileExtensions: ["js", "json"],
  transform: {
    "^.+\\.(js|jsx)?$": "babel-jest",
  },
  testMatch: ["<rootDir>/**/*.test.(js)"],
  transformIgnorePatterns: ["<rootDir>/node_modules/"],
  preset: "@shelf/jest-mongodb",
};
