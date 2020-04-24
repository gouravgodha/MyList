var async = require('async');
var path = require('path');
var multer = require('multer');

let Jobboard = require('../models/jobboard_model');
let Jobboard_section = Jobboard.jobBoard;

var moment = require('moment');
moment().format();

const { body,validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');


/*** for and and where conditoin **/
exports.fetchJobBoardSection = [
    function (req,res,next){
        console.log('body responce is!',req.body);
        try{
            Jobboard_section.findAll().then(section => {
                console.log("Section: ", JSON.stringify(section, null, 4));
                if(section == null) {
                    return res.json({
                        status: 404,
                        message: `Section with id ${req.params.id} not found.`
                    })
                }
                return res.json({
                    status: 200,
                    data: section,
                    message: "Section fetched successfully."
                })
            }).catch(err => {
                console.error('Unable to connect to the database:', err);
                return res.json({
                    status: 500,
                    data: err,
                    message: "Section fetch failed."
                })
            });
        } catch (exception){
            console.log("An exception occured, please contact the administrator.", exception);
        }
    }
]
/** end **/

exports.fetchJobBoardSectionById = [
    function (req,res,next){
        console.log('body responce is!',req.body);
        try{
            Jobboard_section.findOne({
                where: {
                    id: req.params.id
                }

            }).then(section => {
                console.log("Section: ", JSON.stringify(section, null, 4));
                if(section == null) {
                    return res.json({
                        status: 404,
                        message: `Section with id ${req.params.id} not found.`
                    })
                }
                return res.json({
                    status: 200,
                    data: section,
                    message: "Section fetched successfully."
                })
            }).catch(err => {
                console.error('Unable to connect to the database:', err);
                return res.json({
                    status: 500,
                    data: err,
                    message: "Section fetch failed."
                })
            });
        } catch (exception){
            console.log("An exception occured, please contact the administrator.", exception);
        }
    }
]



exports.CreateJobBoardSection = [
    function (req, res, next){
        console.log("Attempting to save a User.");
        Jobboard_section.sync({ force: false }).then((result) => {
            console.log("Result of sync", result);
            req.body.image = req.file.filename;
            Jobboard_section.create(
                req.body
            ).then(section => {
                console.log("section's auto-generated ID:", section.id);
                return res.json({
                    status: 200,
                    data: section,
                    message: "section created successfully."
                })
            }).catch(err => {
                console.error('Unable to connect to the database:', err);
                return res.json({
                    status: 500,
                    data: err,
                    message: "section creation failed."
                })
            });
        }).catch((error) => {
            console.log("An error was encountered during the synchronization", error);
        });
    }
]

exports.deleteJobBoardSection = [
    function (req, res, next){
        console.log(`Attempting to destroy a Section with id ${req.params.id}`);
        Jobboard_section.destroy({
            where: {
                id: req.params.id
            }
        }).then((result) => {
            if(result){
                console.log("The Section was deleted.", result)
                return res.json({
                    status: 200,
                    data: result,
                    message: "Section delete successful."
                })
            } else {
                console.log("Section delete failed.", result)
                return res.json({
                    status: 404,
                    data: result,
                    message: "Section delete failed, no record found to delete."
                })
            }            
        }).catch(err => {
            console.error('Unable to connect to the database:', err);
            return res.json({
                status: 500,
                data: err,
                message: "Section deletion failed."
            })
        }); 
               
    }
]

exports.UpdateJobBoardSection = [
    function (req, res, next){
       //  req.body.image = req.file.filename;
        console.log("Attempting to update Section.",req.body.id);
        
        Jobboard_section.update(req.body, {
            where: {
                id: req.body.id
            }
        }).then((result) => {
            console.log("Result of update operation", result);
            console.log("Type of result of update opertation", typeof(result));
            if(result[0]){
                console.log("The Section was updated.", result)
                return res.json({
                    status: 200,
                    data: result,
                    message: "Section update successful."
                })
            } else {
                console.log("The Section update failed.", result)
                return res.json({
                    status: 404,
                    data: result,
                    message: "Section update failed, no record found to update."
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