const mongoose = require('mongoose');

const accountSchema = mongoose.Schema({
    name: { type: String, required: true },
    type: { type: String, enum: ['Bank', 'Mobile Money', 'Cash'], required: true },
    balance: { type: Number, default: 0 },
}, { timestamps: true });

module.exports = mongoose.model('Account', accountSchema);
