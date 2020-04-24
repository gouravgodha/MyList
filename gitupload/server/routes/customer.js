var express = require('express');
var router = express.Router();
var multer = require('multer'); 
var path = require('path');
var mult = multer();

var upload = multer.diskStorage({
    destination: './files/documents',
    filename: function(req, file, callback) {
        console.log("Req body", req.body);        
        callback(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
})

const { body,validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');

let customerController = require('../controllers/customerController');

router.get('/:customer_id', customerController.fetchCustomer);

router.get('/', customerController.fetchCustomers);

// router.post('/', multer({storage: upload}).single('customer_document_filename'), customerController.createCustomer);
router.post('/',  mult.array(), customerController.createCustomer);

router.put('/customerinfo', mult.array(), customerController.createCustomerinfo);

router.delete('/:customer_id', customerController.deleteCustomer);

router.put('/', mult.array(), customerController.updateCustomer);

module.exports = router;