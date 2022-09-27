
import React, { useEffect, useState } from "react";
import TransactionsList from "./TransactionsList";
import Search from "./Search";
import AddTransactionForm from "./AddTransactionForm";

function AccountContainer() {
	const [transactions, setTransactions] = useState([]);

	useEffect(() => {
		fetch("http://localhost:8001/transactions")
			.then((res) => res.json())
			.then((data) => setTransactions(data))
			.catch((error) => console.log(error));
	}, []);

	function handleSubmissionUpdate(newSubmission) {

		fetch("http://localhost:8001/transactions", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(newSubmission),
		})
			.then((res) => res.json())
			.then((newData) =>
				setTransactions((transactions) => [...transactions, newData])
			)
			.catch((error) => console.log(error));
	}

	console.log(transactions);

	function handleSearch(search) {
		const filterItem = transactions.filter((data) =>
			data.description.includes(search)
		);

		setTransactions(filterItem);
	}

	return (
		<div>
			<Search searchingFn={handleSearch} />
			<AddTransactionForm submission={handleSubmissionUpdate} />
			<TransactionsList transactions={transactions} />
		</div>
	);
}

export default AccountContainer;