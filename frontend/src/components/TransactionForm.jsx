import React, { useState, useEffect } from 'react';
import { fetchCategories, createTransaction, fetchAccounts } from '../services/api';

const TransactionForm = ({ onTransactionAdded }) => {
  const [form, setForm] = useState({ type: 'Income', amount: '', category: '', account: '' });
  const [categories, setCategories] = useState([]);
  const [accounts, setAccounts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await fetchCategories();
      setCategories(data);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchAccountData = async () => {
      const { data } = await fetchAccounts();
      setAccounts(data);
    };
    fetchAccountData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Ensure account and category are selected before submitting
    if (!form.account || !form.category) {
      alert('Please select both account and category.');
      return;
    }

    try {
      await createTransaction(form);
      onTransactionAdded();
      setForm({ type: 'Income', amount: '', category: '', account: '' });
    } catch (error) {
      console.error("Error creating transaction:", error);
      alert('There was an error creating the transaction.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-gray-100 p-4 rounded shadow">
      <h2 className="text-lg font-bold mb-4">Add Transaction</h2>
      <div className="mb-4">
        <label className="block mb-1">Type</label>
        <select
          value={form.type}
          onChange={(e) => setForm({ ...form, type: e.target.value })}
          className="w-full p-2 border rounded"
        >
          <option value="Income">Income</option>
          <option value="Expense">Expense</option>
        </select>
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
        <label className="block mb-1">Category</label>
        <select
          value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value })}
          className="w-full p-2 border rounded"
        >
          <option value="">Select Category</option>
          {categories.map((cat) => (
            <option key={cat._id} value={cat._id}>{cat.name}</option>
          ))}
        </select>
      </div>
      <div className="mb-4">
        <label className="block mb-1">Account</label>
        <select
          value={form.account}
          onChange={(e) => setForm({ ...form, account: e.target.value })}
          className="w-full p-2 border rounded"
          required
        >
          <option value="">Select Account</option>
          {accounts.map((account) => (
            <option key={account._id} value={account._id}>{account.name}</option>
          ))}
        </select>
      </div>
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
        Add Transaction
      </button>
    </form>
  );
};

export default TransactionForm;
