const Sequelize = require('sequelize');

const connection = require('../config/configdb');
const sequelize = connection.connection;
// console.log("Sequelize object", sequelize);
const Model = Sequelize.Model;
class Users extends Model {};
Users.init({
    // attributes
    user_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    first_name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    middle_name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    last_name: {
        type: Sequelize.STRING,
        allowNull: false        
    },
    email_id: {
        type: Sequelize.STRING,
        allowNull: false        
    },
    phone_number: {
        type: Sequelize.STRING,
        allowNull: false        
    }}, 
    {
        sequelize,
        modelName: 'users'
        // options
});
  
module.exports = { Users }