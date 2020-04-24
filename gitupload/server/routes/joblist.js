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

let joblistController = require('../controllers/joblistController');

router.get('/job/:id', joblistController.fetchJobById);
router.get('/duplicate/:id', joblistController.CreateDuplicatefetchJobById);

router.get('/', joblistController.FetchJob);

router.get('/draft', joblistController.FetchDraftJob);

router.post('/fetchjob/jobcount', joblistController.FetchApplyJobCount);

router.get('/expire', joblistController.FetchExpiredJob);

// router.post('/', multer({storage: upload}).single('customer_document_filename'), customerController.createCustomer);
router.post('/',  mult.array(), joblistController.createJobList);

router.post('/applyjob',  mult.array(), joblistController.ApplyForJob);


router.post('/search',  mult.array(), joblistController.SearchJob);
router.post('/draftsearch',  mult.array(), joblistController.SearchJobForDraft);
router.post('/expiresearch',  mult.array(), joblistController.SearchJobForExpired);

router.post('/searchforweb',  mult.array(), joblistController.SearchJobForWeb);
router.put('/updatejob', mult.array(), joblistController.UpdateJob);
router.delete('/:id', joblistController.DeleteJob);

router.post('/history',  multer({storage: upload}).single('emp_resume'), joblistController.createEmployeeHistory);
// router.post('/search',  mult.array(), joblistController.SearchEmployeeHistory);
// router.put('/history', multer({storage: upload}).single('emp_resume'), joblistController.updateEmployeeHistory);
//router.put('/customerinfo', mult.array(), customerController.createCustomerinfo);

//router.delete('/:customer_id', customerController.deleteCustomer);

router.put('/emphistory', mult.array(), joblistController.updateemployee);

module.exports = router;