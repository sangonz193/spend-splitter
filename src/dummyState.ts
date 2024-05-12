import { ReducerState } from "./App"
import { createPerson } from "./people/create-person"
import { createPurchase } from "./purchase/create-purchase"

const persons = [
  createPerson("Ana"),
  createPerson("Bob"),
  createPerson("Carlos"),
  createPerson("Santiago"),
]

const getRandomPerson = () =>
  persons[Math.floor(Math.random() * persons.length)]

export const dummyState: ReducerState = {
  persons,
  purchases: [
    createPurchase({
      name: "Papitas",
      amount: 130,
      buyerId: getRandomPerson().id,
    }),
    createPurchase({
      name: "Cerveza",
      amount: 200,
      buyerId: getRandomPerson().id,
    }),
    createPurchase({
      name: "Carne",
      amount: 500,
      buyerId: getRandomPerson().id,
    }),
    createPurchase({
      name: "Papitas",
      amount: 130,
      buyerId: getRandomPerson().id,
    }),
    createPurchase({
      name: "Cerveza",
      amount: 200,
      buyerId: getRandomPerson().id,
    }),
    createPurchase({
      name: "Carne",
      amount: 500,
      buyerId: getRandomPerson().id,
    }),
    createPurchase({
      name: "Papitas",
      amount: 130,
      buyerId: getRandomPerson().id,
    }),
    createPurchase({
      name: "Cerveza",
      amount: 200,
      buyerId: getRandomPerson().id,
    }),
    createPurchase({
      name: "Carne",
      amount: 500,
      buyerId: getRandomPerson().id,
    }),
    createPurchase({
      name: "Carne",
      amount: 500,
      buyerId: getRandomPerson().id,
    }),
    createPurchase({
      name: "Papitas",
      amount: 130,
      buyerId: getRandomPerson().id,
    }),
    createPurchase({
      name: "Cerveza",
      amount: 200,
      buyerId: getRandomPerson().id,
    }),
    createPurchase({
      name: "Carne",
      amount: 500,
      buyerId: getRandomPerson().id,
    }),
  ],
}
