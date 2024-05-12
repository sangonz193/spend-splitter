import "./App.css"

import { Body1 } from "@fluentui/react-components"
import React from "react"

import { TransactionsTable } from "./components/transactionstable/TransactionsTable"
import { appConfig } from "./Config/app.config"
import { dummyState } from "./dummyState"
import { AddPersonForm } from "./People/components/AddPersonForm/AddPersonForm"
import { Person } from "./People/Person"
import { Purchases } from "./Purchase/components/Purchases"
import { Purchase } from "./Purchase/Purchase"
import { PersonPill } from "./People/components/person-pill"

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
		newState.purchases = prevState.purchases.filter((p) => p.buyerId !== action.person.id)

		newState.purchases = newState.purchases.filter((o) => {
			if (o.buyerId === action.person.id) {
				return false
			}

			o.consumerIds = o.consumerIds.filter((consumerId) => consumerId !== action.person.id)

			return true
		})
	} else if (action.type === "add-purchase") {
		newState.purchases = [...prevState.purchases, action.purchase]
	} else if (action.type === "remove-purchase") {
		newState.purchases = prevState.purchases.filter((o) => o.id !== action.purchase.id)
	} else if (action.type === "add-person-to-purchase") {
		if (!action.purchase.consumerIds.find((consumerId) => consumerId === action.person.id)) {
			action.purchase.consumerIds.push(action.person.id)
		}
	} else if (action.type === "remove-person-from-purchase") {
		action.purchase.consumerIds = action.purchase.consumerIds.filter(
			(consumerId) => consumerId !== action.person.id
		)
	}

	return newState
}

export const App = () => {
	const [state, dispatch] = React.useReducer<React.Reducer<ReducerState, ReducerAction>>(reducer, dummyState)

	const handlePersonCreated = React.useCallback((person: Person) => {
		dispatch({ type: "add-person", person: person })
	}, [])

	const commonWidthStyle = {
		width: "100%",
		maxWidth: "600px",
	}

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
				<h2 style={{ marginTop: 10, marginBottom: 20, ...commonWidthStyle }}>People</h2>

				<div
					style={{
						backgroundColor: "#1f1f1f",
						...commonWidthStyle,
						alignSelf: "stretch",
						padding: "10px 0 0",
						marginLeft: "auto",
						marginRight: "auto",
						borderRadius: 10,
					}}
				>
					<div style={{ paddingLeft: "15px", paddingRight: "15px" }} className="pb-2">
						<AddPersonForm onPersonCreated={handlePersonCreated} />

						<div style={{ height: 15 }} />

						{state.persons.length > 0 && (
							<div
								style={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}
								className="flex flex-row flex-wrap gap-1"
							>
								{state.persons.map((p) => (
									<PersonPill
										key={p.id}
										person={p}
										onDelete={(person) => dispatch({ type: "remove-person", person })}
									/>
								))}
							</div>
						)}
					</div>
				</div>

				<Purchases state={state} dispatch={dispatch} />

				<TransactionsTable persons={state.persons} purchases={state.purchases} />

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
