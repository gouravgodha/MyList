const Sequelize = require('sequelize');

const connection = require('../config/configdb');
const sequelize = connection.connection;

// const Client = require('./client');
// const UserRole = require('./user_role');

const Model = Sequelize.Model;

class JobBoard extends Model {};
JobBoard.init({
    // attributes
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
     description: {
        type: Sequelize.STRING,
        allowNull: false
    },
    image: {
        type: Sequelize.STRING,
        allowNull: false
    },
    button_name: {
        type: Sequelize.STRING,
        allowNull: false
    },
       status: {
        type: Sequelize.ENUM('Active','Inactive'),
        allowNull: false,
    }, 
     created_date: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW
        // allowNull defaults to true
    }}, 
    {
        sequelize,
        modelName: 'jobboard_section'        
});



// JobApply.belongsTo(JobRegister, {foreignKey: 'job_id'});
// JobRegister.hasMany(JobApply, {foreignKey: 'job_id'})
// JobRegister.belongsTo(Company, {foreignKey: 'company_id'});
// JobApply.belongsTo(Employer, {foreignKey: 'employee_id'});
// Employer.hasOne(EmployeeHistory, {foreignKey: 'emp_id'});

module.exports = {
  jobBoard: JobBoard,
}