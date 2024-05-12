import { FluentProvider, webDarkTheme } from "@fluentui/react-components"
import React, { CSSProperties } from "react"

import { applyThemeOutsideContext } from "../applyThemeOutsideContext"

const themeProviderStyle: CSSProperties = {
	height: "100%",
	display: "flex",
	flexDirection: "column",
	backgroundColor: "transparent",
}

applyThemeOutsideContext(webDarkTheme)

export const FluentThemeProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
	return (
		<FluentProvider theme={webDarkTheme} style={themeProviderStyle}>
			{children}
		</FluentProvider>
	)
}
