var async = require('async');
var path = require('path');
var multer = require('multer');

let User = require('../models/user');
let company_type = User.company;
let user_type = User.user;
let userrole_type = User.userRole;

var moment = require('moment');
moment().format();

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


exports.fetchUser = [
    function (req,res,next){
        console.log(`Attempting to fetch a specific User with user_id ${req.params.user_id}`);
        try{
            user_type.findOne({
                where: {
                    user_id: req.params.user_id
                }
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

exports.fetchUsers = [
    function (req,res,next){
        console.log("Attempting to fetch all Users.");
        try{
            user_type.findAll({ include: [{model: company_type, required: true},{model: userrole_type, required: true}]}).then(users => {
                console.log("All users:", JSON.stringify(users, null, 4));
                if(!users.length){
                    return res.json({
                        status: 404,                        
                        message: "Users not found."
                    })    
                }
                return res.json({
                    status: 200,
                    data: users,
                    message: "Users fetched successfully."
                })
            }).catch(err => {
                console.error('Unable to connect to the database:', err);
                return res.json({
                    status: 500,
                    data: err,
                    message: "Users fetching failed."
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

exports.updateUser = [
    function (req, res, next){
        console.log("Attempting to update User.",req.body.user_id);
        
        user_type.update(req.body, {
            where: {
                user_id: req.body.user_id
            }
        }).then((result) => {
            console.log("Result of update operation", result);
            console.log("Type of result of update opertation", typeof(result));
            if(result[0]){
                console.log("The User was updated.", result)
                return res.json({
                    status: 200,
                    data: result,
                    message: "User update successful."
                })
            } else {
                console.log("The User update failed.", result)
                return res.json({
                    status: 404,
                    data: result,
                    message: "User update failed, no record found to update."
                })
            }
        }).catch(err => {
            console.error('Unable to connect to the database:', err);
            return res.json({
                status: 500,
                data: err,
                message: "User update failed."
            })
        });
    }
]