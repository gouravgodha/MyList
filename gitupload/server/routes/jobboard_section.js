var express = require('express');
var router = express.Router();
var multer = require('multer'); 
var path = require('path');
var mult = multer();

const { body,validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');

var upload = multer.diskStorage({
    destination: './uploads/jobsection',
    filename: function(req, file, callback) {
        console.log("Req body", req.body);        
        callback(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
})

let jobboardController = require('../controllers/jobboardController');

router.get('/:id', jobboardController.fetchJobBoardSectionById);

// router.post('/login', mult.array(), userController.fetchUserlogin);

router.get('/', jobboardController.fetchJobBoardSection);

router.post('/', multer({storage: upload}).single('image'), jobboardController.CreateJobBoardSection);

// router.post('/bycompany',  mult.array(), jobapplyController.fetchApplyedJobHistoryByCompany);



// router.post('/', mult.array(), userController.createUser);

router.delete('/:id', jobboardController.deleteJobBoardSection);

 router.put('/', mult.array(), jobboardController.UpdateJobBoardSection);

module.exports = router;