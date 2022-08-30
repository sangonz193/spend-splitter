import { makeStyles, mergeClasses } from "@fluentui/react-components"

export type PurchasesStyleProps = {
	className: string | undefined
}

const useStyles = makeStyles({
	wrapper: {},
})

export function usePurchasesStyles(props: PurchasesStyleProps) {
	const styles = useStyles()

	return {
		...styles,
		wrapper: mergeClasses(styles.wrapper, props.className),
	}
}
