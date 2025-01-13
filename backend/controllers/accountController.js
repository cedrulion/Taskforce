const Account = require('../models/Account');
const asyncHandler = require('../middleware/asyncHandler');

// Get all accounts
const getAccounts = asyncHandler(async (req, res) => {
    const accounts = await Account.find();
    res.json(accounts);
});

// Create new account
const createAccount = asyncHandler(async (req, res) => {
    const { name, type, balance } = req.body;
    const account = new Account({ name, type, balance });
    await account.save();
    res.status(201).json(account);
});

module.exports = { getAccounts, createAccount };
