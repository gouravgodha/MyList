var express = require('express');
var router = express.Router();
var multer = require('multer'); 
var mult = multer();

const { body,validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');

let categoryController = require('../controllers/catsubcategorControllery');

router.get('/:industry_id', categoryController.fetchSubCategory);
router.get('/subcat/:industry_id', categoryController.fetchSubCatbyid);

// router.post('/login', mult.array(), userController.fetchUserlogin);

 router.get('/', categoryController.fetchCategorytree);

// router.post('/', mult.array(), categoryController.createCategory);

// // router.delete('/:id', categoryController.deleteCategory);

// router.put('/', mult.array(), categoryController.updateCategory);

module.exports = router;