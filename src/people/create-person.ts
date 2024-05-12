import { Person } from "./person"

let id = 0

export function createPerson(name: string): Person {
  return { id: id++, name: name }
}
