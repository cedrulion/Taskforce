import React, { useEffect, useState } from 'react';
import { fetchTransactions } from '../services/api';

const TransactionsList = () => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await fetchTransactions();
      setTransactions(data);
    };
    fetchData();
  }, []);

  return (
    <div className="bg-gray-100 p-4 rounded shadow mt-4">
      <h2 className="text-lg font-bold mb-4">Transaction List</h2>
      <ul>
        {transactions.map((txn) => (
          <li key={txn._id} className="border-b py-2">
            <span>{txn.type}</span>: <span>{txn.amount}</span> 
            (<span>{txn.category.name}</span>)
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TransactionsList;
