import { CommandModule } from "yargs"

import { generateFiles } from "./generateFiles"

const command: CommandModule<{}, { watch: boolean }> = {
	command: "generate-files",

	describe: "Generates helper files, such as `.d.ts` files for every asset and graphql/typescript related files.",

	builder: (yargs) =>
		yargs.option("watch", {
			alias: "w",
			type: "boolean",
			demandOption: false,
			default: false,
		}),

	handler: async (args) => {
		await generateFiles({ watch: args.watch })
	},
}

export default command
