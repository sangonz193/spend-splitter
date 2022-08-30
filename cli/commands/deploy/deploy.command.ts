import ghpages from "gh-pages"
import { CommandModule } from "yargs"

const command: CommandModule<{}, {}> = {
	command: "deploy",

	describe: "Deploys the app to GitHub Pages.",

	handler: async () => {
		ghpages.publish("build", function (err: any) {
			console.log(err)
		})
	},
}

export default command
