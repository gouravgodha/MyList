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

let form_type_model = require('../models/form_type_model');

let form_type = form_type_model.formType;
let company_type = form_type_model.company;


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
    console.log("i am ahee");
    return res.send(
    {
        status: 400,
        data: "error!"
    }
    )             
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

exports.fetch_form_type = [
    function (req,res,next){
        console.log("Attempting to fetch Form Type");
        console.log("The params received are", req.params);
        try{
            form_type.findOne({
                where: {
                    form_id: req.params.form_id
                }
            }).then(business_type => {
                console.log("All Form Type:", JSON.stringify(business_type, null, 4));
                return res.json({
                    status: 200,
                    data: business_type,
                    message: "Form type fetched successfully."
                })
            });
        } catch (exception){
            console.log("An exception occured, please contact the administrator.", exception);
        }
    }
]

exports.fetch_form_types = [
    function (req,res,next){
        console.log("Attempting to fetch all Form Types");
        try{
            form_type.findAll({ include: [{model: company_type, required: true}]}).then(result => {
                console.log("All Business Type:", JSON.stringify(result, null, 4));
                return res.json({
                    status: 200,
                    data: result,
                    message: "Form types fetched successfully."
                })
            });
        } catch (exception){
            console.log("An exception occured, please contact the administrator.", exception);
        }
    }
]

exports.create_form_type = [
    function (req, res, next){
        console.log("Attempting to save Form Types");
        console.log("Request body", req.body);
        // console.log("Request files", req.files);
        // console.log("Request", req);
        form_type.sync({force:false}).then((result) => {

            console.log("Result of sync", result);
            console.log("The Uploaded file is", req.file);
            let newCustomer = Object.assign({}, req.body, {
                //customer_document_identifier: req.file.filename,
                customer_document_filename: req.file.filename
            });
            console.log("New customer", newCustomer);

            console.log("Result of sync", result);
            form_type.create(                 
                // form_company_id: req.body.form_company_id,
                // form_title: req.body.form_title,
                // form_statement: req.body.form_statement,
                // form_video_duration: req.body.form_video_duration,
                // form_status: req.body.form_status,
                // form_user_id: req.body.form_user_id,
                // created_date: new Date(),
                // updated_date: new Date() 
                newCustomer
            ).then(responce => {
                console.log("Form Type's auto-generated ID:", responce.form_id);
                return res.json({
                    status: 200,
                    data: responce,
                    message: "Form Type  created successfully."
                })
            }).catch(err => {
                console.error('Unable to connect to the database:', err);
                return res.json({
                    status: 500,
                    data: err,
                    message: "Form Type creation failed."
                })
            });    
        }).catch((error) => {
            console.log("An error was encountered during the synchronization", error);
        })        
    }
]

exports.formtype_record_delete = [
    function (req, res, next){
        console.log("Attempting to delete Form type ", req.params);
        form_type.destroy({
            where: {
                form_id: req.params.id
            }
        }).then((result) => {
            if(result){
                console.log("It has been done.", result)
                return res.json({
                    status: 200,
                    data: result,
                    message: "Form Type Record deletion successful."
                })
            } else {
                console.log("It was not done.", result)
                return res.json({
                    status: 201,
                    data: result,
                    message: "Form Type deletion unsuccessful, no record found to delete."
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

exports.update_form_type = [
    function (req, res, next){
        console.log("Attempting to update Form Type");   
        console.log(req.body);     
        
        form_type.update(
        { 
            form_company_id: req.body.form_company_id,
            form_title: req.body.form_title ,
            form_statement: req.body.form_statement ,
            form_video_duration: req.body.form_video_duration ,
            form_status: req.body.form_status ,
            form_user_id: req.body.form_user_id ,
            updated_date: new Date()
        }, 
        {
            where: {
                form_id: req.body.form_id
            }
        }).then((result) => {
            console.log("Result of update opertation", result);
            console.log("Type of result of update opertation", typeof(result));
            if(result[0]){
                console.log("It has been done.", result)
                return res.json({
                    status: 200,
                    data: result,
                    message: "Form Record update successful."
                })
            } else {
                console.log("It was not done.", result)
                return res.json({
                    status: 201,
                    data: result,
                    message: "Form Type update unsuccessful, no record found to update."
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