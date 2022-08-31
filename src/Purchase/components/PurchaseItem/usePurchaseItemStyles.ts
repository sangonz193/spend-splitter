import { makeStyles, mergeClasses, shorthands, tokens } from "@fluentui/react-components"

export type PurchaseItemStyleProps = {
	className: string | undefined
}

const useStyles = makeStyles({
	wrapper: {
		backgroundColor: tokens.colorNeutralBackground2,
		marginTop: "20px",
		...shorthands.padding("14px"),
		...shorthands.borderRadius(tokens.borderRadiusLarge),
	},
	personCheckbox: {
		...shorthands.borderRadius(tokens.borderRadiusCircular),
		paddingTop: "12px",
		paddingBottom: "12px",
		paddingLeft: "8px",
		paddingRight: "8px",
		marginRight: "8px",
	},
})

export function usePurchaseItemStyles(props: PurchaseItemStyleProps) {
	const styles = useStyles()

	return {
		...styles,
		wrapper: mergeClasses(styles.wrapper, props.className),
	}
}
