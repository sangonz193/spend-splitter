import { useMemo } from "react"

import { AddPersonForm } from "./add-person-form"
import { PersonPill } from "./person-pill"
import { Person } from "../person"

type Props = {
  persons: Person[]
  onAddPerson: (person: Person) => void
  onDeletePerson: (person: Person) => void
}

export function People({ persons, onAddPerson, onDeletePerson }: Props) {
  const personNames = useMemo(() => persons.map((p) => p.name), [persons])
  return (
    <div className="mx-auto flex w-full max-w-xl flex-col gap-2 rounded-md border bg-card p-4">
      <h2 className="mb-2 text-xl">People</h2>

      <AddPersonForm
        existingNames={personNames}
        onPersonCreated={onAddPerson}
      />

      {persons.length > 0 && (
        <div className="flex flex-row flex-wrap gap-1">
          {persons.map((person) => (
            <PersonPill
              key={person.id}
              person={person}
              onDelete={onDeletePerson}
            />
          ))}
        </div>
      )}
    </div>
  )
}
