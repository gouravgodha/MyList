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

let busines_type_model = require('../models/business_type_model');

let business_type = busines_type_model.BusinessType;

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
    return res.send({
        status: 400,
        data: "error!"
    })             
  };

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

exports.fetch_business_type = [
    function (req,res,next){
        console.log("Attempting to fetch Business Type");
        console.log("The params received are", req.params);
        try{
            business_type.findOne({
                where: {
                    business_type_id: req.params.business_type_id
                }
            }).then(business_type => {
                console.log("All Business Type:", JSON.stringify(business_type, null, 4));
                return res.json({
                    status: 200,
                    data: business_type,
                    message: "Business type fetched successfully."
                })
            });
        } catch (exception){
            console.log("An exception occured, please contact the administrator.", exception);
        }
    }
]

exports.fetch_business_types = [
    function (req,res,next){
        console.log("Attempting to fetch all Business Types");
        try{
            business_type.findAll().then(business_type => {
                console.log("All Business Type:", JSON.stringify(business_type, null, 4));
                return res.json({
                    status: 200,
                    data: business_type,
                    message: "Business types fetched successfully."
                })
            });
        } catch (exception){
            console.log("An exception occured, please contact the administrator.", exception);
        }
    }
]

exports.create_business_type = [
    function (req, res, next){
        console.log("Attempting to save businesstype");
        console.log("Request body", req.body);
        console.log("Request files", req.files);
        // console.log("Request", req);
        business_type.sync({force:false}).then((result) => {
            console.log("Result of sync", result);
            business_type.create({                 
                business_type: req.body.business_type,
                business_status: req.body.business_status,
                created_date: new Date(),
                updated_date: new Date() 
            }).then(responce => {
                console.log("Business Type's auto-generated ID:", responce.id);
                return res.json({
                    status: 200,
                    data: responce,
                    message: "User created successfully."
                })
            }).catch(err => {
                console.error('Unable to connect to the database:', err);
                return res.json({
                    status: 500,
                    data: err,
                    message: "Business Type creation failed."
                })
            });    
        }).catch((error) => {
            console.log("An error was encountered during the synchronization", error);
        })        
    }
]

exports.businesstype_record_delete = [
    function (req, res, next){
        console.log("Attempting to delete business type ", req.params);
        business_type.destroy({
            where: {
                business_type_id: req.params.id
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

exports.update_business_type = [
    function (req, res, next){
        console.log("Attempting to update Business Type");   
        console.log(req.body);     
        
        business_type.update({ business_type: req.body.business_type, business_status: req.body.business_status }, {
            where: {
                business_type_id: req.body.business_type_id
            }
        }).then((result) => {
            console.log("Result of update opertation", result);
            console.log("Type of result of update opertation", typeof(result));
            if(result[0]){
                console.log("It has been done.", result)
                return res.json({
                    status: 200,
                    data: result,
                    message: "business type update successful."
                })
            } else {
                console.log("It was not done.", result)
                return res.json({
                    status: 201,
                    data: result,
                    message: "Business Type update unsuccessful, no record found to update."
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