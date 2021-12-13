const Transaction = require('./model');

module.exports = {
	index: async (req, res) => {
		try {
			//===== Start for ===== : Alert
			const alertMessage = req.flash('alertMessage');
			const alertStatus = req.flash('alertStatus');
			const alert = { message: alertMessage, status: alertStatus };
			//===== End for ===== : Alert
			const transaction = await Transaction.find();
			// .populate('player');
			res.render('admin/transaction/view_transaction', {
				transaction,
				alert,
				name: req.session.user.name,
				title: 'Transaction Page',
			});
		} catch (err) {
			req.flash('alertMessage', `${err.message}`);
			req.flash('alertStatus', 'danger');
			res.redirect('/transaction');
		}
	},
};
