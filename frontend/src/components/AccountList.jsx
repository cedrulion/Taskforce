import React, { useState, useEffect } from 'react';
import { fetchAccounts } from '../services/api'; // Assuming you have an API service to fetch accounts

const AccountList = () => {
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadAccounts = async () => {
      try {
        const response = await fetchAccounts(); // Fetch accounts from the API
        setAccounts(response.data); // Store accounts in state
        setLoading(false); // Set loading to false once data is fetched
      } catch (err) {
        setError('Failed to load accounts'); // Set error if fetching fails
        setLoading(false); // Set loading to false in case of error
      }
    };

    loadAccounts();
  }, []); // Empty dependency array means this will run only once when the component mounts

  if (loading) {
    return <div>Loading...</div>; // Show loading text while fetching accounts
  }

  if (error) {
    return <div>{error}</div>; // Show error message if there is an error
  }

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Account List</h2>
      <table className="min-w-full table-auto border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="px-4 py-2 border-b">Account Name</th>
            <th className="px-4 py-2 border-b">Account Type</th>
            <th className="px-4 py-2 border-b">Balance</th>
          </tr>
        </thead>
        <tbody>
          {accounts.map((account) => (
            <tr key={account._id} className="hover:bg-gray-100">
              <td className="px-4 py-2 border-b">{account.name}</td>
              <td className="px-4 py-2 border-b">{account.type}</td>
              <td className="px-4 py-2 border-b">{account.balance}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AccountList;
