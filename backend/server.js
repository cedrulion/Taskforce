require('dotenv').config();
const cors = require('cors');

const express = require('express');
const connectDB = require('./config/db');
const { MONGO_URI, PORT } = require('./config/config');
const accountRoutes = require('./routes/accountRoutes');
const transactionRoutes = require('./routes/transactionRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const errorMiddleware = require('./middleware/errorMiddleware');


connectDB();

const app = express();


const corsOptions = {
  origin: process.env.NODE_ENV === 'production' ? 'https://walletappfront.pages.dev' : 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true 
};


app.use(cors(corsOptions));

app.use(express.json());


app.use('/api/accounts', accountRoutes);
app.use('/api/transactions', transactionRoutes);
app.use('/api/categories', categoryRoutes);


app.use(errorMiddleware);


const server = app.listen(process.env.PORT || 10000, () => {
  console.log(`Server running on port ${process.env.PORT || 10000}`);
});

server.keepAliveTimeout = 120000;  
server.headersTimeout = 120000;    
