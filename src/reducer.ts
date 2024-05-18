import { Person } from "./people/person"
import { Purchase } from "./purchase/purchase"

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

export const reducer: React.Reducer<ReducerState, ReducerAction> = (
  prevState,
  action,
) => {
  const newState = { ...prevState }

  if (action.type === "add-person") {
    newState.persons = [...prevState.persons, action.person]
  } else if (action.type === "remove-person") {
    newState.persons = prevState.persons.filter(
      (p) => p.id !== action.person.id,
    )
    newState.purchases = prevState.purchases.filter(
      (p) => p.buyerId !== action.person.id,
    )

    newState.purchases = newState.purchases.filter((o) => {
      if (o.buyerId === action.person.id) {
        return false
      }

      o.consumerIds = o.consumerIds.filter(
        (consumerId) => consumerId !== action.person.id,
      )

      return true
    })
  } else if (action.type === "add-purchase") {
    newState.purchases = [...prevState.purchases, action.purchase]
  } else if (action.type === "remove-purchase") {
    newState.purchases = prevState.purchases.filter(
      (o) => o.id !== action.purchase.id,
    )
  } else if (action.type === "add-person-to-purchase") {
    if (
      !action.purchase.consumerIds.find(
        (consumerId) => consumerId === action.person.id,
      )
    ) {
      action.purchase.consumerIds.push(action.person.id)
    }
  } else if (action.type === "remove-person-from-purchase") {
    action.purchase.consumerIds = action.purchase.consumerIds.filter(
      (consumerId) => consumerId !== action.person.id,
    )
  }

  return newState
}
