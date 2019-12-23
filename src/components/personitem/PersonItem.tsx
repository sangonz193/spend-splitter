import React from "react";

export type Person = {
	id: number;
	name: string;
};

export type PersonItemProps = {
	person: Person;
	onDelete: (person: Person) => void;
};

export const PersonItem: React.FC<PersonItemProps> = props => {
	const handleDelete = React.useCallback(() => {
		props.onDelete(props.person);
	}, [props.onDelete, props.person]);

	return (
		<li
			style={{
				flexDirection: "row",
				alignItems: "center",
				padding: 5,
				border: "1px solid lightgray",
				marginLeft: 5,
				marginRight: 5,
			}}
		>
			<span style={{ flex: 1, marginRight: 10 }}>{props.person.name}</span>

			<button style={{ padding: 5, borderRadius: 5 }} type="button" onClick={handleDelete}>
				delete
			</button>
		</li>
	);
};
