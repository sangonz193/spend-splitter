import React from "react"

import { Person } from "../personitem/PersonItem"

export type Purchase = {
	id: number
	buyer: Person
	amount: number
	name: string
	consumers: Person[]
}

export type PurchaseItemProps = {
	purchase: Purchase
	persons: Person[]
	onDelete: (purchase: Purchase) => void
	onAddConsumer: (purchase: Purchase, consumer: Person) => void
	onRemoveConsumer: (purchase: Purchase, consumer: Person) => void
}

export const getConvenientPurchaseAmount = (purchase: Purchase) =>
	purchase.consumers.length
		? Math.round(purchase.amount / purchase.consumers.length) * purchase.consumers.length
		: purchase.amount

export const PurchaseItem: React.FC<PurchaseItemProps> = (props) => {
	const isAllPersonsSelected = props.purchase.consumers.length === props.persons.length

	const handleSelectAll = React.useCallback(() => {
		if (isAllPersonsSelected) {
			props.purchase.consumers.forEach((c) => props.onRemoveConsumer(props.purchase, c))
		} else {
			props.persons.forEach((p) => props.onAddConsumer(props.purchase, p))
		}
	}, [isAllPersonsSelected, props.purchase, props.onAddConsumer, props.onRemoveConsumer])

	const handleDelete = React.useCallback(() => {
		props.onDelete(props.purchase)
	}, [props.onDelete, props.purchase])

	return (
		<li style={{ padding: 5, border: "1px solid lightgray", marginLeft: 5, marginRight: 5 }}>
			<div style={{ flexDirection: "row", alignItems: "center" }}>
				<span style={{ flex: 1, marginRight: 10 }}>
					{props.purchase.name} - {props.purchase.buyer.name} (${getConvenientPurchaseAmount(props.purchase)})
				</span>

				{!!props.persons.length && (
					<button style={{ padding: 5, borderRadius: 5 }} type="button" onClick={handleSelectAll}>
						{isAllPersonsSelected ? "clear selection" : "select all"}
					</button>
				)}

				<button style={{ padding: 5, borderRadius: 5 }} type="button" onClick={handleDelete}>
					delete
				</button>
			</div>

			{props.persons.map((person) => (
				<label key={person.id} style={{ flexDirection: "row", alignItems: "center" }}>
					<input
						style={{ marginRight: 5 }}
						type="checkbox"
						checked={!!props.purchase.consumers.find((c) => c.id === person.id)}
						onChange={(e) => {
							if (e.target.checked) {
								props.onAddConsumer(props.purchase, person)
							} else {
								props.onRemoveConsumer(props.purchase, person)
							}
						}}
					/>

					{person.name}
				</label>
			))}
		</li>
	)
}
