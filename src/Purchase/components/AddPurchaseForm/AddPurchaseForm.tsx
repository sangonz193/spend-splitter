import { Button } from "@fluentui/react-components"
import { Option } from "@fluentui/react-components/unstable"
import { zodResolver } from "@hookform/resolvers/zod"
import React, { useEffect, useMemo, useState } from "react"
import { FormProvider } from "react-hook-form"

import { ReducerAction } from "../../../App"
import { FormDropdown } from "../../../Form/FormDropdown"
import { FormInput } from "../../../Form/FormInput"
import { Person } from "../../../People/Person"
import { Purchase } from "../../Purchase"
import { addPurchaseFormSchema, AddPurchaseFormValues, useAddPurchaseForm } from "./AddPurchase.form"
import { useAddPurchaseFormStyles } from "./useAddPurchaseFormStyles"

export type AddPurchaseFormProps = {
	children?: undefined
	className?: string
	persons: Person[]
	dispatch: React.Dispatch<ReducerAction>
}

const createPurchase = (() => {
	let id = 0

	return (fields: { name: string; amount: number; buyer: Person }): Purchase => ({
		id: id++,
		name: fields.name,
		amount: fields.amount,
		buyerId: fields.buyer.id,
		consumerIds: [],
	})
})()

const AddPurchaseFormComponent: React.FC<AddPurchaseFormProps> = (props) => {
	const { className, persons, dispatch } = props

	const form = useAddPurchaseForm({
		resolver: zodResolver(addPurchaseFormSchema),
		defaultValues: { name: "" },
	})

	const [selectedBuyerId, setSelectedBuyerId] = useState<string | undefined>(undefined)

	useEffect(() => {
		const { unsubscribe } = form.watch((values) => {
			setSelectedBuyerId(values.buyerId?.toString())
		})

		return unsubscribe
	}, [])

	const selectedBuyer = useMemo(
		() => persons.find((person) => person.id.toString() === selectedBuyerId),
		[selectedBuyerId, persons]
	)

	const handlePurchaseFormSubmit = React.useCallback(
		(values: AddPurchaseFormValues) => {
			const { amount, buyerId, name } = values

			const purchaseBuyerPerson = buyerId && persons.find((p) => p.id.toString() === buyerId)

			if (!purchaseBuyerPerson) {
				alert("Purchase buyer cannot be empty")
				return
			}

			dispatch({
				type: "add-purchase",
				purchase: createPurchase({
					name: name,
					buyer: purchaseBuyerPerson,
					amount: amount,
				}),
			})

			form.reset()
		},
		[persons]
	)

	const styles = useAddPurchaseFormStyles({
		className,
	})
	console.log(form.watch())

	return (
		<FormProvider {...form}>
			<form
				className={styles.wrapper}
				onSubmit={(e) => {
					console.log(form.watch())
					form.handleSubmit(handlePurchaseFormSubmit, (...args) => console.log(args))(e)
				}}
			>
				<FormInput<AddPurchaseFormValues> name="name" label="Name" />

				<FormInput<AddPurchaseFormValues> name="amount" label="Amount" />

				{/* <label style={{ marginTop: 5, paddingLeft: 5, paddingRight: 5 }}>
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
	</label> */}

				<FormDropdown<AddPurchaseFormValues>
					name="buyerId"
					label="Buyer"
					value={selectedBuyer ? selectedBuyer.name : undefined}
					placeholder="Select"
				>
					{persons.map((person) => (
						<Option key={person.id} value={person.id.toString()}>
							{person.name}
						</Option>
					))}
				</FormDropdown>

				<Button
					type="submit"
					appearance="primary"
					style={{
						fontSize: 14,
						padding: 5,
						marginRight: 5,
						borderRadius: 5,
						alignItems: "center",
					}}
				>
					Add
				</Button>
			</form>
		</FormProvider>
	)
}

export const AddPurchaseForm = React.memo(AddPurchaseFormComponent)
