const mongoose = require('mongoose');

let bankSchema = mongoose.Schema(
	{
		name: {
			type: String,
			require: [true, 'Owner name must be entered'],
		},
		bankName: {
			type: String,
			require: [true, 'Bank name must be entered'],
		},
		accountNumber: {
			type: String,
			require: [true, 'Account number must be entered'],
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model('Bank', bankSchema);
