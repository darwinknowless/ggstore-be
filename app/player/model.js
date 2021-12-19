const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const HASH_ROUNDS = 10;

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
			maxLength: [32, 'Username must be 7 - 32 characters'],
			minLength: [7, 'Username must be 7 - 32 characters'],
		},
		password: {
			type: String,
			require: [true, 'Password must be entered'],
			maxLength: [32, 'Password must be 7 - 32 characters'],
			minLength: [7, 'Password must be 7 - 32 characters'],
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
			type: String,
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

// Validate email already exists/registered
playerSchema.path('email').validate(
	async function (value) {
		try {
			const count = await this.model('Player').countDocuments({ email: value });
			return !count;
		} catch (err) {
			throw err;
		}
	},
	(attr) => `${attr.value} already exists`
);

// Encrypt password before saving
playerSchema.pre('save', function (next) {
	this.password = bcrypt.hashSync(this.password, HASH_ROUNDS);
	next();
});

module.exports = mongoose.model('Player', playerSchema);
