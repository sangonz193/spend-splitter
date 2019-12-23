import { Person } from "../personitem/PersonItem";
import { Order, getConvenientOrderAmount } from "../orderitem/OrderItem";
import React from "react";

export type Transaction = {
	from: Person;
	to: Person;
	amount: number;
};

export type TransactionsTableProps = {
	persons: Person[];
	orders: Order[];
};

export const TransactionsTable: React.FC<TransactionsTableProps> = props => {
	if (!props.persons.length) return null;

	const totalToPayByPersonId = props.persons.reduce<Map<number, number>>(
		(res, person) =>
			res.set(
				person.id,
				props.orders
					.filter(order => !!order.consumers.find(p => p.id === person.id))
					.reduce((res, order) => res + getConvenientOrderAmount(order) / order.consumers.length, 0)
			),
		new Map()
	);

	const totalPaidByPersonId = props.persons.reduce<Map<number, number>>(
		(res, person) =>
			res.set(
				person.id,
				props.orders
					.filter(order => order.buyer.id === person.id)
					.reduce((res, order) => res + getConvenientOrderAmount(order), 0)
			),
		new Map()
	);

	const transactions: Transaction[] = [];
	props.persons.forEach(person => {
		props.persons.forEach(personToPay => {
			const availableToPay =
				(totalPaidByPersonId.get(personToPay.id) || 0) - (totalToPayByPersonId.get(personToPay.id) || 0);
			const left = totalToPayByPersonId.get(person.id)! - totalPaidByPersonId.get(person.id)!;

			if (availableToPay > 0 && left > 0) {
				const amountToPay = Math.max(0, Math.min(left, availableToPay));

				totalPaidByPersonId.set(personToPay.id, totalPaidByPersonId.get(personToPay.id)! - amountToPay);
				totalPaidByPersonId.set(person.id, totalPaidByPersonId.get(person.id)! + amountToPay);

				transactions.push({
					from: person,
					to: personToPay,
					amount: amountToPay,
				});
			}
		});
	});

	return transactions.length ? (
		<>
			<h2 style={{ paddingLeft: 5, paddingRight: 5, marginTop: 25 }}>Result</h2>

			<ul>
				{transactions.map((t, i) => (
					<li key={i} style={{ padding: 5 }}>
						{t.from.name} to {t.to.name}: ${t.amount}
					</li>
				))}
			</ul>
		</>
	) : null;
};
