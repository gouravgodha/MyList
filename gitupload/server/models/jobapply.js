const Sequelize = require('sequelize');

const connection = require('../config/configdb');
const sequelize = connection.connection;

// const Client = require('./client');
// const UserRole = require('./user_role');

const Model = Sequelize.Model;

class JobApply extends Model {};
JobApply.init({
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
        // allowNull defaults to true
    },
     shortlist: {
        type: Sequelize.ENUM('Selected','Notselected')
    },  
     created_date: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW
        // allowNull defaults to true
    },
    updated_date: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW
        // allowNull defaults to true
    }}, 
    {
        sequelize,
        modelName: 'applied_jobs'        
});


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
    job_description: {
        type: Sequelize.STRING(500),
        allowNull: false
    },
    job_location: {
        type: Sequelize.STRING(200),
        allowNull: false
    },
    job_skill: {
        type: Sequelize.STRING(200),
        allowNull: false,
    }, 
    Job_type: {
        type:Sequelize.STRING(200),
        allowNull: false,
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


class Company extends Model {}
Company.init({
    // attributes
    company_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    bussiness_type_id: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false
    },
    company_name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    company_address: {
        type: Sequelize.STRING,
        allowNull: false
    },
    city: {
        type: Sequelize.STRING,
        allowNull: false
    },
     state: {
        type: Sequelize.STRING,
        allowNull: false
    },
    company_logo: {
        type: Sequelize.STRING,
        allowNull: false
    },
    phone_number: {
        type: Sequelize.STRING,
        allowNull: false
    },
    first_name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    last_name: {
        type: Sequelize.STRING,
        allowNull: false
    },
     status: {
        type: Sequelize.ENUM('Active','Inactive'),
        allowNull: false
    },
     Listed: {
        type: Sequelize.ENUM('Yes','No'),
        allowNull: false,
    }, 
      created_date: {
        type: Sequelize.DATE,
        allowNull: false        
    },
    updated_date: {
        type: Sequelize.DATE,
        allowNull: false        
    }}, 
    {
        sequelize,
        modelName: 'company_master'
        // options
});


// User.hasMany(Customer, { foreignKey: 'customer_user_id' });
// User.hasMany(FormType, { foreignKey: 'form_type_user_id' });
// User.hasMany(NotificationLog, { foreignKey: 'log_user_id' });

// User.belongsTo(UserRole, {foreignKey: 'user_role_id'});
// User.belongsTo(Client, {foreignKey: 'user_company_id'});
  
// module.exports = User;

JobApply.belongsTo(JobRegister, {foreignKey: 'job_id'});
JobRegister.hasMany(JobApply, {foreignKey: 'job_id'})
JobRegister.belongsTo(Company, {foreignKey: 'company_id'});
JobApply.belongsTo(Employer, {foreignKey: 'employee_id'});
Employer.hasOne(EmployeeHistory, {foreignKey: 'emp_id'});


JobRegister.hasMany(JobApply, {foreignKey: 'job_id'})
JobApply.belongsTo(JobRegister, {foreignKey: 'job_id'})
JobApply.belongsTo(Employer, {foreignKey: 'employee_id'});
JobApply.belongsTo(Company, {foreignKey: 'company_id'});
Employer.hasOne(EmployeeHistory, {foreignKey: 'emp_id'});


module.exports = {
  jobapply: JobApply,
  jobregister: JobRegister,
  employer: Employer,
  employeeHistory: EmployeeHistory,
  company: Company

}