var async = require('async');
var path = require('path');
var multer = require('multer');

let UserRole = require('../models/user_role');

var moment = require('moment');
moment().format();

const { body,validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');

exports.fetchUserRole = [
    function (req,res,next){
        console.log("Attempting to fetch User Role.");
        try{
            UserRole.findOne({
                where: {
                    user_role_id: req.params.user_role_id
                }
            }).then(user_role => {
                console.log("All users:", JSON.stringify(user_role, null, 4));
                if(user_role == null){
                    return res.json({
                        status: 404,                        
                        message: "User Role not found."
                    })    
                }
                return res.json({
                    status: 200,
                    data: user_role,
                    message: "User fetched successfully."
                })
            }).catch(err => {
                console.error('Unable to connect to the database:', err);
                return res.json({
                    status: 500,
                    data: err,
                    message: "User Role fetch failed."
                })
            });
        } catch (exception){
            console.log("An exception occured, please contact the administrator.", exception);
        }
    }
]

exports.fetchUserRoles = [
    function (req,res,next){
        console.log("Attempting to fetch User Roles.");
        try{
            UserRole.findAll().then(user_roles => {
                console.log("All users:", JSON.stringify(user_roles, null, 4));
                if(!user_roles.length){
                    return res.json({
                        status: 404,                        
                        message: "User Roles not found."
                    })    
                }
                return res.json({
                    status: 200,
                    data: user_roles,
                    message: "User Roles fetched successfully."
                })
            }).catch(err => {
                console.error('Unable to connect to the database:', err);
                return res.json({
                    status: 500,
                    data: err,
                    message: "User Roles fetch failed."
                })
            });;
        } catch (exception){
            console.log("An exception occured, please contact the administrator.", exception);
        }
    }
]

exports.createUserRole = [
    function (req, res, next){
        console.log("Attempting to save User Role.");
        UserRole.sync({ force: false }).then((result) => {
            console.log("Result of sync", result);
            UserRole.create(
                req.body
            ).then(user_role => {
                console.log("New User Role's auto-generated ID:", user_role.user_role_id);
                return res.json({
                    status: 200,
                    data: user_role,
                    message: "User Role created successfully."
                })
            }).catch(err => {
                console.error('Unable to connect to the database:', err);
                return res.json({
                    status: 500,
                    data: err,
                    message: "User Role creation failed."
                })
            });    
        }).catch((error) => {
            console.log("An error was encountered during the synchronization", error);
        })        
    }
]

exports.deleteUserRole = [
    function (req, res, next){
        console.log("Attempting to destroy User Role.");
        UserRole.destroy({
            where: {
                user_role_id: req.params.user_role_id
            }
        }).then((result) => {
            if(result) {
                console.log("The User Role was deleted.", result)
                return res.json({
                    status: 200,                    
                    message: "User Role deletion successful."
                })
            } else {
                console.log("The User Role wasn't deleted.", result)
                return res.json({
                    status: 404,
                    message: "User Role deletion unsuccessful, no record found to delete."
                })
            }
        }).catch(err => {
            console.error('Unable to connect to the database:', err);
            return res.json({
                status: 500,
                data: err,
                message: "User Role deletion failed."
            })
        });
    }
]

exports.updateUserRole = [
    function (req, res, next){
        console.log("Attempting to update User Role", req.body);
        
        UserRole.update(req.body, {
            where: {
                user_role_id: req.body.user_role_id
            }
        }).then((result) => {
            console.log("Result of update opertation", result);
            console.log("Type of result of update opertation", typeof(result));
            if(result[0]){
                console.log("It has been done.", result)
                return res.json({
                    status: 200,                    
                    message: "User Role update successful."
                })
            } else {
                console.log("It was not done.", result)
                return res.json({
                    status: 404,                    
                    message: "User Role update unsuccessful, no record found to update."
                })
            }
        }).catch(err => {
            console.error('Unable to connect to the database:', err);
            return res.json({
                status: 500,
                data: err,
                message: "User Role update failed."
            })
        });
    }
]