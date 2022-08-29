import "./App.css"

import { makeStaticStyles } from "@fluentui/react-components"
import React from "react"

import { Person, PersonItem } from "./components/personitem/PersonItem"
import { Purchase, PurchaseItem } from "./components/purchaseitem/PurchaseItem"
import { TransactionsTable } from "./components/transactionstable/TransactionsTable"
import { AddPersonForm } from "./People/components/AddPersonForm/AddPersonForm"

type ReducerState = {
	persons: Person[]
	purchases: Purchase[]
}

type ReducerAction =
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

const createPurchase = (() => {
	let id = 0

	return (fields: { name: string; amount: number; buyer: Person }): Purchase => ({
		id: id++,
		name: fields.name,
		amount: fields.amount,
		buyer: fields.buyer,
		consumers: [],
	})
})()

const useStaticStyles = makeStaticStyles({
	"body div, body label": {
		// move to external sheet
		// create app external sheet. delete App.css
		display: "flex !important",
		flexDirection: "column",
	},
})

export const App = () => {
	const [state, dispatch] = React.useReducer<React.Reducer<ReducerState, ReducerAction>>(reducer, {
		persons: [],
		purchases: [],
	})
	const [purchaseName, setPurchaseName] = React.useState("")
	const [purchaseAmount, setPurchaseAmount] = React.useState("")
	const [purchaseBuyer, setPurchaseBuyer] = React.useState<Person>()

	useStaticStyles()

	React.useEffect(() => {
		if (!purchaseBuyer || !state.persons.find((p) => p.id !== purchaseBuyer.id)) {
			setPurchaseBuyer(state.persons[0])
		}
	}, [purchaseBuyer, state.persons])

	const handlePersonCreated = React.useCallback((person: Person) => {
		dispatch({ type: "add-person", person: person })
	}, [])

	const handlePurchaseFormSubmit = React.useCallback(
		(e: React.FormEvent) => {
			e.preventDefault()

			const trimmedPurchaseAmount = purchaseAmount.trim()
			const parsedAmount = trimmedPurchaseAmount ? Number(trimmedPurchaseAmount) : NaN
			const trimmedPurchaseName = purchaseName.trim()
			const purchaseBuyerPerson = purchaseBuyer && state.persons.find((p) => p.id === purchaseBuyer.id)

			if (!trimmedPurchaseName) {
				alert("Purchase name cannot be empty")
				return
			} else if (isNaN(parsedAmount)) {
				alert("Invalid purchase amount")
				return
			} else if (!purchaseBuyerPerson) {
				alert("Purchase buyer cannot be empty")
				return
			}

			dispatch({
				type: "add-purchase",
				purchase: createPurchase({
					name: trimmedPurchaseName,
					buyer: purchaseBuyerPerson,
					amount: parsedAmount,
				}),
			})

			setPurchaseName("")
			setPurchaseAmount("")
			setPurchaseBuyer(undefined)
		},
		[purchaseName, purchaseAmount, purchaseBuyer]
	)

	return (
		<div style={{ maxWidth: 600, width: "100%", alignSelf: "center" }}>
			<h2 style={{ marginTop: 10, paddingLeft: 5, paddingRight: 5 }}>People</h2>

			{state.persons.map((p) => (
				<PersonItem key={p.id} person={p} onDelete={(person) => dispatch({ type: "remove-person", person })} />
			))}

			<AddPersonForm onPersonCreated={handlePersonCreated} />

			<h2 style={{ marginTop: 40, paddingLeft: 5, paddingRight: 5 }}>Purchases</h2>

			{state.purchases.map((o) => (
				<PurchaseItem
					key={o.id}
					purchase={o}
					persons={state.persons}
					onDelete={(purchase) => dispatch({ type: "remove-purchase", purchase })}
					onAddConsumer={(purchase, person) => dispatch({ type: "add-person-to-purchase", person, purchase })}
					onRemoveConsumer={(purchase, person) =>
						dispatch({ type: "remove-person-from-purchase", person, purchase })
					}
				/>
			))}

			<form onSubmit={handlePurchaseFormSubmit}>
				<label style={{ marginTop: 5, marginBottom: 5, paddingLeft: 5, paddingRight: 5 }}>
					Name
					<input
						style={{ fontSize: 16, padding: 5 }}
						value={purchaseName}
						onChange={(e) => setPurchaseName(e.target.value)}
					/>
				</label>

				<label style={{ paddingLeft: 5, paddingRight: 5 }}>
					Amount
					<input
						style={{ fontSize: 16, padding: 5 }}
						value={purchaseAmount}
						onChange={(e) => setPurchaseAmount(e.target.value)}
					/>
				</label>

				<label style={{ marginTop: 5, paddingLeft: 5, paddingRight: 5 }}>
					Buyer
					<select
						style={{ fontSize: 16, padding: 5 }}
						value={purchaseBuyer && purchaseBuyer.id.toString()}
						disabled={!state.persons.length}
						onChange={(e) =>
							setPurchaseBuyer(state.persons.find((p) => e.target.value === p.id.toString()))
						}
					>
						{state.persons.map((person) => (
							<option key={person.id} value={person.id}>
								{person.name}
							</option>
						))}
					</select>
				</label>

				<button
					type="submit"
					style={{
						fontSize: 14,
						padding: 5,
						marginLeft: 5,
						marginRight: 5,
						marginTop: 10,
						borderRadius: 5,
						alignItems: "center",
					}}
				>
					Add
				</button>
			</form>

			<TransactionsTable persons={state.persons} purchases={state.purchases} />
		</div>
	)
}
