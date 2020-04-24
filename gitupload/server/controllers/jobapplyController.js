var async = require('async');
var path = require('path');
var multer = require('multer');

let Jobapplyed = require('../models/jobapply');
let Jobapply = Jobapplyed.jobapply;
let Jobregister = Jobapplyed.jobregister;
let Employer = Jobapplyed.employer;
let EmployeeHistory = Jobapplyed.employeeHistory;
let Company = Jobapplyed.company;

var moment = require('moment');
moment().format();

var Sequelize    = require('sequelize');
const Op         = Sequelize.Op;

const { body,validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');


/*** for and and where conditoin **/
exports.fetchUserlogin = [
    function (req,res,next){
        console.log('body responce is!',req.body);
        try{
            user_type.findOne({

                where: {
                    user_email: req.body.user_email,
                    user_password: req.body.user_password
                },
                 include: [{model: company_type, required: true},{model: userrole_type, required: true}]
            }).then(user => {
                console.log("User: ", JSON.stringify(user, null, 4));
                if(user == null) {
                    return res.json({
                        status: 404,
                        message: `User with user_id ${req.params.user_id} not found.`
                    })
                }
                return res.json({
                    status: 200,
                    data: user,
                    message: "User fetched successfully."
                })
            }).catch(err => {
                console.error('Unable to connect to the database:', err);
                return res.json({
                    status: 500,
                    data: err,
                    message: "User fetch failed."
                })
            });
        } catch (exception){
            console.log("An exception occured, please contact the administrator.", exception);
        }
    }
]
/** end **/


exports.fetchApplyedJobHistorybyId = [
    function (req,res,next){
        console.log(`Attempting to fetch a ApplyedjobHistory By job id ${req.params.id}`);
        try{
            Jobapply.findOne({
                where: {
                    id: req.params.id
                },
                 include: [
                {
                    model: Jobregister,
                     include:[{model: Company, required: false}],
                    required: false
                },
                {
                    model: Employer,
                    include:[{model: EmployeeHistory, required: false}],
                    required: false
                },
                ]
            }).then(user => {
                console.log("User: ", JSON.stringify(user, null, 4));
                if(user == null) {
                    return res.json({
                        status: 404,
                        message: `ApplyedjobHistory with Id ${req.params.user_id} not found.`
                    })
                }
                return res.json({
                    status: 200,
                    data: user,
                    message: "ApplyedjobHistory fetched successfully."
                })
            }).catch(err => {
                console.error('Unable to connect to the database:', err);
                return res.json({
                    status: 500,
                    data: err,
                    message: "User fetch failed."
                })
            });
        } catch (exception){
            console.log("An exception occured, please contact the administrator.", exception);
        }
    }
]

exports.fetchApplyedJobHistory = [
    function (req,res,next){
        console.log("Attempting to fetch ApplyedjobHistory gg.");
        try{
            Jobapply.findAll({  
                where:{
                    shortlist:'Notselected'
                }   ,           
                include: [
                {
                    model: Jobregister, attributes: ['job_title','Job_type','status'],
                     include:[{model: Company, required: false, attributes:['company_name']}],
                    required: false
                },
                {
                    model: Employer, attributes: ['emp_firstname','emp_lastname','emp_email'],
                    include:[{model: EmployeeHistory, required: false,attributes:['emp_job_title','phone_number','year_of_exp','emp_resume']}],
                    required: false
                },
                ]
         }).then(users => {
                console.log("All users:", JSON.stringify(users, null, 4));

                let parsedusers = JSON.parse(JSON.stringify(users));
                let finalUsers = [];

                for(let i = 0; i < parsedusers.length; i++){
                    if(parsedusers[i].job_register.status == "Active"){
                        finalUsers.push(parsedusers[i]);
                    }
                }


                if(!finalUsers.length){
                    return res.json({
                        status: 404,                        
                        message: "No Result found."
                    })    
                }
                return res.json({
                    status: 200,
                    data: finalUsers,
                    message: "ApplyJobHistory fetched successfully."
                })
            }).catch(err => {
                console.error('Unable to connect to the database:', err);
                return res.json({
                    status: 500,
                    data: err,
                    message: "Result fetching failed."
                })
            });
        } catch (exception){
            console.log("An exception occured, please contact the administrator.", exception);
        }
    }
]


/**** fetch not apply job histroy **/

exports.fetchExpiredApplyedJobHistory = [
    function (req,res,next){
        console.log("Attempting to fetch Expired ApplyedjobHistory gg.");
        try{
            Jobapply.findAll({  
                where:{
                    shortlist:'Notselected'
                }   ,           
                include: [
                {
                    model: Jobregister, attributes: ['job_title','Job_type','status'],
                     include:[{model: Company, required: false, attributes:['company_name']}],
                    required: false
                },
                {
                    model: Employer, attributes: ['emp_firstname','emp_lastname','emp_email'],
                    include:[{model: EmployeeHistory, required: false,attributes:['emp_job_title','phone_number','year_of_exp','emp_resume']}],
                    required: false
                },
                ]
         }).then(users => {
                console.log("All users:", JSON.stringify(users, null, 4));

                let parsedusers = JSON.parse(JSON.stringify(users));
                let finalUsers = [];

                for(let i = 0; i < parsedusers.length; i++){
                    if(parsedusers[i].job_register.status == "Deactive"){
                        finalUsers.push(parsedusers[i]);
                    }
                }


                if(!finalUsers.length){
                    return res.json({
                        status: 404,                        
                        message: "No Result found."
                    })    
                }
                return res.json({
                    status: 200,
                    data: finalUsers,
                    message: "ApplyJobHistory fetched successfully."
                })
            }).catch(err => {
                console.error('Unable to connect to the database:', err);
                return res.json({
                    status: 500,
                    data: err,
                    message: "Result fetching failed."
                })
            });
        } catch (exception){
            console.log("An exception occured, please contact the administrator.", exception);
        }
    }
]

/*** end **/


exports.fetchApplyedJobHistorySelected = [
    function (req,res,next){
        console.log("Attempting to fetch ApplyedjobHistory.");
        try{
            Jobapply.findAll({
                 where:{
                    shortlist: 'Selected'               
                },
                include: [
                {
                    model: Jobregister, attributes: ['job_title','Job_type'],
                     include:[{model: Company, required: false, attributes:['company_name']}],
                    required: false
                },
                {
                    model: Employer, attributes: ['emp_firstname','emp_lastname','emp_email'],
                    include:[{model: EmployeeHistory, required: false,attributes:['emp_job_title','phone_number','year_of_exp','emp_resume']}],
                    required: false
                },
                ]
         }).then(users => {
                console.log("All users:", JSON.stringify(users, null, 4));
                if(!users.length){
                    return res.json({
                        status: 404,                        
                        message: "No Result found."
                    })    
                }
                return res.json({
                    status: 200,
                    data: users,
                    message: "ApplyJobHistory fetched successfully."
                })
            }).catch(err => {
                console.error('Unable to connect to the database:', err);
                return res.json({
                    status: 500,
                    data: err,
                    message: "Result fetching failed."
                })
            });
        } catch (exception){
            console.log("An exception occured, please contact the administrator.", exception);
        }
    }
]


exports.fetchApplyedJobHistoryByfilter = [
    function (req,res,next){
        console.log("Attempting to fetch ApplyedjobHistory from Active filter.");
        try{
            Jobapply.findAll({
                where:{
                    job_id: req.body.job_id,
                    company_id: req.body.company_id,
                    shortlist:'Notselected'
                },
                include: [
                {
                    model: Jobregister, attributes: ['job_title','Job_type','status'],
                     include:[{model: Company, required: false, attributes:['company_name']}],
                    required: false
                },
                {
                    model: Employer, attributes: ['emp_firstname','emp_lastname','emp_email'],
                    include:[{model: EmployeeHistory, required: false,attributes:['emp_job_title','phone_number','year_of_exp']}],
                    required: false
                },
                ]
         }).then(users => {
                console.log("All users:", JSON.stringify(users, null, 4));


                let parsedusers = JSON.parse(JSON.stringify(users));
                let finalUsers = [];

                for(let i = 0; i < parsedusers.length; i++){
                    if(parsedusers[i].job_register.status == "Active"){
                        finalUsers.push(parsedusers[i]);
                    }
                }


                if(!users.length){
                    return res.json({
                        status: 404,                        
                        message: "No Result found."
                    })    
                }
                return res.json({
                    status: 200,
                    data: finalUsers,
                    message: "ApplyJobHistory fetched successfully."
                })
            }).catch(err => {
                console.error('Unable to connect to the database:', err);
                return res.json({
                    status: 500,
                    data: err,
                    message: "Result fetching failed."
                })
            });
        } catch (exception){
            console.log("An exception occured, please contact the administrator.", exception);
        }
    }
]


exports.fetchApplyedJobHistoryByInput = [
    function (req,res,next){
        console.log("Attempting to fetch ApplyedjobHistory from Input.");
        try{
            Jobapply.findAll({
                include: [
                    {
                    model: Jobregister,  
                    where: {
                    [Op.and]: [{
                        job_title:{
                            [Op.like]: `%${req.body.job_title}%`
                        }
                    },                    
                    {
                        company_id: req.body.company_id,
                    },
                    {
                        status:'Active'
                    }
                ]
                },
                 include:[{model: Company, required: false, attributes:['company_name']}],                  
                    required: true
                },
                {
                    model: Employer, attributes: ['emp_firstname','emp_lastname','emp_email'],
                    include:[{model: EmployeeHistory, required: false,attributes:['emp_job_title','phone_number','year_of_exp']}],
                    required: false
                },
                ]
         }).then(users => {
                console.log("All users:", JSON.stringify(users, null, 4));


                    let parsedusers = JSON.parse(JSON.stringify(users));
                    let finalUsers = [];

                    for(let i = 0; i < parsedusers.length; i++){
                        console.log("final data is",parsedusers[i].shortlist);
                        if(parsedusers[i].shortlist == 'Notselected'){
                            finalUsers.push(parsedusers[i]);
                        }
                    }


                if(!users.length){
                    return res.json({
                        status: 404,                        
                        message: "No Result found."
                    })    
                }
                return res.json({
                    status: 200,
                    data: finalUsers,
                    message: "ApplyJobHistory fetched successfully."
                })
            }).catch(err => {
                console.error('Unable to connect to the database:', err);
                return res.json({
                    status: 500,
                    data: err,
                    message: "Result fetching failed."
                })
            });
        } catch (exception){
            console.log("An exception occured, please contact the administrator.", exception);
        }
    }
]




exports.fetchExpiredApplyedJobHistoryByInput = [
    function (req,res,next){
        console.log("Attempting to fetch fetchExpiredApplyedJobHistoryByInput from Input.");
        try{
            Jobapply.findAll({
                include: [
                    {
                    model: Jobregister,  
                    where: {
                    [Op.and]: [{
                        job_title:{
                            [Op.like]: `%${req.body.job_title}%`
                        }
                    },                    
                    {
                        company_id: req.body.company_id,
                    },
                    {
                        status:'Deactive'
                    }
                ]
                },
                 include:[{model: Company, required: false, attributes:['company_name']}],                  
                    required: true
                },
                {
                    model: Employer, attributes: ['emp_firstname','emp_lastname','emp_email'],
                    include:[{model: EmployeeHistory, required: false,attributes:['emp_job_title','phone_number','year_of_exp']}],
                    required: false
                },
                ]
         }).then(users => {
                console.log("All users:", JSON.stringify(users, null, 4));


                    let parsedusers = JSON.parse(JSON.stringify(users));
                    let finalUsers = [];

                    for(let i = 0; i < parsedusers.length; i++){
                        console.log("final data is",parsedusers[i].shortlist);
                        if(parsedusers[i].shortlist == 'Notselected'){
                            finalUsers.push(parsedusers[i]);
                        }
                    }


                if(!users.length){
                    return res.json({
                        status: 404,                        
                        message: "No Result found."
                    })    
                }
                return res.json({
                    status: 200,
                    data: finalUsers,
                    message: "ApplyJobHistory fetched successfully."
                })
            }).catch(err => {
                console.error('Unable to connect to the database:', err);
                return res.json({
                    status: 500,
                    data: err,
                    message: "Result fetching failed."
                })
            });
        } catch (exception){
            console.log("An exception occured, please contact the administrator.", exception);
        }
    }
]

exports.fetchApplyedJobHistoryForExpiredByfilter = [
    function (req,res,next){
        console.log("Attempting to fetch ApplyedjobHistory from Expired filter.");
        try{
            Jobapply.findAll({
                where:{
                    job_id: req.body.job_id,
                    company_id: req.body.company_id,
                    shortlist:'Notselected'
                },
                include: [
                {
                    model: Jobregister, attributes: ['job_title','Job_type','status'],
                     include:[{model: Company, required: false, attributes:['company_name']}],
                    required: false
                },
                {
                    model: Employer, attributes: ['emp_firstname','emp_lastname','emp_email'],
                    include:[{model: EmployeeHistory, required: false,attributes:['emp_job_title','phone_number','year_of_exp']}],
                    required: false
                },
                ]
         }).then(users => {
                console.log("All users:", JSON.stringify(users, null, 4));


                let parsedusers = JSON.parse(JSON.stringify(users));
                let finalUsers = [];

                for(let i = 0; i < parsedusers.length; i++){
                    if(parsedusers[i].job_register.status == "Deactive"){
                        finalUsers.push(parsedusers[i]);
                    }
                }


                if(!users.length){
                    return res.json({
                        status: 404,                        
                        message: "No Result found."
                    })    
                }
                return res.json({
                    status: 200,
                    data: finalUsers,
                    message: "ApplyJobHistory fetched successfully."
                })
            }).catch(err => {
                console.error('Unable to connect to the database:', err);
                return res.json({
                    status: 500,
                    data: err,
                    message: "Result fetching failed."
                })
            });
        } catch (exception){
            console.log("An exception occured, please contact the administrator.", exception);
        }
    }
]

exports.fetchApplyedJobHistoryByCompany = [
    function (req,res,next){
        console.log("Attempting to fetch ApplyedjobHistory.");
        try{
            Jobregister.findAll({
                where:{                   
                    company_id: req.body.company_id
                },
                
         }).then(users => {
                console.log("All users:", JSON.stringify(users, null, 4));
                if(!users.length){
                    return res.json({
                        status: 404,                        
                        message: "No Result found."
                    })    
                }
                return res.json({
                    status: 200,
                    data: users,
                    message: "ApplyJobHistory fetched successfully."
                })
            }).catch(err => {
                console.error('Unable to connect to the database:', err);
                return res.json({
                    status: 500,
                    data: err,
                    message: "Result fetching failed."
                })
            });
        } catch (exception){
            console.log("An exception occured, please contact the administrator.", exception);
        }
    }
]



exports.createUser = [
    function (req, res, next){
        console.log("Attempting to save a User.");
        user_type.sync({ force: false }).then((result) => {
            console.log("Result of sync", result);
            user_type.create(
                req.body
            ).then(user => {
                console.log("User's auto-generated ID:", user.id);
                return res.json({
                    status: 200,
                    data: user,
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
        });
    }
]

exports.deleteUser = [
    function (req, res, next){
        console.log(`Attempting to destroy a User with user_id ${req.params.user_id}`);
        user_type.destroy({
            where: {
                user_id: req.params.user_id
            }
        }).then((result) => {
            if(result){
                console.log("The User was deleted.", result)
                return res.json({
                    status: 200,
                    data: result,
                    message: "User delete successful."
                })
            } else {
                console.log("User delete failed.", result)
                return res.json({
                    status: 404,
                    data: result,
                    message: "User delete failed, no record found to delete."
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

exports.updateJobApply = [
    function (req, res, next){
        console.log("Attempting to update JobApply section.",req.body.id);
        console.log("Request parameter is=>", req.body);
        let target_ids = req.body.id;
        delete req.body.id;
        Jobapply.update(req.body, {
            where: { 
                  [Op.or]: [              
                    {
                    id: target_ids,
                    }
                  ]
                }
        }).then((result) => {
            console.log("Result of update operation", result);
            console.log("Type of result of update opertation", typeof(result));
            if(result[0]){
                console.log("The JobApply was updated.", result)
                return res.json({
                    status: 200,
                    data: result,
                    message: "User update successful."
                })
            } else {
                console.log("The JobApply update failed.", result)
                return res.json({
                    status: 404,
                    data: result,
                    message: "JobApply update failed, no record found to update."
                })
            }
        }).catch(err => {
            console.error('Unable to connect to the database:', err);
            return res.json({
                status: 500,
                data: err,
                message: "JobApply update failed."
            })
        });
    }
]