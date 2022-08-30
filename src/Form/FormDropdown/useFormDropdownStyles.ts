import { makeStyles, mergeClasses, tokens } from "@fluentui/react-components"

export type FormInputStyleProps = {
	className: string | undefined
	empty: boolean
}

const useStyles = makeStyles({
	wrapper: {
		display: "flex",
		flexDirection: "column",

		"& .fui-Dropdown__button": {
			color: tokens.colorNeutralForeground1,
		},
	},
	wrapperEmpty: {
		"& .fui-Dropdown__button": {
			color: tokens.colorNeutralForeground2,
		},
	},
	label: {
		marginBottom: tokens.spacingVerticalS,
	},
	error: {
		marginTop: tokens.spacingVerticalXS,
		color: tokens.colorPaletteRedForeground1,
	},
})

export function useFormInputStyles(props: FormInputStyleProps) {
	const styles = useStyles()

	return {
		...styles,
		wrapper: mergeClasses(styles.wrapper, props.empty && styles.wrapperEmpty, props.className),
	}
}
