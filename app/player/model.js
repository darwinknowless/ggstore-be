const mongoose = require('mongoose');

let playerSchema = mongoose.Schema(
	{
		email: {
			type: String,
			require: [true, 'Email must be entered'],
		},
		name: {
			type: String,
			require: [true, 'Name must be entered'],
			maxLength: [225, 'Name must be 3 - 225 characters'],
			minLength: [3, 'Name must be 3 - 225 characters'],
		},
		username: {
			type: String,
			require: [true, 'Username must be entered'],
			maxLength: [32, 'Username must be 8 - 32 characters'],
			minLength: [8, 'Username must be 8 - 32 characters'],
		},
		password: {
			type: String,
			require: [true, 'Password must be entered'],
			maxLength: [32, 'Password must be 8 - 32 characters'],
			minLength: [8, 'Password must be 8 - 32 characters'],
		},
		role: {
			type: String,
			enum: ['admin', 'user'],
			default: 'user',
		},
		status: {
			type: String,
			enum: ['Y', 'N'],
			default: 'Y',
		},
		avatar: {
			type: String,
		},
		fileName: {
			type: String,
		},
		phoneNumber: {
			type: Number,
			require: [true, 'Phone number must be entered'],
			maxLength: [13, 'Phone number must be 9 - 13 digits'],
			minLength: [9, 'Phone number must be 9 - 13 digits'],
		},
		favorite: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Category',
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model('Player', playerSchema);
