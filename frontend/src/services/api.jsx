import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000/api' });

export const fetchAccounts = () => API.get('/accounts');
export const createAccount = (data) => API.post('/accounts', data);

export const fetchTransactions = () => API.get('/transactions');
export const createTransaction = (data) => API.post('/transactions', data);

export const fetchCategories = () => API.get('/categories');
export const createCategory = (data) => API.post('/categories', data);
