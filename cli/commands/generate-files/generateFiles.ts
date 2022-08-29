import { generateAssetsTypes } from "./generateAssetsTypes"
import { generateComponentIndexes } from "./generateComponentIndexes"
import { generatePublicFolder } from "./generatePublicFolder"

export type GenerateFilesParams = {
	watch?: boolean
}

export async function generateFiles(params: GenerateFilesParams = {}) {
	const { watch = false } = params

	await Promise.all([generateAssetsTypes(watch), generateComponentIndexes(watch), generatePublicFolder()])
}
