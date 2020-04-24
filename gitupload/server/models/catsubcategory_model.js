const Sequelize = require('sequelize');

const connection = require('../config/configdb');
const sequelize = connection.connection;

// const Client = require('./client');
// const UserRole = require('./user_role');

const Model = Sequelize.Model;

class Category extends Model {};
Category.init({
    // attributes
    
    industry_id: {
        type: Sequelize.INTEGER,
         primaryKey: true,
        allowNull: false,
        validate: { len: 1 }
    },
    title: {
        type: Sequelize.STRING(80),
        allowNull: false,
        validate: { len: 1 }      
    }}, 
    {
        sequelize,
        modelName: 'industry'        
});


class SubCategory extends Model {};
SubCategory.init({
    // attributes
    id: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    industry_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        validate: { len: 1 }
    },
    title: {
        type: Sequelize.STRING(80),
        allowNull: false,
        validate: { len: 1 }      
    }}, 
    {
        sequelize,
        modelName: 'sub_industry'        
});

// CategorySubcategory.hasMany(CategorySubcategory, { as: 'parent', foreignKey: 'parent_id' });

SubCategory.belongsTo(Category, {foreignKey: 'industry_id'});
Category.hasMany(SubCategory, {foreignKey: 'industry_id'})

module.exports = {
   category: Category,
   subcategory: SubCategory
}