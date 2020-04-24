const express = require("express");
var path = require('path');
var bodyParser = require('body-parser'); 
var session = require('express-session');
var cors = require('cors')
var connection_db = require('./config/configdb.js');
var config = require("./config.json");
var Sequelize = require('sequelize');
var multer  = require('multer');
var admin = require('./routes/admin');
var businesstype_route = require('./routes/BusinessType');
var formtype_route = require('./routes/FormType');
var companytype_route = require('./routes/CompanyType');
var user_route = require('./routes/user');
var customer_route = require('./routes/customer');
var employer_route = require('./routes/employer');
var joblist_route = require('./routes/joblist');
var userrole_route = require('./routes/userRole');
var catsubcat_route = require('./routes/category_sucatgory');
var salary_range_route = require('./routes/salary_range');
var jobapply_route = require('./routes/jobapply');
var jobboard_section = require('./routes/jobboard_section');
var admin = require('./routes/admin');

const app = express();
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(function(req, res, next) {
    // console.log("1");
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(session({ secret: config.secret, resave: false, saveUninitialized: true }));
// console.log("The directory name is ", __dirname);
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.static(path.join(__dirname, 'files')))

app.use(express.static(path.join(__dirname, 'uploads')))
/*** FOR FILE UPLAOD **/
// app.post("createcompany", multer({dest: "./uploads/"}).array("uploads", 12), function(req, res) {
//    cosole.log("File upload processing...");
//     res.send(req.files);
// });
/** END **/

app.use(function(req, res, next) {
    // res.send("Resource not found");
    let headers = req.headers;
    // console.log("Headers", headers);
    // console.log("you key is "+headers.authentication_token);
    console.log("Req", req.method);
    if(req.method == 'GET' || headers.authentication_token=="eviden")
        next();
    else{
        return res.json({
                    status: 404,
                   // data: responce,
                    message: "Token is invalid!"
                })
    }
    // next();
});




app.use('/admin', admin);
app.use('/businessroute',businesstype_route);
app.use('/formtyperoute',formtype_route);
app.use('/companyroute',companytype_route)
app.use('/user',user_route)
app.use('/customer',customer_route)
app.use('/employer',employer_route)
app.use('/joblist',joblist_route)
app.use('/user-role',userrole_route)
app.use('/applyedjob',jobapply_route)
app.use('/salary-range',salary_range_route)
app.use('/category',catsubcat_route)
app.use('/jobboard_section',jobboard_section)

app.get("/", (req, res) => {
    res.redirect('/admin/');
})

app.use(function(req, res, next) {
    // res.send("Resource not found");
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

app.use(function(err, req, res, next) {
    // Set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // Render the error page
    res.status(err.status || 500);
    res.send('<h3 style:"text-align: center">Nothing to show here...</h3>');
});

module.exports = app;