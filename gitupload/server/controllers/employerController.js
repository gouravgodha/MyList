var async = require('async');
var path = require('path');
var multer = require('multer');

let employer = require('../models/employer');
let Employer = employer.employee;
let EmployerHistory = employer.employeeHistory;
var connection_db = require('../config/configdb.js');
const sequelize = connection_db.connection;
// let form_type = Customers.formType;
var moment = require('moment');
moment().format();

//var fs           = require('fs');
var Sequelize    = require('sequelize');
const Op         = Sequelize.Op;

const { body,validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');

const nodemailer = require("nodemailer");
let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
        user: 'shrma.aashish@gmail.com',
        pass: 'rupesh@123456'
    }
});



exports.fetchEmployeeById = [
function (req,res,next){
    console.log(`Attempting to fetch a Employee with employee id ${req.params.emp_id}`);
    try{
   Employer.findOne({
            include: [{model: EmployerHistory, required: false}],
            where:{
                id: req.params.emp_id
            }
        }).then(employee => {

            console.log("Specified Employee:", JSON.stringify(employee, null, 4));
                //return false;
                // console.log("req", req);
                
                if(employee == null){
                    return res.json({
                        status: 404,
                        message: "Employee not found."
                    })
                }

                let customerData = JSON.parse(JSON.stringify(employee, null, 4));

                // let customerData = Object.assign({}, customer, {
                //     docFilePath: `${req.headers.host}/documents/${customer.customer_document_filename}`,                    
                // });

                customerData.docFilePath = `${req.headers.host}/documents/${employee.employee_history.emp_resume}`;
                console.log("Employee data", customerData);
                return res.json({
                    status: 200,
                    data: customerData,
                    message: "Employee fetched successfully."
                })
            }).catch(err => {
                console.error('Unable to connect to the database:', err);
                return res.json({
                    status: 404,
                    error: err,
                    message: "Failed to fetch the specified Customer."
                })
            });
        } catch (exception){
            console.log("An exception occured, please contact the administrator.", exception);
        }
    }
    ]



/*** for and and where conditoin **/
exports.fetchUserlogin = [
    function (req,res,next){
        console.log('body responce is!',req.body);
        try{
            Employer.findOne({

                where: {
                    emp_email: req.body.emp_email,
                    emp_pass: req.body.emp_pass
                }
            }).then(user => {
                console.log("User: ", JSON.stringify(user, null, 4));
                if(user == null) {
                    return res.json({
                        status: 404,
                        message: `Employee Did not found`
                    })
                }
                return res.json({
                    status: 200,
                    data: user,
                    message: "Employee LoggedIn successfully."
                })
            }).catch(err => {
                console.error('Unable to connect to the database:', err);
                return res.json({
                    status: 500,
                    data: err,
                    message: "Login Detail fetch failed."
                })
            });
        } catch (exception){
            console.log("An exception occured, please contact the administrator.", exception);
        }
    }
]
/** end **/

    exports.fetchEmployee = [
    function (req,res,next){
        console.log("Attempting to fetch Employee.");
        try{
            Employer.findAll().then(employee => {
                console.log("All Employee:", JSON.stringify(employee, null, 4));
                if(employee == null){
                    return res.json({
                        status: 404,
                        message: "Employee not found."
                    })
                }
                return res.json({
                    status: 200,
                    data: employee,
                    message: "Employee fetched successfully."
                })
            }).catch(err => {
                console.error('Unable to connect to the database:', err);
                return res.json({
                    status: 500,
                    error: err,
                    message: "Failed to fetch Employee."
                })
            });
        } catch (exception){
            console.log("An exception occured, please contact the administrator.", exception);
        }
    }
    ]

// exports.createCustomer = [
//      function (req, res, next){
//         console.log("Attempting to save customer", req.body);
//         Customer.sync({ force : false }).then((result) => {
//             console.log("Result of sync", result);
//             console.log("The Uploaded file is", req.file);
//             let newCustomer = Object.assign({}, req.body, {
//                 customer_document_identifier: req.file.filename,
//                 customer_document_filename: req.file.filename
//             });
//             console.log("New customer", newCustomer);

//             Customer.create(
//                 newCustomer
//             ).then(async(customer) => {
//                 console.log("The new customers's auto-generated ID:", customer.customer_id);

//                 let info = await  transporter.sendMail({
//                     from: '"Eviden" <gourav.godha@syscraftonline.com>', // sender address
//                     to: customer.customer_email, // list of receivers
//                     subject: "Customer policy", // Subject line
//                     //text: "Hello world?", // plain text body
//                     html: "<b>please check below URL to fill your policy form</b><p><a target='_blank' href='http://192.168.1.7:8075/customerinfo/"+customer.customer_id+"'>Click Here</a></p>" // html body
//                 });

//                  console.log("Message sent: %s", info.messageId);

//                 return res.json({
//                     status: 200,
//                     data: customer,
//                     message: "Customer created successfully."
//                 })
//             }).catch(err => {
//                 console.error('Unable to connect to the database:', err);
//                 return res.json({
//                     status: 500,
//                     data: err,
//                     message: "Customer creation failed."
//                 })
//             });    
//         }).catch((error) => {
//             console.log("An error was encountered during the synchronization", error);
//         })        
//     }
// ]


    exports.createEmployer = [
    function (req, res, next){

        let new_employee;

        return sequelize.transaction(function (t) {
          return Employer.create({
            emp_firstname: req.body.emp_firstname,
            emp_lastname: req.body.emp_lastname,
            emp_email: req.body.emp_email,
            emp_pass: req.body.emp_pass,
            status: 'Active'

        }, {transaction: t}).then(function (user) {
            new_employee = user;
            return EmployerHistory.create({
              emp_id: user.id
          }, {transaction: t});
        });
    }).then(function (result) {
       console.log("The new Employer's auto-generated ID:", result);


       return res.json({
        status: 200,
        data: new_employee,
        message: "Employer created successfully."
    }) 
    }).catch(function (err) {
      console.error('Unable to connect to the database:', err);
      return res.json({
        status: 500,
        data: err,
        message: "Customer creation failed."
    })
    });

    }
]


//*** employee history **/

exports.createEmployeeHistory = [
function (req, res, next){

   req.body.emp_resume = req.file.filename;
        //console.log("Attempting to save customer", req.body);
        EmployerHistory.sync({ force : false }).then((result) => {           
            EmployerHistory.create(
                req.body
                ).then(async(employer) => {
                    console.log("The new Employer's auto-generated ID:", employer.id);

                // let info = await  transporter.sendMail({
                //     from: '"Eviden" <gourav.godha@syscraftonline.com>', // sender address
                //     to: employer.customer_email, // list of receivers
                //     subject: "Customer policy", // Subject line
                //     //text: "Hello world?", // plain text body
                //     html: "<b>please check below URL to fill your policy form</b><p><a target='_blank' href='http://192.168.1.7:8075/customerinfo/"+customer.customer_id+"'>Click Here</a></p>" // html body
                // });

                // console.log("Message sent: %s", info.messageId);

                return res.json({
                    status: 200,
                    data: employer,
                    message: "Employer History created successfully."
                })
            }).catch(err => {
                console.error('Unable to connect to the database:', err);
                return res.json({
                    status: 500,
                    data: err,
                    message: "Customer creation failed."
                })
            });    
        }).catch((error) => {
            console.log("An error was encountered during the synchronization", error);
        })        
    }
    ]
    /*** employee history end **/


//*** search  employee history **/

exports.SearchEmployeeHistory = [
function (req, res, next){

    console.log("search...");
        // let queryData = {
        //      [Op.or]:[
        //     company_name:{
        //         [Op.like]: `%${req.body.company_name}%`
        //     },
        //      home_location:{
        //         [Op.like]: `%${req.body.home_location}%`
        //     }
        //     ]
        // };


        //console.log("Attempting to save customer", req.body);
        EmployerHistory.sync({ force : false }).then((result) => {           
            EmployerHistory.findAll({
             where: {
                [Op.or]: [{
                    company_name:{
                        [Op.like]: `%${req.body.company_name}%`
                    }},
                    {home_location:{
                        [Op.like]: `%${req.body.home_location}%`
                    }}
                    ]
                }
            }).then(async(employer) => {
                console.log("Trying to search record",employer);

                // let info = await  transporter.sendMail({
                //     from: '"Eviden" <gourav.godha@syscraftonline.com>', // sender address
                //     to: employer.customer_email, // list of receivers
                //     subject: "Customer policy", // Subject line
                //     //text: "Hello world?", // plain text body
                //     html: "<b>please check below URL to fill your policy form</b><p><a target='_blank' href='http://192.168.1.7:8075/customerinfo/"+customer.customer_id+"'>Click Here</a></p>" // html body
                // });

                // console.log("Message sent: %s", info.messageId);

                return res.json({
                    status: 200,
                    data: employer,
                    message: "Employer History created successfully."
                })
            }).catch(err => {
                console.error('Unable to connect to the database:', err);
                return res.json({
                    status: 500,
                    data: err,
                    message: "Customer creation failed."
                })
            });    
        }).catch((error) => {
            console.log("An error was encountered during the synchronization", error);
        })        
    }
    ]
    /*** search employee history end **/


    /***update employee history ***/
    exports.updateEmployeeHistory = [
    function (req, res, next){
        console.log("Resume name",req.file.filename);
        console.log("Attempting to update Employee History.", req.body);
        req.body.emp_resume = req.file.filename;
        EmployerHistory.update(req.body, {

            where: {
                emp_history_id: req.body.emp_history_id
            }
        }).then((result) => {
            console.log("Result of update opertation.", result);
            console.log("Type of result of update opertation.", typeof(result));
            if(result[0]){
                console.log("Eployee update successful.", result);
                return res.json({
                    status: 200,
                    data: result,
                    message: "Employee update successful."
                })
            } else {
                console.log("Employee update failed.", result);
                return res.json({
                    status: 404,
                    message: "Employee update unsuccessful, no record found to update."
                })
            }      
        }).catch(err => {
            console.error('Unable to connect to the database:', err);
            return res.json({
                status: 500,
                data: err,
                message: "Employee update failed."
            })
        });
    }
    ]
    /****update employee history end **/




    exports.updateemployee = [
    async function (req, res, next){
        console.log("i am in controller");
        console.log("request body is",req.body);
    //     let transaction;    

    //     try {
    //   // get transaction
    //   transaction = await sequelize.transaction();

    //   // step 1
    //   // await Model.destroy({where: {id}, transaction});

    //   // // step 2
    //   // await Model.create({}, {transaction});

    //   // step 3
    //   await EmployerHistory.update({emp_job_title: req.body.emp_job_title,company_name: req.body.company_name}, {where: {  emp_id: req.body.emp_id}, transaction });

    //    await Employer.update({emp_firstname: req.body.emp_firstname,emp_lastname: req.body.emp_lastname}, {where: {  id: req.body.id}, transaction });

    //   // commit
    //   await transaction.commit();

    //   return res.json({
    //     status: 200,
    //     // data: result,
    //     message: "Employee update successful."
    // })


    // } catch (err) {
    //   // Rollback transaction only if the transaction object is defined
    //   if (transaction) await transaction.rollback();
    // }


    return sequelize.transaction(t => {
                  // chain all your queries here. make sure you return them.
                  return EmployerHistory.update({

                     emp_job_title: req.body.emp_job_title,
                     company_name: req.body.company_name,
                     job_started_month: req.body.job_started_month,
                     job_started_year: req.body.job_started_year,
                     job_end_month: req.body.job_end_month,
                     job_end_year: req.body.job_end_year,
                     home_location: req.body.home_location,
                     preferred_classification: req.body.preferred_classification,
                     sub_classification: req.body.sub_classification,
                     cover_letter: req.body.cover_letter,
                     phone_number: req.body.phone_number,
                     skill_set: req.body.skill_set,
                     emp_resume: req.file.filename,
                     annual_salary: req.body.annual_salary,
                     year_of_exp: req.body.year_of_exp,
                     updated_date: new Date()

                 },
                    {
                        where:{
                            emp_id: req.body.emp_id
                        }
                    }
                 , {transaction: t}).then(EmployerHistory => {
                    return Employer.update({
                       emp_firstname: req.body.emp_firstname,
                       emp_lastname: req.body.emp_lastname,
                       status:req.body.status,
                       updated_date: new Date()
                   },
                   {
                        where:{
                            id: req.body.emp_id
                        }
                    }
                   , {transaction: t});
                });

             }).then(result => {


                console.log("Result of update opertation.", result);
                console.log("Type of result of update opertation.", typeof(result));
                if(result[0]){
                    console.log("Eployee update successful.", result);
                    return res.json({
                        status: 200,
                        data: result,
                        message: "Employee update successful."
                    })
                } else {
                    console.log("Employee update failed.", result);
                    return res.json({
                        status: 404,
                        message: "Employee update unsuccessful, no record found to update."
                    })
                }      

                  // Transaction has been committed
                  // result is whatever the result of the promise chain returned to the transaction callback
              }).catch(err => {

                 console.error('Unable to connect to the database:', err);
                 return res.json({
                    status: 500,
                    data: err,
                    message: "Employee update failed."
                })
                  // Transaction has been rolled back
                  // err is whatever rejected the promise chain returned to the transaction callback
              });
          }
          ]



          exports.createCustomerinfo = [
          function (req, res, next){
            console.log("Attempting to update Customer.", req.body);
            Customer.update(req.body, {
                where: {
                    customer_id: req.body.customer_id
                }
            }).then((customer) => {
                console.log("Result of update opertation.", customer);

             // let info = await  transporter.sendMail({
             //        from: '"Eviden" <gourav.godha@syscraftonline.com>', // sender address
             //        to: customer.customer_email, // list of receivers
             //        subject: "Customer policy Registered", // Subject line
             //        //text: "Hello world?", // plain text body
             //        html: "<p>Hello "+customer.customer_first_name+",</p><p>We got your customer required information into our database, we will contact you soon.</p>" // html body
             //    });

             //     console.log("Message sent: %s", info.messageId);


             if(customer[0]){
                console.log("Customer update successful.", customer);
                return res.json({
                    status: 200,
                    data: customer,
                    message: "Customer update successful."
                })
            } else {
                console.log("Customer update failed.", customer);
                return res.json({
                    status: 404,
                    message: "Customer update unsuccessful, This value is already exist."
                })
            }      
        }).catch(err => {
            console.error('Unable to connect to the database:', err);
            return res.json({
                status: 500,
                data: err,
                message: "Customer update failed."
            })
        });
    }
    ]



    exports.deleteCustomer = [
    function (req, res, next){
        console.log(`Attempting to destroy a customer record with customer_id ${req.params.customer_id}`);
        Customer.destroy({
            where: {
                customer_id: req.params.customer_id
            }
        }).then((result) => {
            if(result){
                console.log("The customer was deleted.", result)
                return res.json({
                    status: 200,
                    data: result,
                    message: "Customer deletion successful."
                })
            } else {
                console.log("The customer wasn't deleted.", result)
                return res.json({
                    status: 404,
                    message: "Customer deletion unsuccessful, no record found to delete."
                })
            }            
        }).catch(err => {
            console.error('Unable to connect to the database:', err);
            return res.json({
                status: 500,
                data: err,
                message: "Customer deletion failed."
            })
        });                
    }
    ]

    exports.updateCustomer = [
    function (req, res, next){
        console.log("Attempting to update Customer.", req.body);
        Customer.update(req.body, {
            where: {
                customer_id: req.body.customer_id
            }
        }).then((result) => {
            console.log("Result of update opertation.", result);
            console.log("Type of result of update opertation.", typeof(result));
            if(result[0]){
                console.log("Customer update successful.", result);
                return res.json({
                    status: 200,
                    data: result,
                    message: "Customer update successful."
                })
            } else {
                console.log("Customer update failed.", result);
                return res.json({
                    status: 404,
                    message: "Customer update unsuccessful, no record found to update."
                })
            }      
        }).catch(err => {
            console.error('Unable to connect to the database:', err);
            return res.json({
                status: 500,
                data: err,
                message: "Customer update failed."
            })
        });
    }
    ]