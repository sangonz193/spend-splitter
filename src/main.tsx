import React from "react"
import ReactDOM from "react-dom/client"
import { App } from "./App.tsx"
import { FluentThemeProvider } from "./Appareance/FluentUI/FluentThemeProvider"
import "./index.css"

ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<FluentThemeProvider>
			<App />
		</FluentThemeProvider>
	</React.StrictMode>
)
