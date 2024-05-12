import { Purchase } from "./Purchase"
import { Person } from "../people/person"

export function getConsumers(purchase: Purchase, people: Person[]): Person[] {
  return purchase.consumerIds
    .map((consumerId) => people.find((person) => person.id === consumerId))
    .filter(
      (person): person is Exclude<typeof person, undefined> =>
        person !== undefined,
    )
}
