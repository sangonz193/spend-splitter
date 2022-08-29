import { z } from "zod"

const { APP_NAME, BACKEND_URL, PUBLIC_URL, npm_package_version } = z
	.object({
		APP_NAME: z.string(),
		BACKEND_URL: z.string(),
		PUBLIC_URL: z.string().default(""),
		npm_package_version: z.string(),
	})
	.required()
	.parse(process.env)

export const appConfig = {
	production: process.env.NODE_ENV === "production",
	name: APP_NAME,
	shortCodeName: "ss",
	backendUrl: BACKEND_URL,
	version: npm_package_version,
	storageScope: PUBLIC_URL.replace(/\/$/, "") || "/",
	historyBasename: PUBLIC_URL.startsWith("http") ? new URL(PUBLIC_URL).pathname : PUBLIC_URL.replace(/\/$/, ""),
	baseUrl: location.origin.replace(/\/$/, ""),
}
