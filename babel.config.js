module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      ["babel-preset-expo", { jsxImportSource: "nativewind" }],
      "nativewind/babel",
    ],
    plugins: [
      [
        "module-resolver",
        {
          extensions: [
            ".js",
            ".jsx",
            ".ts",
            ".tsx",
            ".ios.js",
            ".ios.ts",
            ".ios.tsx",
            ".android.js",
            ".android.ts",
            ".android.tsx",
            ".json",
          ],
          alias: {
            https: "./lib/ignored",
          },
        },
      ],
    ],
  };
};
