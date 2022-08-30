import React from "react"

import { ReducerAction, ReducerState } from "../../../App"
import { AddPurchaseForm } from "../AddPurchaseForm"
import { PurchaseItem } from "../PurchaseItem"
import { usePurchasesStyles } from "./usePurchasesStyles"

export type PurchasesProps = {
	children?: undefined
	className?: string
	state: ReducerState
	dispatch: (action: ReducerAction) => void
}

const PurchasesComponent: React.FC<PurchasesProps> = (props) => {
	const { className, state, dispatch } = props

	const styles = usePurchasesStyles({
		className,
	})

	return (
		<div className={styles.wrapper}>
			<h2 style={{ marginTop: 40, paddingLeft: 5, paddingRight: 5 }}>Purchases</h2>

			<AddPurchaseForm persons={state.persons} dispatch={dispatch} />

			<div style={{ height: 10 }} />

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
		</div>
	)
}

export const Purchases = React.memo(PurchasesComponent)
