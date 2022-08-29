import { FluentProvider, webDarkTheme } from "@fluentui/react-components"
import React from "react"

const themeProviderStyle = {
	height: "100%",
}

export const FluentThemeProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
	return (
		<FluentProvider theme={webDarkTheme} style={themeProviderStyle}>
			{children}
		</FluentProvider>
	)
}
