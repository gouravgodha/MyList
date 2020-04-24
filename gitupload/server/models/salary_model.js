const Sequelize = require('sequelize');

const connection = require('../config/configdb');
const sequelize = connection.connection;

// const Client = require('./client');
// const UserRole = require('./user_role');

const Model = Sequelize.Model;

class SalaryRange extends Model {};
SalaryRange.init({
    // attributes
    
    id: {
        type: Sequelize.INTEGER,
         primaryKey: true,
        allowNull: false,
        validate: { len: 1 }
    },
     salary_range_from: {
        type: Sequelize.INTEGER,        
        allowNull: false,
        validate: { len: 1 }
    },
     salary_range_to: {
        type: Sequelize.INTEGER,        
        allowNull: false,
        validate: { len: 1 }
    },
    salary_type: {
        type: Sequelize.ENUM('regular','hourly'),
        allowNull: false
    },
    created_date: {
        type: Sequelize.DATE,
        allowNull: false        
    }}, 
    {
        sequelize,
        modelName: 'salary_range'        
});




// CategorySubcategory.hasMany(CategorySubcategory, { as: 'parent', foreignKey: 'parent_id' });

// SubCategory.belongsTo(Category, {foreignKey: 'industry_id'});
// Category.hasMany(SubCategory, {foreignKey: 'industry_id'})

module.exports = {
   salaryrange: SalaryRange
}