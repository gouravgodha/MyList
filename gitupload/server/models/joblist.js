const Sequelize = require('sequelize');

const connection = require('../config/configdb');
const sequelize = connection.connection;

// const FormType = require('./form_type');
// const Client = require('./client');
// const User = require('./user');

const Model = Sequelize.Model;
class JobRegister extends Model {}
JobRegister.init({    
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },   
    job_title: {
        type: Sequelize.STRING(250),
        allowNull: false
    },

     job_summary: {
        type: Sequelize.STRING(250),
        allowNull: false
    },
     application_sent: {
        type: Sequelize.STRING(100),
        allowNull: false
    },
     internal_refrence: {
        type: Sequelize.STRING(100),
        allowNull: false
    },

    job_description: {
        type: Sequelize.STRING(500),
        allowNull: false
    },
    job_location: {
        type: Sequelize.STRING(200),
        allowNull: false
    },
    // job_skill: {
    //     type: Sequelize.STRING(200),
    //     allowNull: false,
    // }, 
    Job_type: {
        type:Sequelize.STRING(200),
        allowNull: false,
    },
    industry: {
        type:Sequelize.INTEGER,
        allowNull: false,
    },
    industry_subcategory: {
        type:Sequelize.INTEGER,
        allowNull: false,
    },
    salary_type: {
        type:Sequelize.STRING(100),
        allowNull: false,
    },
    salary_range_minimum: {
        type:Sequelize.STRING(100),
        allowNull: false,
    },
    salary_range_maximum: {
        type:Sequelize.STRING(100),
        allowNull: false,
    },
    membership: {
        type: Sequelize.ENUM('Free','Boost','Double Boost')
    }, 
    company_id: {
        type:Sequelize.INTEGER,
        allowNull: false,
    }, 
    status: {
        type: Sequelize.ENUM('Active','Deactive'),
        allowNull: false,
    }, 
    hide_salary: {
        type: Sequelize.ENUM('Yes','No'),
        allowNull: false,
    }, 
    draft: {
        type: Sequelize.ENUM('yes','no')
    },     
    created_date: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW
    }}, 
    {
        sequelize,
        modelName: 'job_register'        
    }
);


class Company extends Model {}
Company.init({
    // attributes
    company_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },  
    company_logo: {
        type: Sequelize.STRING,
        allowNull: false
    },  
    company_name: {
        type: Sequelize.STRING,
        allowNull: false
    }}, 
    {
        sequelize,
        modelName: 'company_master'
        // options
});




class AppliedJobs extends Model {};
AppliedJobs.init({
    // attributes
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
     job_id: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    employee_id: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    company_id: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    job_applied_date: {
        type: Sequelize.DATE,
        allowNull: false,
         defaultValue: Sequelize.NOW      
    },
    shortlist: {
        type: Sequelize.ENUM('Selected','Notselected')
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
        modelName: 'applied_jobs'
        // options
    }
);



// // Customer.belongsTo(FormType, {foreignKey: 'customer_form_id'});
// // Customer.belongsTo(Client, {foreignKey: 'customer_company_id'});
// // Customer.belongsTo(User, {foreignKey: 'customer_user_id'});

// // module.exports = Customer;

// Customer.belongsTo(FormType, {foreignKey: 'customer_form_id'})
AppliedJobs.belongsTo(JobRegister, {foreignKey: 'job_id'});
 JobRegister.hasMany(AppliedJobs, {foreignKey: 'job_id'})


JobRegister.belongsTo(Company, {foreignKey: 'company_id'});
 Company.hasMany(JobRegister, {foreignKey: 'company_id'})


module.exports = {
appliedJobs: AppliedJobs,
jobRegister: JobRegister,
company:Company
}