import { Person } from "../People/Person"
import { Purchase } from "./Purchase"

export function getConsumers(purchase: Purchase, people: Person[]): Person[] {
	return purchase.consumerIds
		.map((consumerId) => people.find((person) => person.id === consumerId))
		.filter((person): person is Exclude<typeof person, undefined> => person !== undefined)
}