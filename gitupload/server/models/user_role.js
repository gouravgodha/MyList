const Sequelize = require('sequelize');

const connection = require('../config/configdb');
const sequelize = connection.connection;

const User = require('./user');

const Model = Sequelize.Model;
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

// UserRole.hasMany(User, { foreignKey: 'user_role_id' })
  
module.exports = UserRole;