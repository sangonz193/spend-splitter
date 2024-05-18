import { AddPurchaseForm } from "./add-purchase-form"
import { ConsumersMatrix } from "./consumers-matrix"

import { PurchaseItem } from "@/purchase/purchase-item"
import { ReducerAction, ReducerState } from "@/reducer"

type Props = {
  children?: undefined
  state: ReducerState
  dispatch: (action: ReducerAction) => void
}

export function Purchases(props: Props) {
  const { state, dispatch } = props

  return (
    <>
      <div className="mx-auto flex w-full max-w-xl flex-col gap-3 rounded-md border bg-card p-4">
        <h2 className="mb-2 text-xl">Purchases</h2>

        <AddPurchaseForm
          people={state.persons}
          onAddPurchase={(p) => dispatch({ type: "add-purchase", purchase: p })}
        />

        <div className="grid grid-cols-[repeat(auto-fill,minmax(150px,1fr))] gap-4">
          {state.purchases.map((purchase) => (
            <PurchaseItem
              key={purchase.id}
              purchase={purchase}
              dispatch={dispatch}
            />
          ))}
        </div>
      </div>

      <ConsumersMatrix state={state} dispatch={dispatch} className="my-8" />
    </>
  )
}
