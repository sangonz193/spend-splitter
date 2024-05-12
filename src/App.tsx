import "./App.css"

import { Body1 } from "@fluentui/react-components"
import React from "react"

import { appConfig } from "./Config/app.config"
import { Purchase } from "./Purchase/Purchase"
import { Purchases } from "./Purchase/components/Purchases"
import { TransactionsTable } from "./components/transactionstable/TransactionsTable"
import { dummyState } from "./dummyState"
import { People } from "./people/components/people"
import { Person } from "./people/person"

export type ReducerState = {
  persons: Person[]
  purchases: Purchase[]
}

export type ReducerAction =
  | {
      type: "add-person"
      person: Person
    }
  | {
      type: "remove-person"
      person: Person
    }
  | {
      type: "add-purchase"
      purchase: Purchase
    }
  | {
      type: "remove-purchase"
      purchase: Purchase
    }
  | {
      type: "add-person-to-purchase"
      person: Person
      purchase: Purchase
    }
  | {
      type: "remove-person-from-purchase"
      person: Person
      purchase: Purchase
    }

const reducer: React.Reducer<ReducerState, ReducerAction> = (
  prevState,
  action,
) => {
  const newState = { ...prevState }

  if (action.type === "add-person") {
    newState.persons = [...prevState.persons, action.person]
  } else if (action.type === "remove-person") {
    newState.persons = prevState.persons.filter(
      (p) => p.id !== action.person.id,
    )
    newState.purchases = prevState.purchases.filter(
      (p) => p.buyerId !== action.person.id,
    )

    newState.purchases = newState.purchases.filter((o) => {
      if (o.buyerId === action.person.id) {
        return false
      }

      o.consumerIds = o.consumerIds.filter(
        (consumerId) => consumerId !== action.person.id,
      )

      return true
    })
  } else if (action.type === "add-purchase") {
    newState.purchases = [...prevState.purchases, action.purchase]
  } else if (action.type === "remove-purchase") {
    newState.purchases = prevState.purchases.filter(
      (o) => o.id !== action.purchase.id,
    )
  } else if (action.type === "add-person-to-purchase") {
    if (
      !action.purchase.consumerIds.find(
        (consumerId) => consumerId === action.person.id,
      )
    ) {
      action.purchase.consumerIds.push(action.person.id)
    }
  } else if (action.type === "remove-person-from-purchase") {
    action.purchase.consumerIds = action.purchase.consumerIds.filter(
      (consumerId) => consumerId !== action.person.id,
    )
  }

  return newState
}

export const App = () => {
  const [state, dispatch] = React.useReducer<
    React.Reducer<ReducerState, ReducerAction>
  >(reducer, dummyState)

  const handlePersonCreated = React.useCallback((person: Person) => {
    dispatch({ type: "add-person", person: person })
  }, [])

  return (
    <div
      style={{
        overflow: "auto",
        height: "100%",
        paddingTop: 50,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <People
        persons={state.persons}
        onAddPerson={handlePersonCreated}
        onDeletePerson={(person) => dispatch({ type: "remove-person", person })}
      />

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          flexGrow: 1,
          flexShrink: 0,
          flexBasis: "100%",
          alignItems: "center",
        }}
      >
        <Purchases state={state} dispatch={dispatch} />

        <TransactionsTable
          persons={state.persons}
          purchases={state.purchases}
        />

        <div style={{ height: 100 }} />
      </div>

      <footer
        style={{
          height: 100,
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-end",
          padding: "10px 10px",
        }}
      >
        <Body1>v{appConfig.version}</Body1>
      </footer>
    </div>
  )
}
