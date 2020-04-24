var express = require('express');
var router = express.Router();
var path = require('path');
var multer = require('multer'); 
var mult = multer();

const { body,validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');

var admin_controller = require('../controllers/adminController');

var upload = multer.diskStorage({
    destination: './files/videos',
    filename: function(req, file, callback) {
        console.log("Req body", req.body);        
        callback(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
})

router.get('/', admin_controller.home);

router.get('/readConfig', admin_controller.read_config);

router.get('/testPromise', admin_controller.test_function);

router.post('/signature_upload', mult.array(), admin_controller.signature_upload);

router.get('/fetchUsers', admin_controller.test_user_fetch);

router.get('/createUser', admin_controller.test_user_create);

router.get('/deleteUser', admin_controller.test_user_delete);

router.get('/updateUser', admin_controller.test_user_update);

router.post('/video_upload',multer({storage: upload}).single('video'), admin_controller.video_upload);

module.exports = router