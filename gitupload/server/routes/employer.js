var express = require('express');
var router = express.Router();
var multer = require('multer'); 
var path = require('path');
var mult = multer();

var upload = multer.diskStorage({
    destination: './files/documents',
    filename: function(req, file, callback) {
        console.log("file upload Req body", req.body);        
        callback(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
})

const { body,validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');

let employerController = require('../controllers/employerController');

router.get('/:emp_id', employerController.fetchEmployeeById);

router.get('/', employerController.fetchEmployee);

// router.post('/', multer({storage: upload}).single('customer_document_filename'), customerController.createCustomer);
router.post('/',  mult.array(), employerController.createEmployer);
router.post('/history',  multer({storage: upload}).single('emp_resume'), employerController.createEmployeeHistory);
router.post('/search',  mult.array(), employerController.SearchEmployeeHistory);
router.put('/history', multer({storage: upload}).single('emp_resume'), employerController.updateEmployeeHistory);
//router.put('/customerinfo', mult.array(), customerController.createCustomerinfo);

//router.delete('/:customer_id', customerController.deleteCustomer);
router.post('/login', mult.array(), employerController.fetchUserlogin);

router.post('/emphistory', multer({storage: upload}).single('emp_resume'), employerController.updateemployee);

module.exports = router;