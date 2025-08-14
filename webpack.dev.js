const path = require("path");
const { merge } = require("webpack-merge");
const common = require("./webpack.common");

module.exports = merge(common, {
    mode: "development",
    devtool: "eval-source-map",
    devServer: {
        static: {
            directory: path.resolve(__dirname, "dist"), // needed for asset/resource to serve from dist
        },
        watchFiles: ["./src/template.html"],
        open: true,
    },
});
