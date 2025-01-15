# Project Name

## Overview

This project is a **walletapp** built using **React.js**, **Node.js**, **Express**, and **MongoDB**. The system allows users to track and manage their financial transactions. Users can log income and expense transactions, categorize them, and manage accounts associated with their finances. Categories and subcategories are defined to help organize transactions, with a focus on a seamless user experience.

## Features

- **User Authentication**: Users can log in and interact with their accounts and transactions.
- **Transaction Management**: Users can create, view, and manage income and expense transactions.
- **Category Management**: Categories and subcategories for transactions are available. Users can select categories based on the transaction type (Income or Expense).
- **Account Management**: Users can associate transactions with accounts, and filter transactions based on their accounts.
- **Responsive Design**: The frontend is built to be mobile-friendly, ensuring a smooth experience across devices.
- **CRUD Operations**: Users can create and view transactions based on their account and category, and manage their financial history effectively.

## Functionalities

- **Create Transactions**: Users can add income or expense transactions by selecting the type, amount, category, and associated account.
- **Category and Subcategory Selection**: For expenses, users can choose categories and subcategories to better classify their transactions.
- **Account-Based Filtering**: Transactions are filtered by the user’s selected account and displayed accordingly.
- **Transaction Listing**: Users can view their past transactions and have the option to filter by account and category.

## How to Get Started

### Prerequisites

To run this project locally, make sure you have the following installed:

- **Node.js** (v14 or higher)
- **MongoDB** (either locally or using a MongoDB service like Atlas)
- **npm** (Node Package Manager)

### Setting Up the Backend

1. Clone the repository:
   ```bash
   git clone <repository_url>
   cd <project_name>
Install dependencies:

bash
Copy code
cd backend
npm install
Configure your environment:

Create a .env file and add the following:
env
Copy code
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
Start the backend server:

bash
Copy code
npm start
Setting Up the Frontend
Install frontend dependencies:

bash
Copy code
cd frontend
npm install
Start the frontend development server:

bash
Copy code
npm start
