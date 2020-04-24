const fs = require('fs');

var appConfig = require('../config.json');

var nodemailer = require('nodemailer');

var async = require('async');
var path = require('path');
var multer = require('multer');
var mult = multer();
var md5 = require('md5');

var crypto = require('crypto');

var testFn = require('../models/test');

let UsersModel = require('../models/user_sample');

let Users = UsersModel.Users;

var moment = require('moment');
moment().format();

// var upload = multer({ dest: '../public/images' });

var upload = multer.diskStorage({
    destination: function(req, file, callback) {
        callback(null, './uploads')
    },
    filename: function(req, file, callback) {
        callback(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
})

const { body,validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');

exports.home = function (req, res, next) {
    if(process.env.NODE_ENV=="development" || process.env.NODE_ENV=="testing")
        console.log("In dashboard method");
    res.sendFile(path.resolve( __dirname + '/../public/views/index.html'),{env:process.env.NODE_ENV});
};

exports.video_upload = [
    function (req, res, next){
        console.log("Attempting to save video", req.body);
        console.log("Attempting to save video", req.file);
        try{                       
            require("fs").writeFile("files/videos/video_1.webm", req.body.video, function(err) {
                if(err) throw err;
                return res.send({
                    status: 200,
                    message: 'The Video was successfully saved.'
                })
            });

        } catch (exception) {
            console.log("Exception caught", exception);
        }
    }
]

exports.read_config = [
    function (req,res,next) {
        console.log("Attempting to read config");
        fs.readFile('../config.json', (err, data) => {  
            if (err){
                return res.send({
                    status: 400,
                    data: err
                })                
            }

            let appt_app_config = JSON.parse(data);
            console.log("Appointment application config data", appt_app_config);

            var formatted_config = Object.assign({}, appt_app_config);
                        
            // delete formatted_config.port;
            // delete formatted_config.secret;        

            return res.send({
                status: 200,
                data: formatted_config
            })
        });
        console.log('This is after the read call');
    }
]

exports.test_function = [
    async function (req,res,next) {
        console.log("Attempting to read config");
        let data;
        data = await testFn.getData();
        console.log("Get data called, d is", data);
        
        return res.send({
            status: 200,
            data: data,
            message: "Method called successfully."
        })        
    }
]

exports.test_user_fetch = [
     function (req,res,next){
        console.log("Attempting to fetch users");
        try{
            Users.findAll().then(users => {
                console.log("All users:", JSON.stringify(users, null, 4));
                return res.json({
                    status: 200,
                    data: users,
                    message: "Users fetched successfully."
                })
            });
        } catch (exception){
            console.log("An exception occured, please contact the administrator.", exception);
        }
    }
]

exports.test_user_create = [
    function (req, res, next){
        console.log("Attempting to save user");
        Users.sync().then((result) => {
            console.log("Result of sync", result);
            Users.create({ 
                first_name: "Jane", 
                middle_name: "Thomas",
                last_name: "Doe",
                email_id: "jane.doe@gmail.com",
                phone_number: "234234234" 
            }).then(jane => {
                console.log("Jane's auto-generated ID:", jane.id);
                return res.json({
                    status: 200,
                    data: jane,
                    message: "User created successfully."
                })
            }).catch(err => {
                console.error('Unable to connect to the database:', err);
                return res.json({
                    status: 500,
                    data: err,
                    message: "User creation failed."
                })
            });    
        }).catch((error) => {
            console.log("An error was encountered during the synchronization", error);
        })        
    }
]

exports.test_user_delete = [
    function (req, res, next){
        console.log("Attempting to destroy user");
        Users.destroy({
            where: {
                user_id: 3
            }
        }).then((result) => {
            if(result){
                console.log("It has been done.", result)
                return res.json({
                    status: 200,
                    data: result,
                    message: "User deletion successful."
                })
            } else {
                console.log("It was not done.", result)
                return res.json({
                    status: 201,
                    data: result,
                    message: "User deletion unsuccessful, no record found to delete."
                })
            }            
        }).catch(err => {
            console.error('Unable to connect to the database:', err);
            return res.json({
                status: 500,
                data: err,
                message: "User deletion failed."
            })
        }); 
               
    }
]


exports.signature_upload = [
    function (req, res, next){
        console.log("Attempting to save signature image", req.body);
        try{
            var base64Data = req.body.signature.replace(/^data:image\/png;base64,/, "");
            // var base64Data = req.body.signature.replace(/^data:image\/svg+xml;base64,/, "");
            
            let fileName = new Date().getTime();

            require("fs").writeFile(`files/signatures/signature_${fileName}.png`, base64Data, 'base64', function(err) {
                if(err) throw err;
                return res.send({
                    status: 200,
                    data: `signature_${fileName}.png`,
                    message: 'The Signature Image was successfully saved.'
                })
            });
        } catch (exception) {
            console.log("Exception caught", exception);
        }
    }
]


exports.test_user_update = [
    function (req, res, next){
        console.log("Attempting to update user");        
        
        Users.update({ last_name: "Doe" }, {
            where: {
                last_name: ""
            }
        }).then((result) => {
            console.log("Result of update opertation", result);
            console.log("Type of result of update opertation", typeof(result));
            if(result[0]){
                console.log("It has been done.", result)
                return res.json({
                    status: 200,
                    data: result,
                    message: "User update successful."
                })
            } else {
                console.log("It was not done.", result)
                return res.json({
                    status: 201,
                    data: result,
                    message: "User update unsuccessful, no record found to update."
                })
            }            
        }).catch(err => {
            console.error('Unable to connect to the database:', err);
            return res.json({
                status: 500,
                data: err,
                message: "User deletion failed."
            })
        });                
    }
]