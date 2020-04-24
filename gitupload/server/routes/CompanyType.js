var express = require('express');
var router = express.Router();
var path = require('path');
var multer = require('multer'); 
var mult = multer();

let folderName = 'public';

 var storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads')
    },
    filename: (req, file, cb) => {
       
      cb(null, file.originalname)
    }
});
var upload = multer({storage: storage});


const { body,validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');

var company_controller = require('../controllers/companyController');

/*** we will check later **/
router.use(function(req,res,next){
	if(req.path == '/dashboard' || req.path == '/login'){
		res.redirect('/admin/');
	}
	else
		next();
});
/** end **/

router.get('/', company_controller.home);

router.get('/listed', company_controller.fetch_company_listed);

router.get('/listed/:company_id', company_controller.fetch_company_detail_by_id);

router.get('/fetchcompanydetail/:company_id', company_controller.fetch_company_detail);

router.get('/getcompanydetails', company_controller.fetch_company_details);

router.get('/getcompanydetailss', company_controller.fetch_company_detailss);

router.post('/createcompany', multer({storage: storage}).single('company_logo'), company_controller.create_company);

router.delete('/deletecompany/:id', mult.array(),  company_controller.company_record_delete);

// router.post('/updatecompanydetail',function(req,res,next){
//   console.log("Update company called,", req.body);
// });
router.post('/updatecompanydetail',mult.array(), company_controller.update_company_detail);

module.exports = router;