var async = require('async');
var path = require('path');
var multer = require('multer');

let Category = require('../models/catsubcategory_model');
let category = Category.category;
let subcategory = Category.subcategory;


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
                }
                 //include: [{model: company_type, required: true},{model: userrole_type, required: true}]
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


exports.fetchSubCategory = [
    function (req,res,next){
        console.log(`Attempting to fetch a Su category with  ${req.params.industry_id}`);
        try{
            subcategory.findAll({
                where: {
                    industry_id: req.params.industry_id
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



exports.fetchSubCatbyid = [
    function (req,res,next){
        console.log(`Attempting to fetch a Sub category by id with  ${req.params.industry_id}`);
        try{
            subcategory.findAll({
                where: {
                    industry_id: req.params.industry_id
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



exports.fetchCategorytree = [
    function (req,res,next){
        console.log("Attempting to fetch all Categories.");
        try{
            category.findAll().then(category => {
                console.log("All category:", JSON.stringify(category, null, 4));
                if(!category.length){
                    return res.json({
                        status: 404,                        
                        message: "Category not found."
                    })    
                }
                return res.status(200).json({
                    status: 200,
                    data: category,
                    message: "Category fetched successfully."
                })
            }).catch(err => {
                console.error('Unable to connect to the database:', err);
                return res.status(500).json({
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

exports.createCategory = [
    function (req, res, next){
        console.log("Attempting to save a Category.");
        categorysubcategory.sync({ force: false }).then((result) => {
            console.log("Result of sync", result);
            categorysubcategory.create(
                req.body
            ).then(category => {
                console.log("Category's auto-generated ID:", category.id);
                return res.status(201).json({
                    status: 200,
                    data: category,
                    message: "Category created successfully."
                })
            }).catch(err => {
                console.error('Unable to connect to the database:', err);
                return res.status(500).json({
                    status: 500,
                    data: err,
                    message: "Category creation failed."
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

exports.updateCategory = [
    function (req, res, next){
        console.log("Attempting to update Category.",req.body.id);
        
        categorysubcategory.update(
            req.body, {
            where: {
                id: req.body.id               
            }
        }).then((result) => {
            console.log("Result of update operation", result);
            console.log("Type of result of update opertation", typeof(result));
            if(result[0]){
                console.log("The Category was updated.", result)
                return res.json({
                    status: 200,
                    data: result,
                    message: "Category update successful."
                })
            } else {
                console.log("The Category update failed.", result)
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