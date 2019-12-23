import React from "react";
import "./App.css";
import { Person, PersonItem } from "./components/personitem/PersonItem";
import { OrderItem } from "./components/orderitem/OrderItem";
import { TransactionsTable } from "./components/transactionstable/TransactionsTable";

type Order = {
	id: number;
	buyer: Person;
	amount: number;
	name: string;
	consumers: Person[];
};

type ReducerState = {
	persons: Person[];
	orders: Order[];
};

type ReducerAction =
	| {
			type: "add-person";
			person: Person;
	  }
	| {
			type: "remove-person";
			person: Person;
	  }
	| {
			type: "add-order";
			order: Order;
	  }
	| {
			type: "remove-order";
			order: Order;
	  }
	| {
			type: "add-person-to-order";
			person: Person;
			order: Order;
	  }
	| {
			type: "remove-person-from-order";
			person: Person;
			order: Order;
	  };

const reducer: React.Reducer<ReducerState, ReducerAction> = (prevState, action) => {
	const newState = { ...prevState };

	if (action.type === "add-person") {
		newState.persons = [...prevState.persons, action.person];
	} else if (action.type === "remove-person") {
		newState.persons = prevState.persons.filter(p => p.id !== action.person.id);

		newState.orders.forEach(o => {
			o.consumers = o.consumers.filter(c => c.id !== action.person.id);
		});
	} else if (action.type === "add-order") {
		newState.orders = [...prevState.orders, action.order];
	} else if (action.type === "remove-order") {
		newState.orders = prevState.orders.filter(o => o.id !== action.order.id);
	} else if (action.type === "add-person-to-order") {
		if (!action.order.consumers.find(c => c.id === action.person.id)) action.order.consumers.push(action.person);
	} else if (action.type === "remove-person-from-order") {
		action.order.consumers = action.order.consumers.filter(o => o.id !== action.person.id);
	}

	return newState;
};

const createPerson = (() => {
	let id = 0;

	return (fields: { name: string }): Person => ({ id: id++, name: fields.name });
})();

const createOrder = (() => {
	let id = 0;

	return (fields: { name: string; amount: number; buyer: Person }): Order => ({
		id: id++,
		name: fields.name,
		amount: fields.amount,
		buyer: fields.buyer,
		consumers: [],
	});
})();

export const App = () => {
	const [state, dispatch] = React.useReducer<React.Reducer<ReducerState, ReducerAction>>(reducer, {
		persons: [],
		orders: [],
	});
	const [personValue, setPersonValue] = React.useState("");
	const [orderName, setOrderName] = React.useState("");
	const [orderAmount, setOrderAmount] = React.useState("");
	const [orderBuyer, setOrderBuyer] = React.useState<Person>();

	React.useEffect(() => {
		if (!orderBuyer || !state.persons.find(p => p.id !== orderBuyer.id)) setOrderBuyer(state.persons[0]);
	}, [orderBuyer, state.persons]);

	const handlePersonFormSubmit = React.useCallback(
		(e: React.FormEvent) => {
			e.preventDefault();

			const trimmedPersonValue = personValue.trim();

			if (!trimmedPersonValue.length) {
				alert("Name input cannot be empty");
				return;
			}

			dispatch({ type: "add-person", person: createPerson({ name: trimmedPersonValue }) });
			setPersonValue("");
		},
		[personValue]
	);

	const handleOrderFormSubmit = React.useCallback(
		(e: React.FormEvent) => {
			e.preventDefault();

			const trimmedOrderAmount = orderAmount.trim();
			const parsedAmount = trimmedOrderAmount ? Number(trimmedOrderAmount) : NaN;
			const trimmedOrderName = orderName.trim();
			const orderBuyerPerson = orderBuyer && state.persons.find(p => p.id === orderBuyer.id);

			if (isNaN(parsedAmount)) {
				alert("Invalid order amount");
				return;
			} else if (!trimmedOrderName) {
				alert("Order name cannot be empty");
				return;
			} else if (!orderBuyerPerson) {
				alert("Order buyer cannot be empty");
				return;
			}

			dispatch({
				type: "add-order",
				order: createOrder({ name: trimmedOrderName, buyer: orderBuyerPerson, amount: parsedAmount }),
			});

			setOrderName("");
			setOrderAmount("");
			setOrderBuyer(undefined);
		},
		[orderName, orderAmount, orderBuyer]
	);

	return (
		<>
			<h2 style={{ paddingLeft: 5, paddingRight: 5 }}>Persons</h2>

			{state.persons.map(p => (
				<PersonItem key={p.id} person={p} onDelete={person => dispatch({ type: "remove-person", person })} />
			))}

			<form onSubmit={handlePersonFormSubmit}>
				<label style={{ marginTop: 5, paddingLeft: 5, paddingRight: 5 }}>
					Name
					<input
						style={{ fontSize: 16, padding: 5 }}
						value={personValue}
						onChange={e => setPersonValue(e.target.value)}
					/>
				</label>

				<button
					type="submit"
					style={{
						fontSize: 14,
						padding: 5,
						marginLeft: 5,
						marginRight: 5,
						marginTop: 10,
						borderRadius: 5,
						alignItems: "center",
					}}
				>
					Create
				</button>
			</form>

			<h2 style={{ marginTop: 25, paddingLeft: 5, paddingRight: 5 }}>Orders</h2>

			{state.orders.map(o => (
				<OrderItem
					key={o.id}
					order={o}
					persons={state.persons}
					onDelete={order => dispatch({ type: "remove-order", order })}
					onAddConsumer={(order, person) => dispatch({ type: "add-person-to-order", person, order })}
					onRemoveConsumer={(order, person) => dispatch({ type: "remove-person-from-order", person, order })}
				/>
			))}

			<form onSubmit={handleOrderFormSubmit}>
				<label style={{ marginTop: 5, marginBottom: 5, paddingLeft: 5, paddingRight: 5 }}>
					Name
					<input
						style={{ fontSize: 16, padding: 5 }}
						value={orderName}
						onChange={e => setOrderName(e.target.value)}
					/>
				</label>

				<label style={{ paddingLeft: 5, paddingRight: 5 }}>
					Amount
					<input
						style={{ fontSize: 16, padding: 5 }}
						value={orderAmount}
						onChange={e => setOrderAmount(e.target.value)}
					/>
				</label>

				<label style={{ marginTop: 5, paddingLeft: 5, paddingRight: 5 }}>
					Buyer
					<select
						style={{ fontSize: 16, padding: 5 }}
						value={orderBuyer && orderBuyer.id.toString()}
						disabled={!state.persons.length}
						onChange={e => setOrderBuyer(state.persons.find(p => e.target.value === p.id.toString()))}
					>
						{state.persons.map(person => (
							<option key={person.id} value={person.id}>
								{person.name}
							</option>
						))}
					</select>
				</label>

				<button
					type="submit"
					style={{
						fontSize: 14,
						padding: 5,
						marginLeft: 5,
						marginRight: 5,
						marginTop: 10,
						borderRadius: 5,
						alignItems: "center",
					}}
				>
					Create order
				</button>
			</form>

			<TransactionsTable persons={state.persons} orders={state.orders} />
		</>
	);
};
