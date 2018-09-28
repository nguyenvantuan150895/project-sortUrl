// ADMIN  ROUTE
const adminController = require('../controllers/admin.controller');
const express = require('express');
const router = express.Router();



// a simple test url to check that all of our files are communicating correctly.
router.get('/login',adminController.login_get);
router.post('/login', adminController.login_post);
router.get('/register', adminController.register_get);
router.post('/register', adminController.register_post);
router.get('/logout', adminController.logout);
// router.get('/test',adminController.test )

//export
module.exports = router;