const express = require ('express');
let router = express.Router();

router.use('/',require('./session'));
router.use('/file',require('./upload'));
router.use('/product',require('./product'));
router.use('/cart',require('./cart'));
router.use('/orders',require('./order'));


module.exports = router;
