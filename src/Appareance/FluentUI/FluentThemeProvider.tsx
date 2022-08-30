import { FluentProvider, webDarkTheme } from "@fluentui/react-components"
import React, { CSSProperties } from "react"

const themeProviderStyle: CSSProperties = {
	height: "100%",
	display: "flex",
	flexDirection: "column",
}

export const FluentThemeProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
	return (
		<FluentProvider theme={webDarkTheme} style={themeProviderStyle}>
			{children}
		</FluentProvider>
	)
}
