import react from "@vitejs/plugin-react-swc"
import path from "path"
import { defineConfig } from "vite"

const production = process.env.NODE_ENV === "production"

// https://vitejs.dev/config/
export default defineConfig({
  base: production ? "/spend-splitter" : undefined,
  plugins: [react()],
  define: {
    APP_VERSION: JSON.stringify(process.env.npm_package_version),
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
