'use client'
import { useState, useEffect } from 'react'
import axios from 'axios';
const baseUrl = "http://localhost:5000/api";


function tableFormatter(transaction, field) {
  return transaction.items_bought.map(item => item[field]).join(', ')
}

export default function Home() {
  const [transactionsList, setTransactions] = useState(null)
  const [fruitsList, setFruits] = useState(null)
  const [isLoading, setLoading] = useState(true)
 
  const fetchData = async () => {
    axios.get(`${baseUrl}/fruits/list`)
      .then((data) => {
        const {data: {fruits}} = data;
        setFruits(fruits)
        setLoading(false)
      })

    axios.get(`${baseUrl}/transaction/list`)
      .then((data) => {
        const {data: {transactions}} = data;
        setTransactions(transactions)
        setLoading(false)
      })

  };

  useEffect(() => {
    fetchData();
  }, [])

  const [price, setPrice] = useState('');
  const handleInputChange = (event) => {
    const newValue = event.target.value;
    
    let totalPrice = 0;
    const items = newValue.split('and ');
    for (let item of items) {
      let [fruit, quantity] = item.split(' ');
      quantity = parseFloat(quantity?.replace(/\D/g, ''));
      const [{ price } = { price: 1 }] = fruitsList.filter(x => x.fruit.toLowerCase() === fruit.toLowerCase());
      totalPrice += quantity * price;
    }
    setPrice(totalPrice || 0);
  };

  const onSubmit = async () => {
    const inputValue = document.getElementById('lineItems').value;
    if (!inputValue) {
      alert("Please enter a line item");
      return;
    }


    let response = await fetch(`${baseUrl}/transaction/buy`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', // Set this to match your request data type
        'Accept': 'application/json', // Set this to specify the response data type you expect
      },
      body: JSON.stringify({'order': inputValue.toLowerCase()})
      
    });        
    await fetchData();
    if (!response.ok) alert("1 or more line items are out of stock. Please check your line items again");
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="relative overflow-x-auto">
        <label htmlFor="price" className="block text-sm font-medium leading-6 text-gray-900">
          Input Line Items
        </label>
        <div className="relative mt-2 rounded-md shadow-sm">
          <input
            type="text"
            name="price"
            id="lineItems"
            className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            placeholder="apple x4 and banana x2"
            onChange={handleInputChange}
          />
        </div>
        <div className="text-5xl my-5 text-center">Total: ${price}</div>
        <div className="text-center">
          <button
            type="submit"
            className="rounded-md bg-indigo-600 my-5 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            onClick={onSubmit}
          >
            Submit
          </button>
        </div>
      </div>

      <div className="relative overflow-x-auto">
        <div className="text-4xl font-bold text-center p-4">Price List</div>
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                      <th scope="col" className="px-6 py-3">#</th>
                      <th scope="col" className="px-6 py-3">Fruits</th>
                      <th scope="col" className="px-6 py-3">Price</th>
                      <th scope="col" className="px-6 py-3">Quantity</th>
                  </tr>
              </thead>
              <tbody>
                {fruitsList && (
                    <>
                      {fruitsList.map((fruit) => (
                        <tr key={fruit.id}>
                          <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{fruit.id}</th>
                          <td className="px-6 py-4">{fruit.fruit}</td>
                          <td className="px-6 py-4">${fruit.price}</td>
                          <td className="px-6 py-4">{fruit.remaining_quantity}</td>
                        </tr>
                      ))}
                    </>
                  )}
              </tbody>
          </table>
      </div>
 
      <div className="relative overflow-x-auto">
        <div className="text-4xl font-bold text-center p-4">Transactions</div>
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                    <th scope="col" className="px-6 py-3">#</th>
                    <th scope="col" className="px-6 py-3">Fruits</th>
                    <th scope="col" className="px-6 py-3">Price</th>
                    <th scope="col" className="px-6 py-3">Quantity</th>
                    <th scope="col" className="px-6 py-3">Total</th>
                </tr>
            </thead>
            <tbody>
              {transactionsList && (
                  <>
                    {transactionsList.map((transaction) => (
                      <tr key={transaction.id}>
                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{transaction.id}</th>
                        <td className="px-6 py-4">{tableFormatter(transaction, 'fruit')}</td>
                        <td className="px-6 py-4">{tableFormatter(transaction, 'price')}</td>
                        <td className="px-6 py-4">{tableFormatter(transaction, 'quantity')}</td>
                        <td className="px-6 py-4">${transaction.total}</td>
                      </tr>
                    ))}
                  </>
                )}
            </tbody>
        </table>
    </div>
    </main>
  )
}
