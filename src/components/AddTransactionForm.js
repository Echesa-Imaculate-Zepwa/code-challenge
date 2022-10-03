
import React, { useState } from 'react'


function AddTransactionForm() {
  const [description, setDescription] = useState('')
  const [amount, setAmount] = useState('')
  const [date, setDate] = useState('')
  const [category, setCategory] = useState('')

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value)
  }

  const handleAmountChange = (event) => {
    setAmount(event.target.value)
  }

  const handleDateChange = (event) => {
    setDate(event.target.value)
  }

  const handleCategoryChange = (event) => {
    setCategory(event.target.value)
  }

  const handleChange = (e) => {
    e.preventDefault()
    const newTransaction = {
      date: date,
      description: description,
      category: category,
      amount: amount,
    }
    fetch('http://localhost:8001/transactions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newTransaction),
    })
      .then((resp) => resp.json())
      .then((newQuestion) => console.log(newQuestion))
    // onFormSubmit(newTransaction)
  }

  return (
    <div className='ui segment' onSubmit={handleChange}>
      <form className='ui form'>
        <div className='inline fields'>
          <input
            type='date'
            name='date'
            value={date}
            onChange={handleDateChange}
            required
          />
          <input
            type='text'
            name='description'
            placeholder='Description'
            value={description}
            onChange={handleDescriptionChange}
            required
          />
          <input
            type='text'
            name='category'
            placeholder='Category'
            value={category}
            onChange={handleCategoryChange}
            required
          />
          <input
            type='number'
            name='amount'
            placeholder='Amount'
            step='0.01'
            onChange={handleAmountChange}
            required
          />
        </div>
        <button className='ui button' type='submit'>
          Add Transaction
        </button>
      </form>
    </div>
  )
}

export default AddTransactionForm

