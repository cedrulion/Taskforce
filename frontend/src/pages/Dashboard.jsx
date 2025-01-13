import React, { useState } from 'react';
import TransactionForm from '../components/TransactionForm';
import TransactionsList from '../components/TransactionsList';
import BudgetTracker from '../components/BudgetTracker';
import { createAccount } from '../services/api'; // Ensure this import is correct

const Dashboard = () => {
  const [accountName, setAccountName] = useState('');
  const [accountType, setAccountType] = useState('');
  const [accountBalance, setAccountBalance] = useState('');
  const [isCreating, setIsCreating] = useState(false);

  // Handle account creation
  const handleCreateAccount = async (e) => {
    e.preventDefault();
    setIsCreating(true);
    try {
      const newAccount = {
        name: accountName,
        type: accountType,
        balance: parseFloat(accountBalance),
      };

      // Call the API to create the account
      await createAccount(newAccount);

      // Clear form after submission
      setAccountName('');
      setAccountType('');
      setAccountBalance('');
      alert('Account created successfully!');
    } catch (error) {
      console.error('Error creating account:', error);
      alert('Failed to create account.');
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>

      {/* Account Creation Form */}
      <div className="mb-4">
        <h2 className="text-xl font-semibold">Create New Account</h2>
        <form onSubmit={handleCreateAccount}>
          <div className="mb-2">
            <label htmlFor="accountName" className="block">Account Name</label>
            <input
              type="text"
              id="accountName"
              value={accountName}
              onChange={(e) => setAccountName(e.target.value)}
              className="w-full px-4 py-2 border rounded"
              required
            />
          </div>
          <div className="mb-2">
            <label htmlFor="accountType" className="block">Account Type</label>
            <select
              id="accountType"
              value={accountType}
              onChange={(e) => setAccountType(e.target.value)}
              className="w-full px-4 py-2 border rounded"
              required
            >
              <option value="">Select Type</option>
              <option value="Bank">Bank</option>
              <option value="Mobile Money">Mobile Money</option>
              <option value="BCash">Cash</option>
            </select>
          </div>
          <div className="mb-2">
            <label htmlFor="accountBalance" className="block">Balance</label>
            <input
              type="number"
              id="accountBalance"
              value={accountBalance}
              onChange={(e) => setAccountBalance(e.target.value)}
              className="w-full px-4 py-2 border rounded"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded mt-4"
            disabled={isCreating}
          >
            {isCreating ? 'Creating...' : 'Create Account'}
          </button>
        </form>
      </div>

      <TransactionForm onTransactionAdded={() => window.location.reload()} />
      <TransactionsList />
      <BudgetTracker />
    </div>
  );
};

export default Dashboard;
