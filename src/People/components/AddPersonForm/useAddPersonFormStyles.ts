import { makeStyles, mergeClasses } from "@fluentui/react-components"

export type AddPersonFormStyleProps = {
	className: string | undefined
}

const useStyles = makeStyles({
	wrapper: {},
})

export function useAddPersonFormStyles(props: AddPersonFormStyleProps) {
	const styles = useStyles()

	return {
		...styles,
		wrapper: mergeClasses(styles.wrapper, props.className),
	}
}
