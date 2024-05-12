import { z } from "zod"

declare const APP_VERSION: string

const { VITE_APP_NAME: APP_NAME } = z
  .object({
    VITE_APP_NAME: z.string(),
    APP_VERSION: z.string(),
  })
  .required()
  .parse({
    VITE_APP_NAME: import.meta.env.VITE_APP_NAME,
    APP_VERSION,
  })

export const appConfig = {
  production: import.meta.env.MODE === "production",
  name: APP_NAME,
  shortCodeName: "ss",
  version: APP_VERSION,
  baseUrl: location.origin.replace(/\/$/, ""),
}
