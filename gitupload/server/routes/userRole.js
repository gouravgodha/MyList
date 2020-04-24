var express = require('express');
var router = express.Router();
var multer = require('multer'); 
var mult = multer();

const { body,validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');

let userRoleController = require('../controllers/userRoleController');

router.get('/:user_role_id', userRoleController.fetchUserRole);

router.get('/', userRoleController.fetchUserRoles);

router.post('/', mult.array(), userRoleController.createUserRole);

router.delete('/:user_role_id', userRoleController.deleteUserRole);

router.put('/', mult.array(), userRoleController.updateUserRole);

module.exports = router;