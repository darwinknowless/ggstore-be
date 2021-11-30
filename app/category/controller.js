const Category = require('./model');

module.exports = {
	index: async (req, res) => {
		try {
			//===== Start for ===== : Alert
			const alertMessage = req.flash('alertMessage');
			const alertStatus = req.flash('alertStatus');
			const alert = { message: alertMessage, status: alertStatus };
			//===== End for ===== : Alert
			const category = await Category.find();
			res.render('admin/category/view_category', {
				category,
				alert,
			});
		} catch (err) {
			// Error : with alert flash message
			req.flash('alertMessage', `${err.message}`);
			req.flash('alertStatus', 'danger');
			// Redirect to category
			res.redirect('/category');
		}
	},

	viewCreate: async (req, res) => {
		try {
			res.render('admin/category/create');
		} catch (err) {
			// Error : with alert flash message
			req.flash('alertMessage', `${err.message}`);
			req.flash('alertStatus', 'danger');
			// Redirect to category
			res.redirect('/category');
		}
	},

	actionCreate: async (req, res) => {
		try {
			const { name } = req.body;
			const category = new Category({ name });
			await category.save();
			// Success : with alert flash message
			req.flash('alertMessage', 'Success Add Category');
			req.flash('alertStatus', 'success');
			// Redirect to category
			res.redirect('/category');
		} catch (err) {
			// Error : with alert flash message
			req.flash('alertMessage', `${err.message}`);
			req.flash('alertStatus', 'danger');
			// Redirect to category
			res.redirect('/category');
		}
	},

	viewEdit: async (req, res) => {
		try {
			const { id } = req.params;
			const category = await Category.findOne({ _id: id });
			res.render('admin/category/edit', {
				category,
			});
		} catch (err) {
			// Error : with alert flash message
			req.flash('alertMessage', `${err.message}`);
			req.flash('alertStatus', 'danger');
			// Redirect to category
			res.redirect('/category');
		}
	},

	actionEdit: async (req, res) => {
		try {
			const { id } = req.params;
			const { name } = req.body;
			const category = await Category.findOneAndUpdate({ _id: id }, { name });
			// Success : with alert flash message
			req.flash('alertMessage', 'Success Edit Category');
			req.flash('alertStatus', 'success');
			// Redirect to category
			res.redirect('/category');
		} catch (err) {
			// Error : with alert flash message
			req.flash('alertMessage', `${err.message}`);
			req.flash('alertStatus', 'danger');
			// Redirect to category
			res.redirect('/category');
		}
	},
	actionDelete: async (req, res) => {
		try {
			const { id } = req.params;
			const category = await Category.findOneAndRemove({ _id: id });
			// Success : with alert flash message
			req.flash('alertMessage', 'Success Delete Category');
			req.flash('alertStatus', 'success');
			// Redirect to category
			res.redirect('/category');
		} catch (err) {
			// Error : with alert flash message
			req.flash('alertMessage', `${err.message}`);
			req.flash('alertStatus', 'danger');
			// Redirect to category
			res.redirect('/category');
		}
	},
};
