const express = require('express');
const router = express.Router();

//Defining routes after /api

router.use('/user', require('./user'));
router.use('/service', require('./services'));
router.use('/wallet', require('./wallet'));
// router.use('/request', require('./request'));
// router.use('/assign', require('./assign'));

//User Side 
router.use('/cProfile', require('./customer'));
// router.use('/uProfile', require('./userProfile'))

// router.use('/upload', require('./upload'));
// router.use('/banner', require('./banner'))
module.exports = router;