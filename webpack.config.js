const path = require("path");

module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "runner.js",
    path: path.resolve(__dirname, "build"),
  },
  target: "node",
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
    ],
  },
};
