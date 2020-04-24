var express = require('express');
var router = express.Router();
var multer = require('multer'); 
var mult = multer();

const { body,validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');

let salaryrangeControllery = require('../controllers/salaryrangeControllery');

router.get('/:industry_id', salaryrangeControllery.fetchSubCategory);

// router.post('/login', mult.array(), userController.fetchUserlogin);

 router.get('/', salaryrangeControllery.fetchSalaryRange);
  router.get('/range/hrange', salaryrangeControllery.fetchSalaryRangeByHSalaryType);
   router.get('/range/rrange', salaryrangeControllery.fetchSalaryRangeByRSalaryType);

 router.get('/salary_range_from_regular/:salary_range_from', salaryrangeControllery.SalaryRangeRegularFrom);
 router.get('/salary_range_from_hourly/:salary_range_from', salaryrangeControllery.SalaryRangeHourlyFrom);

// router.post('/', mult.array(), categoryController.createCategory);

// // router.delete('/:id', categoryController.deleteCategory);

// router.put('/', mult.array(), categoryController.updateCategory);

module.exports = router;