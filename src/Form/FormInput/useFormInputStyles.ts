import { makeStyles, mergeClasses, tokens } from "@fluentui/react-components"

export type FormInputStyleProps = {
  className: string | undefined
}

const useStyles = makeStyles({
  wrapper: {
    display: "flex",
    flexDirection: "column",
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
    wrapper: mergeClasses(styles.wrapper, props.className),
  }
}
