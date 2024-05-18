import { z } from "zod"

declare const APP_VERSION: string
const version = z.string().parse(APP_VERSION)

export { version as APP_VERSION }
