import { Purchase } from "./purchase"

export const getConvenientPurchaseAmount = (purchase: Purchase) =>
  purchase.consumerIds.length
    ? Math.round(purchase.amount / purchase.consumerIds.length) *
      purchase.consumerIds.length
    : purchase.amount
