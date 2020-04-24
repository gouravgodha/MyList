var express = require('express');
var router = express.Router();
var multer = require('multer'); 
var mult = multer();

const { body,validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');

let userController = require('../controllers/userController');

router.get('/:user_id', userController.fetchUser);

router.post('/login', mult.array(), userController.fetchUserlogin);

router.get('/', userController.fetchUsers);

router.post('/', mult.array(), userController.createUser);

router.delete('/:user_id', userController.deleteUser);

router.put('/', mult.array(), userController.updateUser);

module.exports = router;