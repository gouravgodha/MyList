const Sequelize = require('sequelize');

const connection = require('../config/configdb');
const sequelize = connection.connection;
// console.log("Sequelize object", sequelize);
const Model = Sequelize.Model;



class BusinessType extends Model {}
BusinessType.init({
    // attributes
      business_type_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    business_type: {
        type: Sequelize.STRING,
        allowNull: false
    },
    business_status: {
        type: Sequelize.ENUM('Active','Inactive'),
        allowNull: false
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
        modelName: 'business_types_master'
        // options
});
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



// BusinessType.hasOne(Company); // Will add userId to Task model
// Company.belongsTo(BusinessType); // Will also add userId to Task model
// BusinessType.belongsTo(Company, { as: 'Current',foreignKey: 'bussiness_type_d',constraints: false});

// Company.belongsTo(BusinessType);

// Company.belongsTo(BusinessType, {foreignKey: 'fk_company'});
// BusinessType.hasMany(Company);

Company.hasOne(BusinessType, {foreignKey: 'business_type_id'})
 BusinessType.hasOne(Company, {foreignKey: 'bussiness_type_id'})


 Company.hasMany(JobRegister, {foreignKey: 'company_id'})
 JobRegister.hasOne(Company, {foreignKey: 'company_id'})

// BusinessType.sync();
// Company.sync();
  
module.exports = { 
                   businessType: BusinessType,
                   company: Company,
                   jobRegister:JobRegister
                  };

