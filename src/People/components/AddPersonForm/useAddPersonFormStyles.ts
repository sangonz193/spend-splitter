import { makeStyles, mergeClasses } from "@fluentui/react-components"

export type AddPersonFormStyleProps = {
  className: string | undefined
}

const useStyles = makeStyles({
  wrapper: {
    display: "flex",
    flexDirection: "row",
  },
  input: {
    flexGrow: 1,
  },
})

export function useAddPersonFormStyles(props: AddPersonFormStyleProps) {
  const styles = useStyles()

  return {
    ...styles,
    wrapper: mergeClasses(styles.wrapper, props.className),
  }
}
