import "./App.css"

import React from "react"

import { People } from "./people/components/people"
import { Person } from "./people/person"
import { Purchases } from "./purchase/components/purchases"
import { ReducerState, reducer } from "./reducer"
import { TransactionsTable } from "./transactions/transactions-table"
import { APP_VERSION } from "./version"
// import testState from "./test-state.json"

export const App = () => {
  const [state, dispatch] = React.useReducer(
    reducer,
    // testState)
    {
      persons: [],
      purchases: [],
    } satisfies ReducerState,
  )

  const handlePersonCreated = React.useCallback((person: Person) => {
    dispatch({ type: "add-person", person: person })
  }, [])

  return (
    <div className="flex h-full flex-col gap-4 overflow-auto p-4">
      <div className="flex min-h-full shrink-0 grow flex-col items-center gap-4">
        <People
          persons={state.persons}
          onAddPerson={handlePersonCreated}
          onDeletePerson={(person) =>
            dispatch({ type: "remove-person", person })
          }
        />

        <Purchases state={state} dispatch={dispatch} />

        <TransactionsTable
          persons={state.persons}
          purchases={state.purchases}
        />
      </div>

      <footer className="flex p-3">
        <span className="ml-auto text-muted-foreground">v{APP_VERSION}</span>
      </footer>
    </div>
  )
}
