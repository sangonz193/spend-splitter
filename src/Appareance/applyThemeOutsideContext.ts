import { Theme } from "@fluentui/react-components"

import { appConfig } from "../Config/app.config"

export function applyThemeOutsideContext(theme: Theme) {
	document.body.style.backgroundColor = theme.colorNeutralBackground1
	const styleElementId = `@${appConfig.shortCodeName}-custom-styles`
	let customStyleElement = document.getElementById(styleElementId)
	if (!customStyleElement) {
		customStyleElement = document.createElement("style")
		customStyleElement.id = styleElementId
		document.head.appendChild(customStyleElement)
	}
	const scrollbarTrackColor = theme.colorNeutralBackground1
	const scrollbarThumbColor = theme.colorNeutralStroke1
	customStyleElement.innerHTML =
		`*{scrollbar-width:thin;scrollbar-color:${scrollbarThumbColor}${scrollbarTrackColor};-webkit-overflow-scrolling: auto}\n` +
		`*::-webkit-scrollbar{max-width: 10px;max-height: 10px}\n` +
		`*::-webkit-scrollbar-track{background:${scrollbarTrackColor}}\n` +
		`*::-webkit-scrollbar-thumb{background-color:${scrollbarThumbColor};border-radius: 5px;}\n`
}
