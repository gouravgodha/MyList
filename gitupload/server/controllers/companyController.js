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

let company_type_model = require('../models/company_type_model');

let business_type = company_type_model.businessType;
let company_type = company_type_model.company;
let jobregister_type = company_type_model.jobRegister;

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

exports.fetch_company_details = [
    function (req,res,next){
        console.log("Attempting to fetch all Company Detail's");
        try{
            var where={};
            if(req.params.company_id!=undefined &&  req.params.company_id){
            where={
                where:{company_id:req.params.company_id}
            }
        }
            company_type.findAll(where).then(company_type => {
               // console.log("All Business Type:", JSON.stringify(business_type, null, 4));
                return res.json({
                    status: 200,
                    data: company_type,
                    message: "Company types fetched successfully."
                })
            });
        } catch (exception){
            console.log("An exception occured, please contact the administrator.", exception);
        }
    }
]


exports.fetch_company_detailss = [
    function (req,res,next){
        console.log("Attempting to fetch all Company Detail's");
        try{
            business_type.findAll({ include: [{model: company_type, required: true}]}).then(business_type => {
               // console.log("All Business Type:", JSON.stringify(business_type, null, 4));
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

exports.fetch_company_listed = [
    function (req,res,next){
        console.log("Attempting to fetch all Company Detail's thats is listed");
        try{

                var where={Listed:'Yes'};
                //if(req.params.company_id!=undefined &&  req.params.company_id){
                    // where={
                    //     where:{Listed:'Yes'}
                    // }
               // }
            company_type.findAll({
                where,            
                include:[
                {
                    model: jobregister_type,
                    attributes:[
                        'job_title'
                    ],
                    required: false
                }
                ]
                }).then(company_type => {
               // console.log("All Business Type:", JSON.stringify(company_type, null, 4));
               console.log("All Business Type:", JSON.stringify(company_type,null,4));

               let formatted_company_type = JSON.parse(JSON.stringify(company_type));

               for(let i = 0; i < formatted_company_type.length; i++){
                let company = formatted_company_type[i];
                company.open_positions = company.job_registers.length;
                delete company.job_registers;
               }

                return res.json({
                    status: 200,
                    data: formatted_company_type,
                    message: "Business types fetched successfully."
                })
            });
        } catch (exception){
            console.log("An exception occured, please contact the administrator.", exception);
        }
    }
]


exports.fetch_company_detail_by_id = [
    function (req,res,next){
        console.log("Attempting to fetch all Company Detail's thats is listed", req.body);
        try{

                var where={company_id:req.params.company_id};
                //if(req.params.company_id!=undefined &&  req.params.company_id){
                    // where={
                    //     where:{Listed:'Yes'}
                    // }
               // }
            company_type.findAll({
                where,            
                include:[
                {
                    model: jobregister_type,
                    // attributes:[
                    //     'job_title'
                    // ],
                    required: false
                }
                ]
                }).then(company_type => {
               // console.log("All Business Type:", JSON.stringify(company_type, null, 4));
               console.log("All Business Type:", JSON.stringify(company_type,null,4));

               let formatted_company_type = JSON.parse(JSON.stringify(company_type));

               for(let i = 0; i < formatted_company_type.length; i++){
                let company = formatted_company_type[i];
                company.open_positions = company.job_registers.length;
                //delete company.job_registers;
               }

                return res.json({
                    status: 200,
                    data: formatted_company_type,
                    message: "Business types fetched successfully."
                })
            });
        } catch (exception){
            console.log("An exception occured, please contact the administrator.", exception);
        }
    }
]

// exports.fetch_company_listed = [
//     async function (req,res,next){
//         console.log("Attempting to fetch all Company Detail's thats is listed");
//         try{

//             let where={Listed:'Yes'};
//             let results;

//             results = await company_type.findAll({
//                 where,
//                 attributes: [
//                  "company_id"
//                 ],
//                 include:[
//                     {
//                         model: jobregister_type,
//                         attributes:[
//                             'job_title'
//                         ],
//                         required: false
//                     }
//                 ]
//             })

//             let company_ids_where_clause = [];

//             for(let i = 0; i < results.length; i++){
//                 company_ids.push({"company_id":results[i].company_id});
//             }
//             console.log("The company ids are", company_ids);

            

//             let where_company

//             console.log("The Results are", JSON.stringify(results, null, 4));
//             res.send({
//                 status: 200,
//                 data: results,
//                 message: "Data fetched successfully"
//             })  
//         } catch (exception){
//             console.log("An exception occured, please contact the administrator.", exception);
//         }
//     }
// ]


exports.home = function (req, res, next) {
    return res.send({
        status: 400,
        data: "error!"
    })             
  };


exports.create_company = [
    function (req, res, next){
        console.log("Attempting to save company detail");
        console.log("Request body", req.body);
        console.log("Request files", req.file);
        // /  res.send(req.files);
        // console.log("Request", req);
        company_type.sync({force:false}).then((result) => {
            console.log("Result of sync", result);
            company_type.create({                 
                bussiness_type_id: req.body.bussiness_type_id,
                email: req.body.email,
                company_name: req.body.company_name,
                company_address: req.body.company_address,
                city: req.body.city,
                state: req.body.state,
                Listed: req.body.Listed,
                company_logo: req.file.originalname,
                phone_number: req.body.phone_number,
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                status: req.body.status,
                created_date: new Date(),
                updated_date: new Date() 
            }).then(responce => {
                console.log("Company auto-generated ID:", responce.id);
                return res.json({
                    status: 200,
                    data: responce,
                    message: "Company created successfully."
                })
            }).catch(err => {
                console.error('Unable to connect to the database:', err);
                return res.json({
                    status: 500,
                    data: err,
                    message: "Company creation failed."
                })
            });    
        }).catch((error) => {
            console.log("An error was encountered during the synchronization", error);
        })        
    }
]


exports.company_record_delete = [
    function (req, res, next){
        console.log("Attempting to delete Company ", req.params);
        company_type.destroy({
            where: {
                company_id: req.params.id
            }
        }).then((result) => {
            if(result){
                console.log("It has been done.", result)
                return res.json({
                    status: 200,
                    data: result,
                    message: "Company deletion successful."
                })
            } else {
                console.log("It was not done.", result)
                return res.json({
                    status: 201,
                    data: result,
                    message: "Company deletion unsuccessful, no record found to delete."
                })
            }            
        }).catch(err => {
            console.error('Unable to connect to the database:', err);
            return res.json({
                status: 500,
                data: err,
                message: "Company deletion failed."
            })
        }); 
               
    }
]

exports.update_company_detail = [
    function (req, res, next){
        console.log("Attempting to update Company Detailssssss");   
        console.log(req.body);     
        
        company_type.update(
            req.body, 
            {
                where: {
                    company_id: req.body.company_id
                }
        }).then((result) => {
            console.log("Result of update opertation", result);
            console.log("Type of result of update opertation", typeof(result));
            if(result[0]){
                console.log("It has been done.", result)
                return res.json({
                    status: 200,
                    data: result,
                    message: "company detail update successful."
                })
            } else {
                console.log("It was not done.", result)
                return res.json({
                    status: 201,
                    data: result,
                    message: "company  update unsuccessful, no record found to update."
                })
            }            
        }).catch(err => {
            console.error('Unable to connect to the database:', err);
            return res.json({
                status: 500,
                data: err,
                message: "company deletion failed."
            })
        });                
    }
]

exports.fetch_company_detail = [
    function (req,res,next){
        console.log("Attempting to fetch Company Detail");
        console.log("The params received are", req.params);
        try{
            company_type.findOne({
                where: {
                    company_id: req.params.company_id
                }
            }).then(company_detail => {
                console.log("All Company Detail:", JSON.stringify(company_detail, null, 4));
                return res.json({
                    status: 200,
                    data: company_detail,
                    message: "Company Detail fetched successfully."
                })
            });
        } catch (exception){
            console.log("An exception occured, please contact the administrator.", exception);
        }
    }
]

// exports.read_config = [
//     function (req,res,next) {
//         console.log("Attempting to read config");
//         fs.readFile('../config.json', (err, data) => {  
//             if (err){
//                 return res.send({
//                     status: 400,
//                     data: err
//                 })                
//             }

//             let appt_app_config = JSON.parse(data);
//             console.log("Appointment application config data", appt_app_config);

//             var formatted_config = Object.assign({}, appt_app_config);
                        
//             // delete formatted_config.port;
//             // delete formatted_config.secret;        

//             return res.send({
//                 status: 200,
//                 data: formatted_config
//             })
//         });
//         console.log('This is after the read call');
//     }
// ]

// exports.test_function = [
//     async function (req,res,next) {
//         console.log("Attempting to read config");
//         let data;
//         data = await testFn.getData();
//         console.log("Get data called, d is", data);
        
//         return res.send({
//             status: 200,
//             data: data,
//             message: "Method called successfully."
//         })        
//     }
// ]



// exports.fetch_business_types = [
//     function (req,res,next){
//         console.log("Attempting to fetch all Business Types");
//         try{
//             company_type.findAll().then(business_type => {
//                 console.log("All Business Type:", JSON.stringify(business_type, null, 4));
//                 return res.json({
//                     status: 200,
//                     data: business_type,
//                     message: "Business types fetched successfully."
//                 })
//             });
//         } catch (exception){
//             console.log("An exception occured, please contact the administrator.", exception);
//         }
//     }
// ]

// 



