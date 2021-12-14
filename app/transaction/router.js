const express = require('express');
const router = express.Router();
const {
	index,
	actionStatus,
	// viewCreate,
	// actionCreate,
	// viewEdit,
	// actionEdit,
	// actionDelete,
} = require('./controller');
// Middleware
const { isLoginAdmin } = require('../middleware/auth');

router.use(isLoginAdmin);
router.get('/', index);
router.put('/status/:id', actionStatus);
// router.get('/create', viewCreate);
// router.post('/create', actionCreate);
// router.get('/edit/:id', viewEdit);
// router.put('/edit/:id', actionEdit);
// router.delete('/delete/:id', actionDelete);

module.exports = router;
