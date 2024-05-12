import { ToggleButton } from "@fluentui/react-components"
import { TableRegular, TextBulletListLtrFilled } from "@fluentui/react-icons"
import React, { useState } from "react"

import { usePurchasesStyles } from "./usePurchasesStyles"
import { ReducerAction, ReducerState } from "../../../App"
import { AddPurchaseForm } from "../AddPurchaseForm"
import { ConsumerMatrix } from "../ConsumerMatrix/ConsumerMatrix"
import { PurchaseItem } from "../PurchaseItem"

export type PurchasesProps = {
  children?: undefined
  className?: string
  state: ReducerState
  dispatch: (action: ReducerAction) => void
}

const PurchasesComponent: React.FC<PurchasesProps> = (props) => {
  const { className, state, dispatch } = props

  const [viewMode, setViewMode] = useState<"list" | "table">("list")

  const styles = usePurchasesStyles({
    className,
  })

  return (
    <>
      <div className={styles.wrapper}>
        <h2 style={{ marginTop: 40, paddingRight: 5 }}>Purchases</h2>

        <AddPurchaseForm persons={state.persons} dispatch={dispatch} />

        <div style={{ height: 20 }} />

        <div style={{ display: "flex" }}>
          <ToggleButton
            checked={viewMode === "list"}
            appearance={viewMode === "list" ? "primary" : undefined}
            icon={<TextBulletListLtrFilled />}
            onClick={() => setViewMode("list")}
            style={{ marginLeft: "auto" }}
          />

          <ToggleButton
            checked={viewMode === "table"}
            appearance={viewMode === "table" ? "primary" : undefined}
            icon={<TableRegular />}
            onClick={() => setViewMode("table")}
          />
        </div>

        {viewMode === "list" &&
          state.purchases
            .slice()
            .reverse()
            .map((o) => (
              <PurchaseItem
                key={o.id}
                purchase={o}
                persons={state.persons}
                onDelete={(purchase) =>
                  dispatch({ type: "remove-purchase", purchase })
                }
                onAddConsumer={(purchase, person) =>
                  dispatch({ type: "add-person-to-purchase", person, purchase })
                }
                onRemoveConsumer={(purchase, person) =>
                  dispatch({
                    type: "remove-person-from-purchase",
                    person,
                    purchase,
                  })
                }
              />
            ))}
      </div>

      {viewMode === "table" && (
        <ConsumerMatrix state={state} dispatch={dispatch} />
      )}
    </>
  )
}

export const Purchases = React.memo(PurchasesComponent)
