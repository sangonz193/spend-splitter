import { Body1, Caption1, Switch } from "@fluentui/react-components"
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableHeaderCell,
  TableRow,
} from "@fluentui/react-components/unstable"
import React from "react"

import { useConsumerMatrixStyles } from "./useConsumerMatrixStyles"
import { ReducerAction, ReducerState } from "../../../App"
import { getConsumers } from "../../getConsumers"

export type ConsumerMatrixProps = {
  children?: undefined
  className?: string
  state: ReducerState
  dispatch: React.Dispatch<ReducerAction>
}

const ConsumerMatrixComponent: React.FC<ConsumerMatrixProps> = (props) => {
  const { className, state, dispatch } = props

  const styles = useConsumerMatrixStyles({
    className,
  })

  return (
    <div className={styles.wrapper}>
      <div style={{ display: "flex", marginLeft: "auto", marginRight: "auto" }}>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHeaderCell>Names</TableHeaderCell>
              {state.purchases.map((purchase) => {
                return (
                  <TableHeaderCell
                    key={purchase.id}
                    className={styles.something}
                  >
                    <Body1>{purchase.name}</Body1>
                    <Caption1>${purchase.amount}</Caption1>
                  </TableHeaderCell>
                )
              })}
            </TableRow>
          </TableHeader>
          <TableBody>
            {state.persons.map((person) => (
              <TableRow key={person.id}>
                <TableCell>{person.name}</TableCell>
                {state.purchases.map((purchase) => {
                  return (
                    <TableCell
                      key={purchase.id}
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Switch
                        checked={getConsumers(purchase, state.persons).some(
                          (consumer) => consumer.id === person.id,
                        )}
                        onChange={(e) =>
                          dispatch({
                            type: e.target.checked
                              ? "add-person-to-purchase"
                              : "remove-person-from-purchase",
                            person: person,
                            purchase: purchase,
                          })
                        }
                      />
                    </TableCell>
                  )
                })}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

export const ConsumerMatrix = React.memo(ConsumerMatrixComponent)
