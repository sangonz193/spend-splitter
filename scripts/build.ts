/* eslint-disable no-console */

import webpack from "webpack";

import { webpackConfigFactory } from "../config/webpack.config";

const handler: webpack.Compiler.Handler = (err, stats) => {
	if (err) console.error(err);
	if (stats) console.log(stats.toString({ colors: true }));
};

webpack(webpackConfigFactory("production"), handler);
