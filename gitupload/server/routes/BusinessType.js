var express = require('express');
var router = express.Router();
var path = require('path');
var multer = require('multer'); 
var mult = multer();

let folderName = 'public';

var upload = multer({ dest: `public/${folderName}` });

const { body,validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');

var businesstype_controller = require('../controllers/businesstypeController');

/*** we will check later **/
router.use(function(req,res,next){
	if(req.path == '/dashboard' || req.path == '/login'){
		res.redirect('/admin/');
	}
	else
		next();
});
/** end **/

router.get('/', businesstype_controller.home);

router.get('/fetchbusinesstype/:business_type_id', businesstype_controller.fetch_business_type);

router.get('/fetchbusinesstypes', businesstype_controller.fetch_business_types);

router.post('/createbusinesstype', mult.array(), businesstype_controller.create_business_type);

router.delete('/deletebusinesstype/:id', mult.array(),  businesstype_controller.businesstype_record_delete);

router.post('/updatebusinesstype',mult.array(), businesstype_controller.update_business_type);

module.exports = router;