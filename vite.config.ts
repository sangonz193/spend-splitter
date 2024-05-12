import { defineConfig } from "vite"
import react from "@vitejs/plugin-react-swc"

// https://vitejs.dev/config/
export default defineConfig({
	base: "/spend-splitter",
	plugins: [react()],
	define: {
		APP_VERSION: JSON.stringify(process.env.npm_package_version),
	},
})
