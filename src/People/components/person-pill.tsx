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
		<div className={cn("items-center flex-row flex bg-card p-0.5 pl-3 gap-1 rounded-full border", className)}>
			<span className="grow shrink-0">{props.person.name}</span>

			<Button variant="ghost" size="icon" className="rounded-full size-8" onClick={handleDelete}>
				<XIcon className="size-4" />
			</Button>
		</div>
	)
}
