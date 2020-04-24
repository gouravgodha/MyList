const Sequelize = require('sequelize');

const connection = require('../config/configdb');
const sequelize = connection.connection;
// console.log("Sequelize object", sequelize);
const Model = Sequelize.Model;
class BusinessType extends Model {};
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
  
module.exports = { BusinessType }