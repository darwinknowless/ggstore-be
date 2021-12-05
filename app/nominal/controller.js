const Nominal = require('./model');

module.exports = {
	index: async (req, res) => {
		try {
			//===== Start for ===== : Alert
			const alertMessage = req.flash('alertMessage');
			const alertStatus = req.flash('alertStatus');
			const alert = { message: alertMessage, status: alertStatus };
			//===== End for ===== : Alert
			const nominal = await Nominal.find();
			res.render('admin/nominal/view_nominal', {
				nominal,
				alert,
			});
		} catch (err) {
			// Error : with alert flash message
			req.flash('alertMessage', `${err.message}`);
			req.flash('alertStatus', 'danger');
			// Redirect to
			res.redirect('/nominal');
		}
	},

	viewCreate: async (req, res) => {
		try {
			res.render('admin/nominal/create');
		} catch (err) {
			// Error : with alert flash message
			req.flash('alertMessage', `${err.message}`);
			req.flash('alertStatus', 'danger');
			// Redirect to
			res.redirect('/nominal');
		}
	},

	actionCreate: async (req, res) => {
		try {
			const { coinName, coinQuantity, price } = req.body;
			const nominal = new Nominal({ coinName, coinQuantity, price });
			await nominal.save();
			// Success : with alert flash message
			req.flash('alertMessage', 'Success Add Nominal');
			req.flash('alertStatus', 'success');
			// Redirect to
			res.redirect('/nominal');
		} catch (err) {
			// Error : with alert flash message
			req.flash('alertMessage', `${err.message}`);
			req.flash('alertStatus', 'danger');
			// Redirect to
			res.redirect('/nominal');
		}
	},

	viewEdit: async (req, res) => {
		try {
			const { id } = req.params;
			const nominal = await Nominal.findOne({ _id: id });
			res.render('admin/nominal/edit', {
				nominal,
			});
		} catch (err) {
			// Error : with alert flash message
			req.flash('alertMessage', `${err.message}`);
			req.flash('alertStatus', 'danger');
			// Redirect to
			res.redirect('/nominal');
		}
	},

	actionEdit: async (req, res) => {
		try {
			const { id } = req.params;
			const { coinName, coinQuantity, price } = req.body;
			const nominal = await Nominal.findOneAndUpdate(
				{ _id: id },
				{ coinName, coinQuantity, price }
			);
			// Success : with alert flash message
			req.flash('alertMessage', 'Success Edit Nominal');
			req.flash('alertStatus', 'success');
			// Redirect to nominal
			res.redirect('/nominal');
		} catch (err) {
			// Error : with alert flash message
			req.flash('alertMessage', `${err.message}`);
			req.flash('alertStatus', 'danger');
			// Redirect to nominal
			res.redirect('/nominal');
		}
	},

	actionDelete: async (req, res) => {
		try {
			const { id } = req.params;
			const nominal = await Nominal.findOneAndRemove({ _id: id });
			// Success : with alert flash message
			req.flash('alertMessage', 'Success Delete Nominal');
			req.flash('alertStatus', 'success');
			// Redirect to nominal
			res.redirect('/nominal');
		} catch (err) {
			// Error : with alert flash message
			req.flash('alertMessage', `${err.message}`);
			req.flash('alertStatus', 'danger');
			// Redirect to nominal
			res.redirect('/nominal');
		}
	},
};
