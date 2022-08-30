import { Button } from "@fluentui/react-components"
import { DeleteRegular } from "@fluentui/react-icons"
import React, { useMemo } from "react"

import { Person } from "../../../People/Person"
import { getConsumers } from "../../getConsumers"
import { getConvenientPurchaseAmount } from "../../getConvenientPurchaseAmount"
import { Purchase } from "../../Purchase"
import { usePurchaseItemStyles } from "./usePurchaseItemStyles"

export type PurchaseItemProps = {
	children?: undefined
	className?: string
	purchase: Purchase
	persons: Person[]
	onDelete: (purchase: Purchase) => void
	onAddConsumer: (purchase: Purchase, consumer: Person) => void
	onRemoveConsumer: (purchase: Purchase, consumer: Person) => void
}

const PurchaseItemComponent: React.FC<PurchaseItemProps> = (props) => {
	const { className, purchase, persons, onAddConsumer, onRemoveConsumer } = props
	const isAllPersonsSelected = purchase.consumerIds.length === persons.length

	const handleSelectAll = React.useCallback(() => {
		if (isAllPersonsSelected) {
			const consumers = getConsumers(purchase, persons)
			consumers.forEach((c) => onRemoveConsumer(props.purchase, c))
		} else {
			persons.forEach((p) => onAddConsumer(props.purchase, p))
		}
	}, [isAllPersonsSelected, purchase, onAddConsumer, onRemoveConsumer])

	const handleDelete = React.useCallback(() => {
		props.onDelete(props.purchase)
	}, [props.onDelete, props.purchase])

	const buyer = useMemo(() => persons.find((p) => p.id === purchase.buyerId), [persons, purchase.buyerId])

	const styles = usePurchaseItemStyles({
		className,
	})

	return (
		<div className={styles.wrapper}>
			<div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
				<span style={{ flex: 1, marginRight: 10 }}>
					{props.purchase.name} - {buyer?.name} ($
					{getConvenientPurchaseAmount(props.purchase)})
				</span>

				{!!props.persons.length && (
					<Button type="button" onClick={handleSelectAll}>
						{isAllPersonsSelected ? "Clear selection" : "Select all"}
					</Button>
				)}

				<Button style={{ marginLeft: 5 }} type="button" onClick={handleDelete} icon={<DeleteRegular />} />
			</div>

			{props.persons.map((person) => (
				<label key={person.id} style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
					<input
						style={{ marginRight: 5 }}
						type="checkbox"
						checked={!!props.purchase.consumerIds.find((consumerId) => consumerId === person.id)}
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
		</div>
	)
}

export const PurchaseItem = React.memo(PurchaseItemComponent)
