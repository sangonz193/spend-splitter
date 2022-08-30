import { spawn } from "child_process"
import { CommandModule } from "yargs"

import { projectPath } from "../../_utils/projectPath"
import { promiseFromChildProcess } from "../../_utils/promiseFromChildProcess"

const command: CommandModule<{}, {}> = {
	command: "build",

	describe: "Builds the app.",

	handler: async () => {
		const child = spawn("npx", ["react-scripts", "build"], {
			stdio: "inherit",
			cwd: projectPath,
			env: {
				...process.env,
			},
		})

		await promiseFromChildProcess(child)
	},
}

export default command
