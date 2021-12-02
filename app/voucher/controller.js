const Voucher = require('./model');
const Category = require('../category/model');
const Nominal = require('../nominal/model');
const path = require('path');
const fs = require('fs');
const config = require('../../config');

module.exports = {
	index: async (req, res) => {
		try {
			//===== Start for ===== : Alert
			const alertMessage = req.flash('alertMessage');
			const alertStatus = req.flash('alertStatus');
			const alert = { message: alertMessage, status: alertStatus };
			//===== End for ===== : Alert
			const voucher = await Voucher.find();
			res.render('admin/voucher/view_voucher', {
				voucher,
				alert,
			});
		} catch (err) {
			req.flash('alertMessage', `${err.message}`);
			req.flash('alertStatus', 'danger');
			res.redirect('/voucher');
		}
	},

	viewCreate: async (req, res) => {
		const category = await Category.find();
		const nominal = await Nominal.find();
		try {
			res.render('admin/voucher/create', {
				category,
				nominal,
			});
		} catch (err) {
			req.flash('alertMessage', `${err.message}`);
			req.flash('alertStatus', 'danger');
			res.redirect('/voucher');
		}
	},

	actionCreate: async (req, res) => {
		try {
			const { name, category, nominal } = req.body;

			if (req.file) {
				let tmp_path = req.file.path;
				let originaExt =
					req.file.originalname.split('.')[
						req.file.originalname.split('.').length - 1
					];
				let filename = req.file.filename + '.' + originaExt;
				let target_path = path.resolve(
					config.rootPath,
					`public/uploads/${filename}`
				);

				const src = fs.createReadStream(tmp_path);
				const dest = fs.createWriteStream(target_path);

				src.pipe(dest);

				src.on('end', async () => {
					try {
						const voucher = new Voucher({
							name,
							category,
							nominal,
							thumbnail: filename,
						});

						await voucher.save();

						req.flash('alertMessage', 'Success Add Voucher');
						req.flash('alertStatus', 'success');

						res.redirect('/voucher');
					} catch (err) {
						req.flash('alertMessage', `${err.message}`);
						req.flash('alertStatus', 'danger');
						res.redirect('/voucher');
					}
				});
			} else {
				const voucher = new Voucher({
					name,
					category,
					nominal,
				});

				await voucher.save();

				req.flash('alertMessage', 'Success Add Voucher');
				req.flash('alertStatus', 'success');

				res.redirect('/voucher');
			}
		} catch (err) {
			req.flash('alertMessage', `${err.message}`);
			req.flash('alertStatus', 'danger');
			res.redirect('/voucher');
		}
	},

	// viewEdit: async (req, res) => {
	// 	try {
	// 		const { id } = req.params;
	// 		const voucher = await Voucher.findOne({ _id: id });
	// 		res.render('admin/voucher/edit', {
	// 			voucher,
	// 		});
	// 	} catch (err) {
	// 		// Error : with alert flash message
	// 		req.flash('alertMessage', `${err.message}`);
	// 		req.flash('alertStatus', 'danger');
	// 		// Redirect to
	// 		res.redirect('/voucher');
	// 	}
	// },

	// actionEdit: async (req, res) => {
	// 	try {
	// 		const { id } = req.params;
	// 		const { coinName, coinQuantity, price } = req.body;
	// 		const voucher = await Voucher.findOneAndUpdate(
	// 			{ _id: id },
	// 			{ coinName, coinQuantity, price }
	// 		);
	// 		// Success : with alert flash message
	// 		req.flash('alertMessage', 'Success Edit Voucher');
	// 		req.flash('alertStatus', 'success');
	// 		// Redirect to voucher
	// 		res.redirect('/voucher');
	// 	} catch (err) {
	// 		// Error : with alert flash message
	// 		req.flash('alertMessage', `${err.message}`);
	// 		req.flash('alertStatus', 'danger');
	// 		// Redirect to voucher
	// 		res.redirect('/voucher');
	// 	}
	// },
	// actionDelete: async (req, res) => {
	// 	try {
	// 		const { id } = req.params;
	// 		const voucher = await Voucher.findOneAndRemove({ _id: id });
	// 		// Success : with alert flash message
	// 		req.flash('alertMessage', 'Success Delete Voucher');
	// 		req.flash('alertStatus', 'success');
	// 		// Redirect to voucher
	// 		res.redirect('/voucher');
	// 	} catch (err) {
	// 		// Error : with alert flash message
	// 		req.flash('alertMessage', `${err.message}`);
	// 		req.flash('alertStatus', 'danger');
	// 		// Redirect to voucher
	// 		res.redirect('/voucher');
	// 	}
	// },
};
