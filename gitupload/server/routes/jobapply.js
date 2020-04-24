var express = require('express');
var router = express.Router();
var multer = require('multer'); 
var mult = multer();

const { body,validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');

let jobapplyController = require('../controllers/jobapplyController');

router.get('/jobapplyby/:id', jobapplyController.fetchApplyedJobHistorybyId);

// router.post('/login', mult.array(), userController.fetchUserlogin);

router.get('/', jobapplyController.fetchApplyedJobHistory);
router.get('/expiredjobapply', jobapplyController.fetchExpiredApplyedJobHistory);

router.get('/shortlist', jobapplyController.fetchApplyedJobHistorySelected);

router.post('/',  mult.array(), jobapplyController.fetchApplyedJobHistoryByfilter);

router.post('/jobhistorybyinput',  mult.array(), jobapplyController.fetchApplyedJobHistoryByInput);

router.post('/expiredjobhistorybyinput',  mult.array(), jobapplyController.fetchExpiredApplyedJobHistoryByInput);

router.post('/expiredfilter',  mult.array(), jobapplyController.fetchApplyedJobHistoryForExpiredByfilter);

router.post('/bycompany',  mult.array(), jobapplyController.fetchApplyedJobHistoryByCompany);



// router.post('/', mult.array(), userController.createUser);

// router.delete('/:user_id', userController.deleteUser);

router.put('/', mult.array(), jobapplyController.updateJobApply);

module.exports = router;