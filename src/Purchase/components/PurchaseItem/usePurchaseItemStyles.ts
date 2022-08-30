import { makeStyles, mergeClasses, shorthands, tokens } from "@fluentui/react-components"

export type PurchaseItemStyleProps = {
	className: string | undefined
}

const useStyles = makeStyles({
	wrapper: {
		backgroundColor: tokens.colorNeutralBackground2,
		marginTop: "20px",
		...shorthands.padding("14px"),
		...shorthands.borderRadius(tokens.borderRadiusMedium),
	},
})

export function usePurchaseItemStyles(props: PurchaseItemStyleProps) {
	const styles = useStyles()

	return {
		...styles,
		wrapper: mergeClasses(styles.wrapper, props.className),
	}
}
