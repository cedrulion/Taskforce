import React, { useState, useEffect } from 'react';
import { fetchTransactions, createTransaction, fetchCategories } from '../services/api';
import { format } from 'date-fns';

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState({
    description: '',
    amount: '',
    type: 'Expense', // 'expense' or 'income'
    category: '',
  });

  // Fetch transactions from the API
  useEffect(() => {
    const getTransactions = async () => {
      try {
        // Fetch transactions from the API
        const { data } = await fetchTransactions();
        
        // Get the user ID from localStorage
        const userId = JSON.parse(localStorage.getItem('user'))?.id;  // Assuming the user object has 'id'
        console.log('User ID from localStorage:', userId);

        if (!userId) {
          console.error('User ID not found in localStorage');
          return;
        }

        // Filter transactions based on account ID (ensure txn.account is converted to string)
        const filteredTransactions = data.filter((txn) => txn.account?._id.toString() === userId);

        console.log('Filtered transactions:', filteredTransactions);

        // Update the state with the filtered transactions
        setTransactions(filteredTransactions);
      } catch (error) {
        console.error('Error fetching transactions:', error);
      }
    };

    getTransactions();
  }, []);
  // Fetch categories from the API
  const getCategories = async () => {
    try {
      const response = await fetchCategories();
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  // Handle form submission
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      // Submit the form data to create a transaction
      const response = await createTransaction(form);
// Reload transactions after adding a new one
      setForm({ description: '', amount: '', type: 'expense', category: '' }); // Reset form
    } catch (error) {
      console.error('Error adding transaction:', error);
    }
  };

  // Fetch data when component mounts
  useEffect(() => {

    getCategories();
  }, []);

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-6">Transactions</h2>

      {/* Transaction Form */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h3 className="text-xl font-semibold mb-4">Add Transaction</h3>
        <form onSubmit={handleFormSubmit}>
          <div className="mb-4">
            <label className="block mb-1">Description</label>
            <input
              type="text"
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block mb-1">Amount</label>
            <input
              type="number"
              value={form.amount}
              onChange={(e) => setForm({ ...form, amount: e.target.value })}
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block mb-1">Type</label>
            <select
              value={form.type}
              onChange={(e) => setForm({ ...form, type: e.target.value })}
              className="w-full p-2 border rounded"
            >
              <option value="Expense">Expense</option>
              <option value="Income">Income</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block mb-1">Category</label>
            <select
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
              className="w-full p-2 border rounded"
              required
            >
              <option value="">Select Category</option>
              {categories.map((cat) => (
                <option key={cat._id} value={cat._id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded w-full"
          >
            Add Transaction
          </button>
        </form>
      </div>

      {/* Transaction List */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold mb-4">Transaction List</h3>
        <table className="w-full table-auto">
          <thead>
            <tr className="border-b">
              <th className="p-2">Date</th>
              <th className="p-2">Description</th>
              <th className="p-2">Amount</th>
              <th className="p-2">Type</th>
              <th className="p-2">Category</th>
            </tr>
          </thead>
          <tbody>
            {transactions.length > 0 ? (
              transactions.map((transaction) => (
                <tr key={transaction._id} className="border-b">
                  <td className="p-2">{format(new Date(transaction.date), 'MM/dd/yyyy')}</td>
                  <td className="p-2">{transaction.description}</td>
                  <td className="p-2">${transaction.amount}</td>
                  <td className="p-2">{transaction.type}</td>
                  <td className="p-2">{transaction.category ? transaction.category.name : 'N/A'}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="p-2 text-center">No transactions available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Transactions;
