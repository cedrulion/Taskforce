import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../services/api'; // Assuming you have the login function in the services/api.js file

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Hook to navigate after login

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(''); // Reset the error message before starting the login process
  
    try {
      // Call the login function to authenticate the user and get the response
      const response = await login(email, password);
      
      const { token, user } = response.data; // Assuming the response includes token and user data
  
      if (!token || !user) {
        throw new Error('No token or user data received.');
      }
  
      // Store the token and user data in localStorage
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user)); // Save user data to localStorage
  
      console.log('Login successful');
      console.log('Token:', token);
      console.log('User:', user);
  
      // After successful login, redirect to the dashboard
      navigate('/dashboard');
    } catch (err) {
      // Handle error and set an error message to display to the user
      const errorMessage =
        err.response?.data?.message || err.message || 'Login failed, please try again.';
      
      setError(errorMessage); // Display the error message
      console.error('Login error:', err); // Log the error for debugging
    }
  };
  
  

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-semibold mb-6 text-center">Login</h2>

        {/* Login Form */}
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label htmlFor="email" className="block mb-2">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block mb-2">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Enter your password"
              required
            />
          </div>

          {/* Error Message */}
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
