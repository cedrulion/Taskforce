import React, { useState } from 'react';
import { createAccount } from '../services/api'; 
import { useHistory } from 'react-router-dom';

const CreateAccountPage = () => {

  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [balance, setBalance] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const history = useHistory();


  const handleFormSubmit = async (e) => {
    e.preventDefault();

    setError('');
    setSuccess(false);

    try {
      const accountData = { name, type, balance };

  
      await createAccount(accountData);


      setSuccess(true);
      setName('');
      setType('');
      setBalance('');

      history.push('/accounts');
    } catch (err) {
   
      setError('Error creating account. Please try again.');
      console.error('Error creating account:', err);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-4 bg-white shadow-lg rounded-md mt-8">
      <h2 className="text-2xl font-semibold text-center mb-4">Create New Account</h2>


      {success && <p className="text-green-500 text-center mb-4">Account created successfully!</p>}


      {error && <p className="text-red-500 text-center mb-4">{error}</p>}

      <form onSubmit={handleFormSubmit}>

        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Account Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>


        <div className="mb-4">
          <label htmlFor="type" className="block text-sm font-medium text-gray-700">
            Account Type
          </label>
          <select
            id="type"
            name="type"
            value={type}
            onChange={(e) => setType(e.target.value)}
            required
            className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md"
          >
            <option value="">Select Type</option>
            <option value="Savings">Savings</option>
            <option value="Checking">Checking</option>
          </select>
        </div>


        <div className="mb-4">
          <label htmlFor="balance" className="block text-sm font-medium text-gray-700">
            Balance
          </label>
          <input
            type="number"
            id="balance"
            name="balance"
            value={balance}
            onChange={(e) => setBalance(e.target.value)}
            required
            className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>


        <div className="mb-4">
          <button
            type="submit"
            className="w-full px-4 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600"
          >
            Create Account
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateAccountPage;
