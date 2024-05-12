import { Person } from "../People/Person"

export type Purchase = {
  id: number
  buyerId: Person["id"]
  amount: number
  name: string
  consumerIds: Array<Person["id"]>
}
