const express = require ('express');
let router = express.Router();

router.use('/',require('./session'));
router.use('/file',require('./upload'));

module.exports = router;
