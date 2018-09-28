// USER ROUTE
const userController = require('../controllers/user.controller')
const express = require('express');
const router = express.Router();



// router for crud user
router.get('/manager/:page',userController.manager);
router.get('/add', userController.add_get);
router.post('/add',userController.add_post);
router.get('/update/:id',userController.update_get);
router.post('/update',userController.update_post);
router.get('/delete/:id', userController.delete);
router.get('/detail/:id', userController.detail);
router.get('/login', userController.login_get);
router.get('/signup',userController.signup_get);
router.post('/signup', userController.signup_post);
//export
module.exports = router;