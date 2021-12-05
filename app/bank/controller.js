const Bank = require('./model');

module.exports = {
	index: async (req, res) => {
		try {
			//===== Start for ===== : Alert
			const alertMessage = req.flash('alertMessage');
			const alertStatus = req.flash('alertStatus');
			const alert = { message: alertMessage, status: alertStatus };
			//===== End for ===== : Alert
			const bank = await Bank.find();
			res.render('admin/bank/view_bank', {
				bank,
				alert,
			});
		} catch (err) {
			req.flash('alertMessage', `${err.message}`);
			req.flash('alertStatus', 'danger');
			res.redirect('/bank');
		}
	},

	viewCreate: async (req, res) => {
		try {
			res.render('admin/bank/create');
		} catch (err) {
			req.flash('alertMessage', `${err.message}`);
			req.flash('alertStatus', 'danger');
			res.redirect('/bank');
		}
	},

	actionCreate: async (req, res) => {
		try {
			const { name, bankName, accountNumber } = req.body;
			const bank = new Bank({ name, bankName, accountNumber });
			await bank.save();

			req.flash('alertMessage', 'Success Add Bank');
			req.flash('alertStatus', 'success');
			res.redirect('/bank');
		} catch (err) {
			req.flash('alertMessage', `${err.message}`);
			req.flash('alertStatus', 'danger');
			res.redirect('/bank');
		}
	},

	// viewEdit: async (req, res) => {
	// 	try {
	// 		const { id } = req.params;
	// 		const bank = await Bank.findOne({ _id: id });
	// 		res.render('admin/bank/edit', {
	// 			bank,
	// 		});
	// 	} catch (err) {
	// 		// Error : with alert flash message
	// 		req.flash('alertMessage', `${err.message}`);
	// 		req.flash('alertStatus', 'danger');
	// 		// Redirect to
	// 		res.redirect('/bank');
	// 	}
	// },

	// actionEdit: async (req, res) => {
	// 	try {
	// 		const { id } = req.params;
	// 		const { coinName, coinQuantity, price } = req.body;
	// 		const bank = await Bank.findOneAndUpdate(
	// 			{ _id: id },
	// 			{ coinName, coinQuantity, price }
	// 		);
	// 		// Success : with alert flash message
	// 		req.flash('alertMessage', 'Success Edit Bank');
	// 		req.flash('alertStatus', 'success');
	// 		// Redirect to bank
	// 		res.redirect('/bank');
	// 	} catch (err) {
	// 		// Error : with alert flash message
	// 		req.flash('alertMessage', `${err.message}`);
	// 		req.flash('alertStatus', 'danger');
	// 		// Redirect to bank
	// 		res.redirect('/bank');
	// 	}
	// },

	// actionDelete: async (req, res) => {
	// 	try {
	// 		const { id } = req.params;
	// 		const bank = await Bank.findOneAndRemove({ _id: id });
	// 		// Success : with alert flash message
	// 		req.flash('alertMessage', 'Success Delete Bank');
	// 		req.flash('alertStatus', 'success');
	// 		// Redirect to bank
	// 		res.redirect('/bank');
	// 	} catch (err) {
	// 		// Error : with alert flash message
	// 		req.flash('alertMessage', `${err.message}`);
	// 		req.flash('alertStatus', 'danger');
	// 		// Redirect to bank
	// 		res.redirect('/bank');
	// 	}
	// },
};
