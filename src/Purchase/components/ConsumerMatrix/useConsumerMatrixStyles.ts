import { makeStyles, mergeClasses } from "@fluentui/react-components"

export type ConsumerMatrixStyleProps = {
	className: string | undefined
}

const useStyles = makeStyles({
	wrapper: {
		overflowX: "auto",
		paddingBottom: "20px",
		alignSelf: "stretch",
		paddingLeft: "40px",
		paddingRight: "40px",
		display: "flex",
	},
	something: {
		"> button": {
			justifyContent: "center",
			paddingTop: "10px",
			paddingBottom: "10px",
			display: "flex",
			flexDirection: "column",
			alignItems: "center",

			"> span": {
				textAlign: "center",
			},
		},
	},
})

export function useConsumerMatrixStyles(props: ConsumerMatrixStyleProps) {
	const styles = useStyles()

	return {
		...styles,
		wrapper: mergeClasses(styles.wrapper, props.className),
	}
}
