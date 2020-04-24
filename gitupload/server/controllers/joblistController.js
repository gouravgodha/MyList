var async = require('async');
var path = require('path');
var multer = require('multer');

let joblist = require('../models/joblist');
let JobRegister = joblist.jobRegister;
let AppliedJobs = joblist.appliedJobs;
let Company = joblist.company;
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



exports.fetchJobById = [
function (req,res,next){
    console.log(`Attempting to fetch a Job with Job id ${req.params.id}`);
    try{
        JobRegister.findOne({
             include: [{model: Company, required: true}],
            where:{
                id: req.params.id
            }
        }).then(jobregister => {

            console.log("Specified Job is:", JSON.stringify(jobregister, null, 4));
                //return false;
                // console.log("req", req);
                
                if(jobregister == null){
                    return res.json({
                        status: 404,
                        message: "Job not found."
                    })
                }

                let RegisteredJob = JSON.parse(JSON.stringify(jobregister, null, 4));

                // let customerData = Object.assign({}, customer, {
                //     docFilePath: `${req.headers.host}/documents/${customer.customer_document_filename}`,                    
                // });

                //customerData.docFilePath = `${req.headers.host}/documents/${employee.emp_resume}`;
                console.log("Registered Job data", RegisteredJob);
                return res.json({
                    status: 200,
                    data: RegisteredJob,
                    message: "JOB fetched successfully."
                })
            }).catch(err => {
                console.error('Unable to connect to the database:', err);
                return res.json({
                    status: 404,
                    error: err,
                    message: "Failed to fetch the specified Job."
                })
            });
        } catch (exception){
            console.log("An exception occured, please contact the administrator.", exception);
        }
    }
    ]


/** create duplicate record **/

exports.CreateDuplicatefetchJobById = [
function (req,res,next){
    console.log(`Attempting to fetch a Job with Job id for duplicate record ${req.params.id}`);
    try{
        JobRegister.findOne({
             include: [{model: Company, required: true}],
            where:{
                id: req.params.id
            }
        }).then(jobregister => {

            console.log("Specified Job is:", JSON.stringify(jobregister.job_title, null, 4));

            JobRegister.create({
                    job_title : jobregister.job_title,
                    job_summary : jobregister.job_summary,
                    application_sent : jobregister.application_sent,
                    internal_refrence : jobregister.internal_refrence,
                    job_description : jobregister.job_description,
                    job_location : jobregister.job_location,
                    job_skill : jobregister.job_skill,
                    Job_type : jobregister.Job_type,
                    industry : jobregister.industry,
                    industry_subcategory : jobregister.industry_subcategory,
                    salary_type : jobregister.salary_type,
                    salary_range_minimum : jobregister.salary_range_minimum,
                    salary_range_maximum : jobregister.salary_range_maximum,
                    membership : jobregister.membership,
                    company_id : jobregister.company_id,
                    status : jobregister.status,
                    hide_salary:jobregister.hide_salary,
                     draft : 'yes'

                }).then(result => {


                     if(jobregister == null){
                    return res.json({
                        status: 404,
                        message: "Job not found."
                    })
                }

                let RegisteredJob = JSON.parse(JSON.stringify(jobregister, null, 4));

                // let customerData = Object.assign({}, customer, {
                //     docFilePath: `${req.headers.host}/documents/${customer.customer_document_filename}`,                    
                // });

                //customerData.docFilePath = `${req.headers.host}/documents/${employee.emp_resume}`;
                console.log("Registered Job data", RegisteredJob);
                return res.json({
                    status: 200,
                    data: result,
                    message: "JOB fetched successfully."
                })

                })

                //return false;
                // console.log("req", req);
                
               
            }).catch(err => {
                console.error('Unable to connect to the database:', err);
                return res.json({
                    status: 404,
                    error: err,
                    message: "Failed to fetch the specified Job."
                })
            });
        } catch (exception){
            console.log("An exception occured, please contact the administrator.", exception);
        }
    }
    ]

/*** end record **/


    exports.FetchJob = [
    function (req,res,next){
        console.log("Attempting to fetch Job. ggggggg");
        try{
            JobRegister.findAll({ 
                include: [{model: Company, required: false},{model: AppliedJobs, required: false}],
                where:{
                    status: 'Active',
                    draft: 'no'
                },
        }).then(joblist => {
            console.log("joblist is =>",joblist[0].created_date);            
                if(joblist == null){
                    return res.json({
                        status: 404,
                        message: "Job not found."
                    })
                }

                let parsedJobs = JSON.parse(JSON.stringify(joblist));
                for(let i = 0; i < parsedJobs.length; i++){
                    parsedJobs[i].count = "11 Days";
                }

                return res.json({
                    status: 200,
                    data: parsedJobs,
                    message: "Job fetched successfully gggggg."
                })
            }).catch(err => {
                console.error('Unable to connect to the database:', err);
                return res.json({
                    status: 500,
                    error: err,
                    message: "Failed to fetch Job."
                })
            });
        } catch (exception){
            console.log("An exception occured, please contact the administrator.", exception);
        }
    }
    ]


/*********fetch draft job ***/
exports.FetchDraftJob = [
    function (req,res,next){
        console.log("Attempting to fetch Daraft Job.");
        try{
            JobRegister.findAll({ 
                include: [{model: Company, required: false},{model: AppliedJobs, required: false}],
                where:{
                    draft: 'yes'
                }
        }).then(joblist => {
            console.log("joblist is =>",joblist[0].created_date);            
                if(joblist == null){
                    return res.json({
                        status: 404,
                        message: "Job not found."
                    })
                }


                let parsedJobs = JSON.parse(JSON.stringify(joblist));
                for(let i = 0; i < parsedJobs.length; i++){
                    parsedJobs[i].count = "11 Days";
                }


                return res.json({
                    status: 200,
                    data: parsedJobs,
                    message: "Job fetched successfully gggggg."
                })
            }).catch(err => {
                console.error('Unable to connect to the database:', err);
                return res.json({
                    status: 500,
                    error: err,
                    message: "Failed to fetch Job."
                })
            });
        } catch (exception){
            console.log("An exception occured, please contact the administrator.", exception);
        }
    }
    ]

/*******end *******/

 exports.FetchApplyJobCount = [
    function (req,res,next){
        console.log("Attempting to fetch Job.",req.body);
        try{
            AppliedJobs.findAll({ 
                //include: [{model: Company, required: true},{model: AppliedJobs, required: true}],
                where:{
                    job_id: req.body.job_id,
                    company_id: req.body.company_id
                }
        }).then(joblist => {
            console.log("joblist is =>",joblist[0].created_date);            
                if(joblist == null){
                    return res.json({
                        status: 404,
                        message: "Job not found."
                    })
                }
                return res.json({
                    status: 200,
                    data: joblist,
                    message: "Job fetched successfully gggggg."
                })
            }).catch(err => {
                console.error('Unable to connect to the database:', err);
                return res.json({
                    status: 500,
                    error: err,
                    message: "Failed to fetch Job count."
                })
            });
        } catch (exception){
            console.log("An exception occured, please contact the administrator.", exception);
        }
    }
    ]


    exports.FetchExpiredJob = [
    function (req,res,next){
        console.log("Attempting to fetch expire Job.");
        try{
            JobRegister.findAll({ 
                include: [{model: Company, required: false},{model: AppliedJobs, required: false}],
                where:{
                    status: 'Deactive'
                }
        }).then(joblist => {
                console.log("All Job:", JSON.stringify(joblist, null, 4));
                if(joblist == null){
                    return res.json({
                        status: 404,
                        message: "Job not found."
                    })
                }

                 let parsedJobs = JSON.parse(JSON.stringify(joblist));
                for(let i = 0; i < parsedJobs.length; i++){
                    parsedJobs[i].count = "11 Days";
                }

                
                return res.json({
                    status: 200,
                    data: parsedJobs,
                    message: "Job fetched successfully."
                })
            }).catch(err => {
                console.error('Unable to connect to the database:', err);
                return res.json({
                    status: 500,
                    error: err,
                    message: "Failed to fetch Job."
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


exports.createJobList = [
function (req, res, next){
        //console.log("Attempting to save customer", req.body);
        JobRegister.sync({ force : false }).then((result) => {           
            JobRegister.create(
                req.body
                ).then(async(joblist) => {
                    console.log("The new Employer's auto-generated ID:", joblist.id);

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
                    data: joblist,
                    message: "Job Register  created successfully."
                })
            }).catch(err => {
                console.error('Unable to connect to the database:', err);
                return res.json({
                    status: 500,
                    data: err,
                    message: "Job  creation failed."
                })
            });    
        }).catch((error) => {
            console.log("An error was encountered during the synchronization", error);
        })        
    }
    ]


/*** apply for job **/
exports.ApplyForJob = [
function (req, res, next){
        //console.log("Attempting to save customer", req.body);
        AppliedJobs.sync({ force : false }).then(async(result) => {           

            let result1 = await AppliedJobs.findOne({
                   where:{
                    job_id: req.body.job_id,
                    employee_id: req.body.employee_id
                }
            })
                         
              if(result1 != null){

                 return res.json({
                    
                    message: "You have already apply for this job!.",
                    status:300
                })
              }
             

            AppliedJobs.create(
                req.body
                ).then(async(joblist) => {
                    console.log("The new Employee's  job auto-generated ID:", joblist.id);

                let info = await  transporter.sendMail({
                    from: '"Myjoblist" <gouravgodha@gmail.com>', // sender address
                    to: 'gourav.syscraft@gmail.com', // list of receivers
                    subject: "Job Apply Application", // Subject line
                    //text: "Hello world?", // plain text body
                    html: `<!DOCTYPE html><html><head><title>Email</title><link href="https://fonts.googleapis.com/css?family=Muli:400,500,600&display=swap" rel="stylesheet"></head><body style="background-color:#f1f3f6;    font-family: 'Muli', sans-serif;">    <div class="EmailTempates" style="max-width:60%;margin:0 auto;background-color:#fff;padding:20px;">   <table width="100%">            <tr>                <td style="width:40%"><img src="https://images.squarespace-cdn.com/content/v1/56c775ad27d4bd3fdb24775d/1519067155901-OKFUUA9DU12JTGZ4KSU8/ke17ZwdGBToddI8pDm48kDM9K2YVWke7i6qyOZAoP55Zw-zPPgdn4jUwVcJE1ZvWQUxwkmyExglNqGp0IvTJZUJFbgE-7XRK3dMEBRBhUpx6D66e60N4NH7-6c-GS1jKxs7fV43ip-j_qYsyLxlaZBtjGQiyL5M8H7JCrxTyoxc/dummy+logo.jpg" width="120"></td>                <td style="width:60%;text-align:right;"><h2 style="margin-top:10px;">Applied Jobs</h2></td>            </tr>            <tr>                <td colspan="2"><h3 style="margin-bottom:10px;">  Hi John,</h3></td>            </tr>            <tr><td colspan="2">    <p style="margin-top:0;">Your application for Accountant was successfully submitted to <b>Myjoblist Pvt Ltd.</b></p><p>Each employer has their own recruitment process so you may or may not hear back from them. Keep track of all your applied jobs on your activity page.</p><p>Here’s a summary of the job you applied for on January 6, 2020.</p></td>            </tr>            <tr>                <td style="height:20px;"></td>            </tr>            <tr>                <td colspan="2" style="background:#f1f3f6;padding: 20px;">                    <h3 style="margin: 10px 0px;margin-top:0;color:#234baa;font-weight: bold;">Sr. Accountant</h3>                    <p style="margin-top:0px;">Myjoblist Pvt Ltd</p>                    <p><b>Sydney</b> > CBD, Inner West & Eastern Suburbs</p>                    <p>A rare opportunity to work with autonomy in modern offices, whilst reporting to a supportive leader, a positive team culture & real work life balance! </p>                    <a href="#" style="display:inline-block;margin-top: 10px;text-decoration:none;background-color:#000;color:#fff;padding:10px 30px;">View More Jobs</a>                </td>            </tr>            <tr>                <td style="height:20px;"></td>            </tr>            <tr>                <td colspan="2">                    <ul style="padding-left:0;text-align:center;">                        <li style="display:inline-block;margin-right:10px;list-style:none;">                            <a href="#" style="text-decoration:none;color:#000;">Privacy Policy</a>                        </li>                        <li style="display:inline-block;margin-right:10px;list-style:none;">                            <a href="#" style="text-decoration:none;color:#000;">Profile</a>                        </li>                        <li style="display:inline-block;margin-right:10px;list-style:none;">                            <a href="#" style="text-decoration:none;color:#000;">Contact Us</a>                        </li>                    </ul>                </td>            </tr>            <tr>                <td colspan="2" style="text-align:center;">                    <p style="margin:0;">This email was sent to you as a registered user of www.myjoblist.com</p>                </td>            </tr>            <tr>                <td colspan="2" style="text-align:center;">                    <p>@myjoblist , Australia</p>                </td>            </tr>        </table>    </div></body></html>`, // html body
                    attachments:[
                        {
                            path: 'http://localhost:8217/documents/emp_resume-1571912145275.docx'    
                        }
                    ]
                });

                // console.log("Message sent: %s", info.messageId);

                return res.json({
                    status: 200,
                    data: joblist,
                    message: "Job Applyed  successfully."
                })
            }).catch(err => {
                console.error('Unable to connect to the database:', err);
                return res.json({
                    status: 500,
                    data: err,
                    message: "Job  creation failed."
                })
            });    
        }).catch((error) => {
            console.log("An error was encountered during the synchronization", error);
        })        
    }
    ]
/** end **/

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

exports.SearchJob = [
function (req, res, next){

    console.log("search...",req.body);

        let search_term = req.body.search_term;
        console.log("Serach term is", search_term);
       let jobskill = req.body.search_term;
       if((''+jobskill).length == 0){
        jobskill = ' ';
       }
        JobRegister.sync({ force : false }).then((result) => {           
            JobRegister.findAll({

          include: [{model: Company, required: false},{model: AppliedJobs, required: false}],
             where: {
                [Op.and]: [{
                    job_title:{
                        [Op.like]: `%${search_term}%`
                    }},
                    // {job_skill:{
                    //     [Op.like]: `%${jobskill}%`
                    // }}
                    { status: 'Active'},
                    {draft: 'no'}
                    ]
                }
            }).then(async(JobResult) => {
                console.log("Trying to search record", JSON.stringify(JobResult, null, 4));


                return res.json({
                    status: 200,
                    data: JobResult,
                    message: "Job Result Found successfullysss."
                })
            }).catch(err => {
                console.error('Unable to connect to the database:', err);
                return res.json({
                    status: 500,
                    data: err,
                    message: "Job Result failed."
                })
            });    
        }).catch((error) => {
            console.log("An error was encountered during the synchronization", error);
        })        
    }
    ]


exports.SearchJobForDraft = [
function (req, res, next){

    console.log("search...",req.body);

        let search_term = req.body.search_term;
        console.log("Serach term is", search_term);
       let jobskill = req.body.search_term;
       if((''+jobskill).length == 0){
        jobskill = ' ';
       }
        JobRegister.sync({ force : false }).then((result) => {           
            JobRegister.findAll({

          include: [{model: Company, required: false},{model: AppliedJobs, required: false}],
             where: {
                [Op.and]: [{
                    job_title:{
                        [Op.like]: `%${search_term}%`
                    }},
                    // {job_skill:{
                    //     [Op.like]: `%${jobskill}%`
                    // }},
                    {
                      draft: 'yes'
                    }
                    ]
                }
            }).then(async(JobResult) => {
                console.log("Trying to search record", JSON.stringify(JobResult, null, 4));


                return res.json({
                    status: 200,
                    data: JobResult,
                    message: "Job Result Found successfullysss."
                })
            }).catch(err => {
                console.error('Unable to connect to the database:', err);
                return res.json({
                    status: 500,
                    data: err,
                    message: "Job Result failed."
                })
            });    
        }).catch((error) => {
            console.log("An error was encountered during the synchronization", error);
        })        
    }
    ]


exports.SearchJobForExpired = [
function (req, res, next){

    console.log("search...",req.body);

        let search_term = req.body.search_term;
        console.log("Serach term is", search_term);
       let jobskill = req.body.search_term;
       if((''+jobskill).length == 0){
        jobskill = ' ';
       }
        JobRegister.sync({ force : false }).then((result) => {           
            JobRegister.findAll({

          include: [{model: Company, required: false},{model: AppliedJobs, required: false}],
             where: {
                [Op.and]: [{
                    job_title:{
                        [Op.like]: `%${search_term}%`
                    }},
                    // {job_skill:{
                    //     [Op.like]: `%${jobskill}%`
                    // }},
                    {
                        status: 'Deactive'
                    }
                    ]
                }
            }).then(async(JobResult) => {
                console.log("Trying to search record", JSON.stringify(JobResult, null, 4));


                return res.json({
                    status: 200,
                    data: JobResult,
                    message: "Job Result Found successfullysss."
                })
            }).catch(err => {
                console.error('Unable to connect to the database:', err);
                return res.json({
                    status: 500,
                    data: err,
                    message: "Job Result failed."
                })
            });    
        }).catch((error) => {
            console.log("An error was encountered during the synchronization", error);
        })        
    }
    ]
    

exports.SearchJobForWeb = [
function (req, res, next){

    console.log("search...",req.body);

        let search_term = req.body.job_title;
        console.log("Serach term is", search_term);
       let jobskill = req.body.job_skill;
       if((''+jobskill).length == 0){
        jobskill = ' ';
       }
        JobRegister.sync({ force : false }).then((result) => {           
            JobRegister.findAll({

            include: [{model: Company, required: true}],
             where: {
                [Op.or]: [{
                    job_title:{
                        [Op.like]: `%${search_term}%`
                    }},
                    {job_skill:{
                        [Op.like]: `%${jobskill}%`
                    }}
                    ]
                }
            }).then(async(JobResult) => {
                console.log("Trying to search record", JSON.stringify(JobResult, null, 4));


                return res.json({
                    status: 200,
                    data: JobResult,
                    message: "Job Result Found successfullysss."
                })
            }).catch(err => {
                console.error('Unable to connect to the database:', err);
                return res.json({
                    status: 500,
                    data: err,
                    message: "Job Result failed."
                })
            });    
        }).catch((error) => {
            console.log("An error was encountered during the synchronization", error);
        })        
    }
    ]
    /*** search employee history end **/


    /***update employee history ***/
    exports.UpdateJob = [
    function (req, res, next){
       // console.log("Resume name",req.file.filename);
        console.log("Attempting to update Job.", req.body);
        //req.body.emp_resume = req.file.filename;
        JobRegister.update(req.body, {

            where: {
                id: req.body.id
            }
        }).then((result) => {
            console.log("Result of update opertation.", result);
            console.log("Type of result of update opertation.", typeof(result));
            if(result[0]){
                console.log("Job update successful.", result);
                return res.json({
                    status: 200,
                    data: result,
                    message: "Job update successful."
                })
            } else {
                console.log("Job update failed.", result);
                return res.json({
                    status: 404,
                    message: "Job update unsuccessful, no record found to update."
                })
            }      
        }).catch(err => {
            console.error('Unable to connect to the database:', err);
            return res.json({
                status: 500,
                data: err,
                message: "Job update failed."
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



    exports.DeleteJob = [
    function (req, res, next){
        console.log(`Attempting to destroy a cJob record with id ${req.params.id}`);
        JobRegister.destroy({
            where: {
                id: req.params.id
            }
        }).then((result) => {
            if(result){
                console.log("The Job  was deleted.", result)
                return res.json({
                    status: 200,
                    data: result,
                    message: "Job deletion successful."
                })
            } else {
                console.log("The Job wasn't deleted.", result)
                return res.json({
                    status: 404,
                    message: "Job deletion unsuccessful, no record found to delete."
                })
            }            
        }).catch(err => {
            console.error('Unable to connect to the database:', err);
            return res.json({
                status: 500,
                data: err,
                message: "Job deletion failed."
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