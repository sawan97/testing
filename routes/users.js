const express = require('express');
const router = express.Router();

const usersController = require('../cotrollers/users_controller');
router.get('/',usersController.home);
router.get('/profile',usersController.profile);
router.get('/sign-in',usersController.signIn);
router.get('/sign-up',usersController.signUp);
router.post('/create',usersController.create);

module.exports = router;