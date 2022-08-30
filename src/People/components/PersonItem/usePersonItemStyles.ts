import { makeStyles, mergeClasses, shorthands, tokens } from "@fluentui/react-components"

export type PersonItemStyleProps = {
	className: string | undefined
}

const useStyles = makeStyles({
	wrapper: {
		flexDirection: "row",
		alignItems: "center",
		...shorthands.padding("5px"),
		...shorthands.border("1px solid lightgray"),
		marginRight: "4px",
		backgroundColor: tokens.colorNeutralBackground1,
		...shorthands.borderRadius(tokens.borderRadiusCircular),
		paddingLeft: "10px",
		marginBottom: "10px",
	},
})

export function usePersonItemStyles(props: PersonItemStyleProps) {
	const styles = useStyles()

	return {
		...styles,
		wrapper: mergeClasses(styles.wrapper, props.className),
	}
}
