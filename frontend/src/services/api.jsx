import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000/api' });

// Add token to headers if available
API.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`; // Attach token to headers
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Fetch accounts
export const fetchAccounts = () => API.get('/accounts');

// Create account
export const createAccount = (data) => API.post('/accounts', data);

// Fetch transactions
export const fetchTransactions = () => API.get('/transactions');

// Create transaction
export const createTransaction = (data) => API.post('/transactions', data);

// Fetch categories
export const fetchCategories = () => API.get('/categories');

// Create category
export const createCategory = (data) => API.post('/categories', data);

// Login user and store token, then navigate if provided
export const login = async (email, password) => {
    try {
        const response = await axios.post('http://localhost:5000/api/accounts/login', { email, password });
        console.log('API response:', response); // Log full response
        return response;
    } catch (error) {
        console.error('Login error:', error.response || error.message);
        throw new Error(error.response?.data?.message || 'Invalid email or password');
    }
};

