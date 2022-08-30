import { Button } from "@fluentui/react-components"
import { DeleteRegular } from "@fluentui/react-icons"
import React from "react"

import { Person } from "../../Person"
import { usePersonItemStyles } from "./usePersonItemStyles"

export type PersonItemProps = {
	children?: undefined
	className?: string
	person: Person
	onDelete: (person: Person) => void
}

const PersonItemComponent: React.FC<PersonItemProps> = (props) => {
	const { className } = props

	const handleDelete = React.useCallback(() => {
		props.onDelete(props.person)
	}, [props.onDelete, props.person])

	const styles = usePersonItemStyles({
		className,
	})

	return (
		<li className={styles.wrapper}>
			<span style={{ flex: 1, marginRight: 5 }}>{props.person.name}</span>
			<Button shape="circular" appearance="subtle" icon={<DeleteRegular />} onClick={handleDelete} />
		</li>
	)
}

export const PersonItem = React.memo(PersonItemComponent)
