/* eslint-disable @typescript-eslint/no-var-requires */
const { merge } = require("webpack-merge");
const common = require("./webpack/webpack.common");
const envs = {
	development: "dev",
	production: "prod",
};
console.log("process.env.NODE_ENV ", process.env.NODE_ENV);
const env = envs[process.env.NODE_ENV || "development"];

const envConfig = require(`./webpack/webpack.${env}.js`);
module.exports = merge(common, envConfig);
