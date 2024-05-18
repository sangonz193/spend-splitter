import { ArrowRightIcon } from "lucide-react"
import React from "react"

import { Person } from "@/people/person"
import { getConvenientPurchaseAmount } from "@/purchase/getConvenientPurchaseAmount"
import { Purchase } from "@/purchase/purchase"

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
          .filter(
            (order) =>
              !!order.consumerIds.find(
                (consumerId) => consumerId === person.id,
              ),
          )
          .reduce(
            (res, order) =>
              res +
              getConvenientPurchaseAmount(order) / order.consumerIds.length,
            0,
          ),
      ),
    new Map(),
  )

  const totalPaidByPersonId = props.persons.reduce<Map<number, number>>(
    (res, person) =>
      res.set(
        person.id,
        props.purchases
          .filter((order) => order.buyerId === person.id)
          .reduce((res, order) => res + getConvenientPurchaseAmount(order), 0),
      ),
    new Map(),
  )

  const transactions: Transaction[] = []
  props.persons.forEach((person) => {
    props.persons.forEach((personToPay) => {
      const availableToPay =
        (totalPaidByPersonId.get(personToPay.id) || 0) -
        (totalToPayByPersonId.get(personToPay.id) || 0)
      const left =
        totalToPayByPersonId.get(person.id)! -
        totalPaidByPersonId.get(person.id)!

      if (availableToPay > 0 && left > 0) {
        const amountToPay = Math.max(0, Math.min(left, availableToPay))

        totalPaidByPersonId.set(
          personToPay.id,
          totalPaidByPersonId.get(personToPay.id)! - amountToPay,
        )
        totalPaidByPersonId.set(
          person.id,
          totalPaidByPersonId.get(person.id)! + amountToPay,
        )

        transactions.push({
          from: person,
          to: personToPay,
          amount: amountToPay,
        })
      }
    })
  })

  if (!transactions.length) return null

  return (
    <div className="mx-auto flex w-full max-w-xl flex-col">
      <h2 className="mb-3 text-xl">Result</h2>

      <ul
        style={{ width: "100%", maxWidth: "600px" }}
        className="flex flex-col gap-2"
      >
        {transactions.map((transaction, i) => (
          <TransactionItem key={i} transaction={transaction} />
        ))}
      </ul>

      <div style={{ height: 50 }} />
    </div>
  )
}

function TransactionItem({ transaction }: { transaction: Transaction }) {
  const { from, to, amount } = transaction

  return (
    <li className="flex items-center gap-3">
      <span>{from.name}</span>
      <ArrowRightIcon className="size-5" />
      <span>${amount}</span>
      <ArrowRightIcon className="size-5" />
      <span>{to.name}</span>
    </li>
  )
}
