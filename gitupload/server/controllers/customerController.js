var async = require('async');
var path = require('path');
var multer = require('multer');

let Customers = require('../models/customer');
let Customer = Customers.customer;
let form_type = Customers.formType;
var moment = require('moment');
moment().format();

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



exports.fetchCustomer = [
    function (req,res,next){
        console.log(`Attempting to fetch a Customer with customer_id ${req.params.customer_id}`);
        try{
            Customer.findOne({
                include: [{model: form_type, required: true}],
                where:{
                    customer_id: req.params.customer_id
                }
            }).then(customer => {
                console.log("Specified customer:", JSON.stringify(customer, null, 4));
                // console.log("req", req);
                
                if(customer == null){
                    return res.json({
                        status: 404,
                        message: "Customer not found."
                    })
                }

                let customerData = JSON.parse(JSON.stringify(customer, null, 4));

                // let customerData = Object.assign({}, customer, {
                //     docFilePath: `${req.headers.host}/documents/${customer.customer_document_filename}`,                    
                // });

                customerData.docFilePath = `${req.headers.host}/documents/${customer.form_types_master.customer_document_filename}`;
                console.log("Customer data", customerData);
                return res.json({
                    status: 200,
                    data: customerData,
                    message: "Customer fetched successfully."
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

exports.fetchCustomers = [
    function (req,res,next){
        console.log("Attempting to fetch Customers.");
        try{
            Customer.findAll().then(customers => {
                console.log("All Customers:", JSON.stringify(customers, null, 4));
                if(customers == null){
                    return res.json({
                        status: 404,
                        message: "Customers not found."
                    })
                }
                return res.json({
                    status: 200,
                    data: customers,
                    message: "Customers fetched successfully."
                })
            }).catch(err => {
                console.error('Unable to connect to the database:', err);
                return res.json({
                    status: 500,
                    error: err,
                    message: "Failed to fetch Customers."
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


exports.createCustomer = [
     function (req, res, next){
        console.log("Attempting to save customer", req.body);
        Customer.sync({ force : false }).then((result) => {
            // console.log("Result of sync", result);
            // console.log("The Uploaded file is", req.file);
            // let newCustomer = Object.assign({}, req.body, {
            //     customer_document_identifier: req.file.filename,
            //     customer_document_filename: req.file.filename
            // });
            // console.log("New customer", newCustomer);

            Customer.create(
                req.body
            ).then(async(customer) => {
                console.log("The new customers's auto-generated ID:", customer.customer_id);

                let info = await  transporter.sendMail({
                    from: '"Eviden" <gourav.godha@syscraftonline.com>', // sender address
                    to: customer.customer_email, // list of receivers
                    subject: "Customer policy", // Subject line
                    //text: "Hello world?", // plain text body
                    html: "<b>please check below URL to fill your policy form</b><p><a target='_blank' href='http://192.168.1.7:8075/customerinfo/"+customer.customer_id+"'>Click Here</a></p>" // html body
                });

                 console.log("Message sent: %s", info.messageId);

                return res.json({
                    status: 200,
                    data: customer,
                    message: "Customer created successfully."
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