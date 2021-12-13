const mongoose = require('mongoose');

let transactionSchema = mongoose.Schema(
	{
		//For history topup
		historyVoucherTopup: {
			gameName: {
				type: String,
				require: [true, 'Game name must be entered'],
			},
			category: {
				type: String,
				require: [true, 'Category must be entered'],
			},
			thumbnail: {
				type: String,
			},
			coinName: {
				type: String,
				require: [true, 'Coin name must be entered'],
			},
			coinQuantity: {
				type: String,
				require: [true, 'Coin amount must be entered'],
			},
			price: {
				type: Number,
			},
		},
		// For history payment
		historyPayment: {
			name: {
				type: String,
				require: [true, 'Name must be entered'],
			},
			type: {
				type: String,
				require: [true, 'Type of payment must be entered'],
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
		// Player name
		name: {
			type: String,
			require: [true, 'Name must be entered'],
			maxLength: [225, 'Name must be 3 - 225 characters'],
			minLength: [3, 'Name must be 3 - 225 characters'],
		},

		accountUser: {
			type: String,
			require: [true, 'Account name must be entered'],
			maxLength: [225, 'Name must be 3 - 225 characters'],
			minLength: [3, 'Name must be 3 - 225 characters'],
		},

		tax: { type: Number, default: 0 },

		value: { type: Number, default: 0 },

		status: {
			type: String,
			enum: ['pending', 'success', 'failed'],
			default: 'pending',
		},

		player: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Player',
		},

		historyUser: {
			name: { type: String, require: [true, 'Name player must be entered'] },
			phoneNumber: {
				type: Number,
				require: [true, 'Phone number must be entered'],
				maxLength: [13, 'Phone number must be 9 - 13 digits'],
				minLength: [9, 'Phone number must be 9 - 13 digits'],
			},
		},

		category: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Player',
		},

		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model('Transaction', transactionSchema);
