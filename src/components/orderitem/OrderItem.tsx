import React from "react";
import { Person } from "../personitem/PersonItem";

export type Order = {
	id: number;
	buyer: Person;
	amount: number;
	name: string;
	consumers: Person[];
};

export type OrderItemProps = {
	order: Order;
	persons: Person[];
	onDelete: (order: Order) => void;
	onAddConsumer: (order: Order, consumer: Person) => void;
	onRemoveConsumer: (order: Order, consumer: Person) => void;
};

export const getConvenientOrderAmount = (order: Order) =>
order.consumers.length? Math.round(order.amount / order.consumers.length) * order.consumers.length : order.amount;

export const OrderItem: React.FC<OrderItemProps> = props => {
	const isAllPersonsSelected = props.order.consumers.length === props.persons.length;

	const handleSelectAll = React.useCallback(() => {
		if (isAllPersonsSelected) props.order.consumers.forEach(c => props.onRemoveConsumer(props.order, c));
		else props.persons.forEach(p => props.onAddConsumer(props.order, p));
	}, [isAllPersonsSelected, props.order, props.onAddConsumer, props.onRemoveConsumer]);

	const handleDelete = React.useCallback(() => {
		props.onDelete(props.order);
	}, [props.onDelete, props.order]);

	return (
		<li style={{ padding: 5, border: "1px solid lightgray", marginLeft: 5, marginRight: 5 }}>
			<div style={{ flexDirection: "row", alignItems: "center" }}>
				<span style={{ flex: 1, marginRight: 10 }}>
					{props.order.name} - {props.order.buyer.name} (${getConvenientOrderAmount(props.order)})
				</span>

				{!!props.persons.length && (
					<button style={{ padding: 5, borderRadius: 5 }} type="button" onClick={handleSelectAll}>
						{isAllPersonsSelected ? "clear selection" : "select all"}
					</button>
				)}

				<button style={{ padding: 5, borderRadius: 5 }} type="button" onClick={handleDelete}>
					delete
				</button>
			</div>

			{props.persons.map(person => (
				<label key={person.id} style={{ flexDirection: "row", alignItems: "center" }}>
					<input
						style={{ marginRight: 5 }}
						type="checkbox"
						checked={!!props.order.consumers.find(c => c.id === person.id)}
						onChange={e => {
							if (e.target.checked) props.onAddConsumer(props.order, person);
							else props.onRemoveConsumer(props.order, person);
						}}
					/>

					{person.name}
				</label>
			))}
		</li>
	);
};
