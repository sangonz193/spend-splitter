import { XIcon } from "lucide-react"

import { Purchase } from "./purchase"

import { Button } from "@/components/ui/button"
import { ReducerAction } from "@/reducer"

type Props = {
  purchase: Purchase
  dispatch: (action: ReducerAction) => void
}

export function PurchaseItem({ purchase, dispatch }: Props) {
  return (
    <div className="flex rounded-md border bg-card p-2">
      <div className="flex grow flex-col">
        <span className="font-bold">{purchase.name}</span>
        <span className="text-muted-foreground">${purchase.amount}</span>
      </div>

      <Button
        variant="ghost"
        size="icon"
        className="size-8"
        onClick={() => dispatch({ type: "remove-purchase", purchase })}
      >
        <XIcon className="size-4" />
      </Button>
    </div>
  )
}
