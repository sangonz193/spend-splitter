import { spawn } from "child_process"
import { CommandModule } from "yargs"

import { projectPath } from "../../_utils/projectPath"
import { promiseFromChildProcess } from "../../_utils/promiseFromChildProcess"

const command: CommandModule<{}, {}> = {
	command: "dev",

	describe: "Runs the app in development mode.",

	handler: async () => {
		const child = spawn("npx", ["react-scripts", "start"], {
			stdio: "inherit",
			cwd: projectPath,
			env: {
				...process.env,
				SKIP_PREFLIGHT_CHECK: "true",
			},
		})

		await promiseFromChildProcess(child)
	},
}

export default command
