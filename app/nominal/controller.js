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
			res.redirect('/category');
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
			res.redirect('/category');
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

	// viewEdit: async (req, res) => {
	// 	try {
	// 		const { id } = req.params;
	// 		const category = await Category.findOne({ _id: id });
	// 		res.render('admin/category/edit', {
	// 			category,
	// 		});
	// 	} catch (err) {
	// 		// Error : with alert flash message
	// 		req.flash('alertMessage', `${err.message}`);
	// 		req.flash('alertStatus', 'danger');
	// 		// Redirect to category
	// 		res.redirect('/category');
	// 	}
	// },

	// actionEdit: async (req, res) => {
	// 	try {
	// 		const { id } = req.params;
	// 		const { name } = req.body;
	// 		const category = await Category.findOneAndUpdate({ _id: id }, { name });
	// 		// Success : with alert flash message
	// 		req.flash('alertMessage', 'Success Edit Category');
	// 		req.flash('alertStatus', 'success');
	// 		// Redirect to category
	// 		res.redirect('/category');
	// 	} catch (err) {
	// 		// Error : with alert flash message
	// 		req.flash('alertMessage', `${err.message}`);
	// 		req.flash('alertStatus', 'danger');
	// 		// Redirect to category
	// 		res.redirect('/category');
	// 	}
	// },
	// actionDelete: async (req, res) => {
	// 	try {
	// 		const { id } = req.params;
	// 		const category = await Category.findOneAndRemove({ _id: id });
	// 		// Success : with alert flash message
	// 		req.flash('alertMessage', 'Success Delete Category');
	// 		req.flash('alertStatus', 'success');
	// 		// Redirect to category
	// 		res.redirect('/category');
	// 	} catch (err) {
	// 		// Error : with alert flash message
	// 		req.flash('alertMessage', `${err.message}`);
	// 		req.flash('alertStatus', 'danger');
	// 		// Redirect to category
	// 		res.redirect('/category');
	// 	}
	// },
};
