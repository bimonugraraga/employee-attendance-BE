'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Attendance extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Attendance.belongsTo(models.Employee, {foreignKey:"employee_id"})
    }
  }
  Attendance.init({
    employee_id: DataTypes.INTEGER,
    picture: DataTypes.TEXT,
    date_attendance: DataTypes.DATEONLY,
    time_attendance: DataTypes.TIME
  }, {
    sequelize,
    modelName: 'Attendance',
  });
  return Attendance;
};