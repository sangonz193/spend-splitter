import {
  makeStyles,
  mergeClasses,
  shorthands,
  tokens,
} from "@fluentui/react-components"

export type AddPurchaseFormStyleProps = {
  className: string | undefined
}

const useStyles = makeStyles({
  wrapper: {
    backgroundColor: tokens.colorNeutralBackground2,
    marginTop: "20px",
    ...shorthands.padding("10px", "15px", "20px"),
    ...shorthands.borderRadius(tokens.borderRadiusXLarge),

    "> div": {
      marginBottom: "10px",
    },
  },
})

export function useAddPurchaseFormStyles(props: AddPurchaseFormStyleProps) {
  const styles = useStyles()

  return {
    ...styles,
    wrapper: mergeClasses(styles.wrapper, props.className),
  }
}
