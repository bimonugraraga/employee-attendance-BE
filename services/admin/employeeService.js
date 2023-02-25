const {Employee, Attendance, sequelize} = require('../../models')
const { Op } = require('sequelize');
class AdminEmployeeService {
  static createEmployee = async(params, next) => {
    try {
      let created = await Employee.create(params)
      if (!created) {
        throw {
          code: 400,
          message: "Failed To Create Employee"
        }
      }

      return created
    } catch (error) {
      next(error)
    }
  }

  static updateEmployee = async(params, next) => {
    try {
      let targetEmployee = await Employee.findOne({
        where: {
          id: +params.employee_id
        }
      })

      if (!targetEmployee) {
        throw {
          code: 404,
          message: "Employee Not Found"
        }
      }

      let updated = Employee.update(params, {
        where: {
          id: params.employee_id
        }
      })
      if (updated[0] == 0) {
        throw {
          code: 404,
          message: "Failed To Update"
        }
      }

      return updated
    } catch (error) {
      next(error)
    }
  }

  static deleteEmployee = async(params, next) => {
    try {
      let targetEmployee = await Employee.findOne({
        where: {
          id: +params.employee_id
        }
      })

      if (!targetEmployee) {
        throw {
          code: 404,
          message: "Employee Not Found"
        }
      }

      let destroyed = Employee.destroy({
        where: {
          id: params.employee_id
        }
      })
      if (!destroyed) {
        throw {
          code: 404,
          message: "Failed To Delete"
        }
      }

      return destroyed
    } catch (error) {
      next(error)
    }
  }

  static getAllAttendance = async(params, next) => {
    try {
      let offset = null
      if (params.limit){
        offset = params.page * params.limit
      }
      let where = {}

      if (params.date_attendance) {
        where.date_attendance = params.date_attendance
      }
      
      let finded = await Attendance.findAndCountAll({
        where,
        include: [
          {
            model: Employee,
            attributes: ['id', 'username'],
            where: {
              username: {
                [Op.iLike]: `%${params.username}%`
              }
            }
          }
        ],
        distinct:true,
        limit : params.limit? params.limit: null,
        offset: offset,
        order:[[params.order_from, params.order_by]]
      })

      return finded
    } catch (error) {
      next(error)
    }
  }
}

module.exports = AdminEmployeeService