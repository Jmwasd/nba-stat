const path = require("path");

module.exports = {
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
  },
  images: {
    loader: "custom",
    loaderFile: "/src/config/imageLoader.ts",
    unoptimized: true,
  },
};
