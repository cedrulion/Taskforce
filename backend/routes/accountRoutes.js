const express = require('express');
const { getAccounts, createAccount } = require('../controllers/accountController');
const router = express.Router();

router.route('/').get(getAccounts).post(createAccount);

module.exports = router;
