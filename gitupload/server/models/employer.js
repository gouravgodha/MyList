const Sequelize = require('sequelize');

const connection = require('../config/configdb');
const sequelize = connection.connection;

// const FormType = require('./form_type');
// const Client = require('./client');
// const User = require('./user');

const Model = Sequelize.Model;
class Employer extends Model {}
Employer.init({    
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },   
    emp_firstname: {
        type: Sequelize.STRING(40),
        allowNull: false
    },
    emp_lastname: {
        type: Sequelize.STRING(100),
        allowNull: false
    },
    emp_email: {
        type: Sequelize.STRING(200),
        allowNull: false,
        unique: true
    },
    emp_pass: {
        type: Sequelize.STRING(100),
        allowNull: false,
    }, 
     status: {
        type: Sequelize.ENUM('Active','Deactive'),
        allowNull: false,
    },  
    created_date: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW
    },
    updated_date: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW
    }}, 
    {
        sequelize,
        modelName: 'employer'        
    }
);



class EmployeeHistory extends Model {};
EmployeeHistory.init({
    // attributes
      emp_history_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
     emp_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
          unique: true
    },
    emp_job_title: {
        type: Sequelize.STRING
    },
    company_name: {
        type: Sequelize.STRING
    },
    job_started_month: {
        type: Sequelize.INTEGER
    },
    job_started_year: {
        type: Sequelize.INTEGER
    },
    job_end_month: {
        type: Sequelize.INTEGER
    },
    job_end_year: {
        type: Sequelize.INTEGER
    },
     home_location: {
        type: Sequelize.STRING
    },
     preferred_classification: {
        type: Sequelize.STRING
    },
     sub_classification: {
        type: Sequelize.STRING
    },
     emp_resume: {
        type: Sequelize.STRING
    },
     cover_letter: {
        type: Sequelize.STRING
    },
    phone_number: {
        type: Sequelize.STRING
    },
     skill_set: {
        type: Sequelize.STRING
    },
     annual_salary: {
        type: Sequelize.STRING
    },
    year_of_exp: {
        type: Sequelize.INTEGER
    },
   
    created_date: {
        type: Sequelize.DATE,
        allowNull: false,
         defaultValue: Sequelize.NOW      
    },
    updated_date: {
        type: Sequelize.DATE,
        allowNull: false,
         defaultValue: Sequelize.NOW     
    }}, 
    {
        sequelize,
        modelName: 'employee_history'
        // options
    }
);



// // Customer.belongsTo(FormType, {foreignKey: 'customer_form_id'});
// // Customer.belongsTo(Client, {foreignKey: 'customer_company_id'});
// // Customer.belongsTo(User, {foreignKey: 'customer_user_id'});

// // module.exports = Customer;

// Customer.belongsTo(FormType, {foreignKey: 'customer_form_id'})
EmployeeHistory.belongsTo(Employer, {foreignKey: 'emp_id'});
 Employer.hasOne(EmployeeHistory, {foreignKey: 'emp_id'})


module.exports = {
employee: Employer  ,
employeeHistory: EmployeeHistory
}