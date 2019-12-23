/* eslint-disable no-console */

import Webpack from "webpack";
import WebpackDevServer from "webpack-dev-server";

import { webpackConfigFactory } from "../config/webpack.config";

const webpackConfig = webpackConfigFactory("development");
const compiler = Webpack(webpackConfig);

const devServerOptions = Object.assign({}, webpackConfig.devServer, {
	stats: {
		colors: true,
	},
});
const server = new WebpackDevServer(compiler, devServerOptions);

const port = 3000;

server.listen(port, "0.0.0.0", () => {
	console.log(`Starting server on http://localhost:${port}`);
});
