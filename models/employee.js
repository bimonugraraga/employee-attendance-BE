'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Employee extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Employee.hasMany(models.Attendance, {foreignKey:"employee_id"})
    }
  }
  Employee.init({
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique:{
        args: true,
        msg: "Username Has Been Taken"
      },
      validate: {
        notNull: {
          msg: "Username is Required"
        },
        notEmpty: {
          msg: "Username is Required"
        },
        isUnique: async (value) => {
          let target = await Employee.findOne({
            where: {
              username: value
            }
          })
          if (target){
            throw new Error('Username Has Been Taken');
          }
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Password is Required"
        },
        notEmpty: {
          msg: "Password is Required"
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Employee',
  });
  return Employee;
};