const Payment = require('./model');
const Bank = require('../bank/model');

module.exports = {
	index: async (req, res) => {
		try {
			//===== Start for ===== : Alert
			const alertMessage = req.flash('alertMessage');
			const alertStatus = req.flash('alertStatus');
			const alert = { message: alertMessage, status: alertStatus };
			//===== End for ===== : Alert
			const payment = await Payment.find().populate('banks');
			res.render('admin/payment/view_payment', {
				payment,
				alert,
			});
		} catch (err) {
			req.flash('alertMessage', `${err.message}`);
			req.flash('alertStatus', 'danger');
			res.redirect('/payment');
		}
	},

	viewCreate: async (req, res) => {
		try {
			const banks = await Bank.find();
			res.render('admin/payment/create', { banks });
		} catch (err) {
			req.flash('alertMessage', `${err.message}`);
			req.flash('alertStatus', 'danger');
			res.redirect('/payment');
		}
	},

	actionCreate: async (req, res) => {
		try {
			const { type, status, banks } = req.body;
			const payment = new Payment({ type, status, banks });
			await payment.save();

			req.flash('alertMessage', 'Success Add Payment');
			req.flash('alertStatus', 'success');
			res.redirect('/payment');
		} catch (err) {
			req.flash('alertMessage', `${err.message}`);
			req.flash('alertStatus', 'danger');
			res.redirect('/payment');
		}
	},

	// viewEdit: async (req, res) => {
	// 	try {
	// 		const { id } = req.params;
	// 		const payment = await Payment.findOne({ _id: id });
	// 		res.render('admin/payment/edit', {
	// 			payment,
	// 		});
	// 	} catch (err) {
	// 		// Error : with alert flash message
	// 		req.flash('alertMessage', `${err.message}`);
	// 		req.flash('alertStatus', 'danger');
	// 		// Redirect to
	// 		res.redirect('/payment');
	// 	}
	// },

	// actionEdit: async (req, res) => {
	// 	try {
	// 		const { id } = req.params;
	// 		const { coinName, coinQuantity, price } = req.body;
	// 		const payment = await Payment.findOneAndUpdate(
	// 			{ _id: id },
	// 			{ coinName, coinQuantity, price }
	// 		);
	// 		// Success : with alert flash message
	// 		req.flash('alertMessage', 'Success Edit Payment');
	// 		req.flash('alertStatus', 'success');
	// 		// Redirect to payment
	// 		res.redirect('/payment');
	// 	} catch (err) {
	// 		// Error : with alert flash message
	// 		req.flash('alertMessage', `${err.message}`);
	// 		req.flash('alertStatus', 'danger');
	// 		// Redirect to payment
	// 		res.redirect('/payment');
	// 	}
	// },

	// actionDelete: async (req, res) => {
	// 	try {
	// 		const { id } = req.params;
	// 		const payment = await Payment.findOneAndRemove({ _id: id });
	// 		// Success : with alert flash message
	// 		req.flash('alertMessage', 'Success Delete Payment');
	// 		req.flash('alertStatus', 'success');
	// 		// Redirect to payment
	// 		res.redirect('/payment');
	// 	} catch (err) {
	// 		// Error : with alert flash message
	// 		req.flash('alertMessage', `${err.message}`);
	// 		req.flash('alertStatus', 'danger');
	// 		// Redirect to payment
	// 		res.redirect('/payment');
	// 	}
	// },
};
