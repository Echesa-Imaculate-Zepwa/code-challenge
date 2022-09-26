
import React, { useEffect, useState } from 'react'
import TransactionsList from './TransactionsList'
import Search from './Search'
import AddTransactionForm from './AddTransactionForm'

function AccountContainer() {
  const [searchItem, setSearchItem] = useState('')
  const [transactions, setTransactions] = useState([])


  useEffect(() => {
    fetch('http://localhost:8001/transactions')
      .then((response) => response.json())
      .then((data) => {
        setTransactions(data)
      })
  }, [])

  const searchFilteredItems = (e) => {
    setSearchItem(e.target.value)

  }



  const displaySearchItems = transactions.filter((transaction) =>
    transaction.description.toLowerCase().includes(searchItem.toLowerCase())
  )

  console.log(displaySearchItems)


  return (
    <div>
      <Search search={searchItem} onSearchChange={searchFilteredItems} />
      <AddTransactionForm />
      <TransactionsList transaction={displaySearchItems} />
    </div>
  )
}

export default AccountContainer