declare module "create-file-webpack" {
	import { Plugin } from "webpack";

	declare class CreateFileWebpack extends Plugin {
		public constructor(options: CreateFileWebpackOptions);
	}

	declare namespace CreateFileWebpack {
		type CreateFileWebpackOptions = {
			path: string;
			fileName: string;
			content: string;
		};
	}

	export = CreateFileWebpack;
}
