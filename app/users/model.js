const mongoose = require('mongoose');

let userSchema = mongoose.Schema(
	{
		email: {
			type: String,
			require: [true, 'Email must be entered'],
		},
		name: {
			type: String,
			require: [true, 'Name must be entered'],
		},
		password: {
			type: String,
			require: [true, 'Password must be entered'],
		},
		role: {
			type: String,
			enum: ['admin', 'user'],
			default: 'admin',
		},
		status: {
			type: String,
			enum: ['Y', 'N'],
			default: 'Y',
		},
		phoneNumber: {
			type: String,
			require: [true, 'Phone number must be entered'],
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model('User', userSchema);
