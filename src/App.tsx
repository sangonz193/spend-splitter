import "./App.css"

import React from "react"

import { Purchase } from "./components/purchaseitem/PurchaseItem"
import { TransactionsTable } from "./components/transactionstable/TransactionsTable"
import { AddPersonForm } from "./People/components/AddPersonForm/AddPersonForm"
import { PersonItem } from "./People/components/PersonItem/PersonItem"
import { Person } from "./People/Person"
import { Purchases } from "./Purchase/components/Purchases/Purchases"

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

const reducer: React.Reducer<ReducerState, ReducerAction> = (prevState, action) => {
	const newState = { ...prevState }

	if (action.type === "add-person") {
		newState.persons = [...prevState.persons, action.person]
	} else if (action.type === "remove-person") {
		newState.persons = prevState.persons.filter((p) => p.id !== action.person.id)
		newState.purchases = prevState.purchases.filter((p) => p.buyer.id !== action.person.id)

		newState.purchases = newState.purchases.filter((o) => {
			if (o.buyer.id === action.person.id) {
				return false
			}

			o.consumers = o.consumers.filter((c) => c.id !== action.person.id)

			return true
		})
	} else if (action.type === "add-purchase") {
		newState.purchases = [...prevState.purchases, action.purchase]
	} else if (action.type === "remove-purchase") {
		newState.purchases = prevState.purchases.filter((o) => o.id !== action.purchase.id)
	} else if (action.type === "add-person-to-purchase") {
		if (!action.purchase.consumers.find((c) => c.id === action.person.id)) {
			action.purchase.consumers.push(action.person)
		}
	} else if (action.type === "remove-person-from-purchase") {
		action.purchase.consumers = action.purchase.consumers.filter((o) => o.id !== action.person.id)
	}

	return newState
}

export const App = () => {
	const [state, dispatch] = React.useReducer<React.Reducer<ReducerState, ReducerAction>>(reducer, {
		persons: [],
		purchases: [],
	})

	const handlePersonCreated = React.useCallback((person: Person) => {
		dispatch({ type: "add-person", person: person })
	}, [])

	return (
		<div style={{ overflow: "auto", height: "100%", padding: 100, display: "flex", flexDirection: "column" }}>
			<div style={{ maxWidth: 600, width: "100%", alignSelf: "center" }}>
				<h2 style={{ marginTop: 10, paddingLeft: 5, paddingRight: 5 }}>People</h2>

				<div
					style={{
						backgroundColor: "#1f1f1f",
						padding: "0 15px 20px",
						borderRadius: 10,
						marginTop: 20,
						paddingTop: 10,
					}}
				>
					{state.persons.length > 0 && (
						<div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}>
							{state.persons.map((p) => (
								<PersonItem
									key={p.id}
									person={p}
									onDelete={(person) => dispatch({ type: "remove-person", person })}
								/>
							))}
						</div>
					)}

					<AddPersonForm onPersonCreated={handlePersonCreated} />
				</div>

				<Purchases state={state} dispatch={dispatch} />

				<TransactionsTable persons={state.persons} purchases={state.purchases} />
			</div>
		</div>
	)
}
