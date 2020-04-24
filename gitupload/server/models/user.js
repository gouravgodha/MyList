const Sequelize = require('sequelize');

const connection = require('../config/configdb');
const sequelize = connection.connection;

// const Client = require('./client');
// const UserRole = require('./user_role');

const Model = Sequelize.Model;

class User extends Model {};
User.init({
    // attributes
    user_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    user_company_id: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    user_role_id: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    user_job_title: {
        type: Sequelize.STRING(30),
        allowNull: false        
    },
    user_first_name: {
        type: Sequelize.STRING(50),
        allowNull: false        
    },
    user_last_name: {
        type: Sequelize.STRING(50),
        allowNull: false        
    },
    user_email: {
        type: Sequelize.STRING(50),
        allowNull: false
    },
    user_phone_number: {
        type: Sequelize.STRING(20),
        allowNull: false
    },
    user_password: {
        type: Sequelize.STRING,
        allowNull: false        
    },
    user_status: {
        type: Sequelize.ENUM('Active','Inactive'),
        allowNull: false,
        validate: {
            isIn: [
                ['Active', 'Inactive']
            ],
        }
    },
    user_address: {
        type: Sequelize.STRING,
        allowNull: false        
    },
    user_city: {
        type: Sequelize.STRING,
        allowNull: false
    },
    user_state: {
        type: Sequelize.STRING,
        allowNull: false
    },
    user_country: {
        type: Sequelize.STRING,
        allowNull: false
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
        modelName: 'users_main'        
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

class UserRole extends Model {};
UserRole.init({
    // attributes
    user_role_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    user_role: {
        type: Sequelize.STRING(25),
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
        modelName: 'user_roles_master'
});


// User.hasMany(Customer, { foreignKey: 'customer_user_id' });
// User.hasMany(FormType, { foreignKey: 'form_type_user_id' });
// User.hasMany(NotificationLog, { foreignKey: 'log_user_id' });

// User.belongsTo(UserRole, {foreignKey: 'user_role_id'});
// User.belongsTo(Client, {foreignKey: 'user_company_id'});
  
// module.exports = User;

User.belongsTo(Company, {foreignKey: 'user_company_id'})
User.belongsTo(UserRole, {foreignKey: 'user_role_id'});
 Company.hasMany(User, {foreignKey: 'user_company_id'})

module.exports = {
   user: User,
   company:  Company,
  userRole:UserRole

}