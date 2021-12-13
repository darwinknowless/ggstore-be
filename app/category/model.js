const mongoose = require('mongoose');

let categorySchema = mongoose.Schema(
	{
		name: {
			type: String,
			require: [true, 'Category name must be entered'],
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model('Category', categorySchema);
