import { XIcon } from "lucide-react"

import { Person } from "../Person"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/cn"

type Props = {
  className?: string
  person: Person
  onDelete: (person: Person) => void
}

export function PersonPill(props: Props) {
  const { person, className, onDelete } = props

  const handleDelete = () => onDelete(person)

  return (
    <div
      className={cn(
        "flex flex-row items-center gap-1 rounded-full border bg-card p-0.5 pl-3",
        className,
      )}
    >
      <span className="shrink-0 grow">{props.person.name}</span>

      <Button
        variant="ghost"
        size="icon"
        className="size-8 rounded-full"
        onClick={handleDelete}
      >
        <XIcon className="size-4" />
      </Button>
    </div>
  )
}
