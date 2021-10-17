const path = require("path");

module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "runner.js",
    path: path.resolve(__dirname, "build"),
  },
  target: "node",
};
