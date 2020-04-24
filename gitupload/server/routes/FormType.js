var express = require('express');
var router = express.Router();
var multer = require('multer'); 
var mult = multer();
var path = require('path');

var upload = multer.diskStorage({
    destination: './files/documents',
    filename: function(req, file, callback) {
        console.log("multer responce body", req.body);
          console.log("multer responce body", file);        
        callback(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
})


const { body,validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');

var formtype_controller = require('../controllers/formtypeController');

router.get('/', formtype_controller.home);

router.get('/fetchformtype/:form_id', formtype_controller.fetch_form_type);

router.get('/fetchformtypes', formtype_controller.fetch_form_types);

router.post('/createformtype', multer({storage: upload}).single('customer_document_filename') , formtype_controller.create_form_type);

router.delete('/deleteformtype/:id', mult.array(),  formtype_controller.formtype_record_delete);

router.post('/updateformtype',mult.array(), formtype_controller.update_form_type);

module.exports = router;