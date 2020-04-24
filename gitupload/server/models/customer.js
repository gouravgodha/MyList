const Sequelize = require('sequelize');

const connection = require('../config/configdb');
const sequelize = connection.connection;

// const FormType = require('./form_type');
// const Client = require('./client');
// const User = require('./user');

const Model = Sequelize.Model;
class Customer extends Model {}
Customer.init({    
    customer_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    customer_form_id: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    customer_company_id: {
        type: Sequelize.INTEGER,
        allowNull: true
    },
    customer_user_id: {
        type: Sequelize.INTEGER,
        allowNull: true,        
    },
    customer_first_name: {
        type: Sequelize.STRING(40),
        allowNull: false
    },
    customer_last_name: {
        type: Sequelize.STRING(40),
        allowNull: false
    },
    customer_email: {
        type: Sequelize.STRING(40),
        allowNull: false,
        unique: true
    },
    customer_phone: {
        type: Sequelize.STRING(30),
        allowNull: false,
    },
    // customer_document_identifier: {
    //     type: Sequelize.STRING,
    //     allowNull: false
    // },
    customer_policy_number: {
        type: Sequelize.STRING,
        allowNull: true
    },
    customer_country: {
        type: Sequelize.STRING(40),
        allowNull: false
    },
    customer_state: {
        type: Sequelize.STRING(40),
        allowNull: false
    },
    customer_city: {
        type: Sequelize.STRING(55),
        allowNull: false
    },
    customer_address: {
        type: Sequelize.STRING,
        allowNull: false
    },    
    customer_status: {
        type: Sequelize.ENUM('Active','Inactive'),
        allowNull: false,
        validate: {
            isIn: [
                ['Active', 'Inactive']
            ],
        }
    },
    customer_signature_image: {
        type: Sequelize.STRING,
        allowNull: true
    },
    customer_ip_address: {
        type: Sequelize.STRING(40),
        allowNull: true
    },
    customer_location: {
        type: Sequelize.STRING,
        allowNull: true
    },
    customer_document_status: {
        type: Sequelize.STRING,
        allowNull: true
    },
    // customer_document_filename: {
    //     type: Sequelize.STRING,
    //     allowNull: false
    // },
    customer_video_filename: {
        type: Sequelize.STRING,
        allowNull: true
    },
    customer_document_signed_date_time: {
        type: Sequelize.DATE,
        allowNull: true
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
        modelName: 'customers_main'        
    }
);



class FormType extends Model {};
FormType.init({
    // attributes
      form_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
     form_company_id: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    form_title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    form_statement: {
        type: Sequelize.STRING,
        allowNull: false
    },
    form_video_duration: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    form_status: {
        type: Sequelize.ENUM('Active','Inactive'),
        allowNull: false
    },
      customer_document_filename: {
        type: Sequelize.STRING,
        allowNull: false
    },
    form_user_id: {
        type: Sequelize.INTEGER,
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
        modelName: 'form_types_master'
        // options
});



// Customer.belongsTo(FormType, {foreignKey: 'customer_form_id'});
// Customer.belongsTo(Client, {foreignKey: 'customer_company_id'});
// Customer.belongsTo(User, {foreignKey: 'customer_user_id'});

// module.exports = Customer;

Customer.belongsTo(FormType, {foreignKey: 'customer_form_id'})
// FormType.belongsTo(Customer, {foreignKey: 'form_id'});
 FormType.hasMany(Customer, {foreignKey: 'customer_form_id'})


module.exports = {
   formType: FormType,
   customer:  Customer
  
}