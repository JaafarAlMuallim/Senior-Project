const { getDefaultConfig } = require("expo/metro-config");

const config = getDefaultConfig(__dirname);

config.resolver.assetExts = [
  ...config.resolver.assetExts,
  "ttf",
  "png",
  "jpg",
  "jpeg",
  "webp",
];

module.exports = config;
