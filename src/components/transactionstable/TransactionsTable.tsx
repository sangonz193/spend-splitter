import React from "react"

import { Person } from "../../People/Person"
import { getConvenientPurchaseAmount } from "../../Purchase/getConvenientPurchaseAmount"
import { Purchase } from "../../Purchase/Purchase"

export type Transaction = {
	from: Person
	to: Person
	amount: number
}

export type TransactionsTableProps = {
	persons: Person[]
	purchases: Purchase[]
}

export const TransactionsTable: React.FC<TransactionsTableProps> = (props) => {
	if (!props.persons.length) {
		return null
	}

	const totalToPayByPersonId = props.persons.reduce<Map<number, number>>(
		(res, person) =>
			res.set(
				person.id,
				props.purchases
					.filter((order) => !!order.consumerIds.find((consumerId) => consumerId === person.id))
					.reduce((res, order) => res + getConvenientPurchaseAmount(order) / order.consumerIds.length, 0)
			),
		new Map()
	)

	const totalPaidByPersonId = props.persons.reduce<Map<number, number>>(
		(res, person) =>
			res.set(
				person.id,
				props.purchases
					.filter((order) => order.buyerId === person.id)
					.reduce((res, order) => res + getConvenientPurchaseAmount(order), 0)
			),
		new Map()
	)

	const transactions: Transaction[] = []
	props.persons.forEach((person) => {
		props.persons.forEach((personToPay) => {
			const availableToPay =
				(totalPaidByPersonId.get(personToPay.id) || 0) - (totalToPayByPersonId.get(personToPay.id) || 0)
			const left = totalToPayByPersonId.get(person.id)! - totalPaidByPersonId.get(person.id)!

			if (availableToPay > 0 && left > 0) {
				const amountToPay = Math.max(0, Math.min(left, availableToPay))

				totalPaidByPersonId.set(personToPay.id, totalPaidByPersonId.get(personToPay.id)! - amountToPay)
				totalPaidByPersonId.set(person.id, totalPaidByPersonId.get(person.id)! + amountToPay)

				transactions.push({
					from: person,
					to: personToPay,
					amount: amountToPay,
				})
			}
		})
	})

	return transactions.length ? (
		<>
			<h2 style={{ paddingLeft: 5, paddingRight: 5, marginTop: 30 }}>Result</h2>

			<ul>
				{transactions.map((t, i) => (
					<li key={i} style={{ padding: 5 }}>
						{t.from.name} to {t.to.name}: ${t.amount}
					</li>
				))}
			</ul>

			<div style={{ height: 50 }} />
		</>
	) : null
}
