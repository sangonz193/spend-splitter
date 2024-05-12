import { Except } from "type-fest"

import { Purchase } from "./purchase"

let id = 0

export function createPurchase(
  fields: Except<Purchase, "id" | "consumerIds">,
): Purchase {
  return {
    ...fields,
    id: id++,
    consumerIds: [],
  }
}
