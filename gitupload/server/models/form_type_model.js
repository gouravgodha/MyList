const Sequelize = require('sequelize');

const connection = require('../config/configdb');
const sequelize = connection.connection;
// console.log("Sequelize object", sequelize);
const Model = Sequelize.Model;
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
    form_user_id: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
      customer_document_filename: {
        type: Sequelize.STRING,
        allowNull: false
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
        modelName: 'form_types_master'
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


FormType.belongsTo(Company, {foreignKey: 'form_company_id'})
// User.belongsTo(UserRole, {foreignKey: 'user_role_id'});
 Company.hasMany(FormType, {foreignKey: 'form_company_id'})

  
// module.exports = { FormType }

module.exports = {
   formType: FormType,
   company:  Company
  
}