const AdminEmployeeService = require('../../services/admin/employeeService')
class AdminEmployeeController {
  static createNewEmployee = async(req, res, next) => {
    try {
      let params = req.parameters
      params = params.permit("username", "password").value()
      let created = await AdminEmployeeService.createEmployee(params, next)
      if (created) {
        res.status(201).json({
          message: "Success Create Employee"
        })
      }

    } catch (error) {
      next(error)
    }
  }

  static updateEmployee = async(req, res, next) => {
    try {
      let {employee_id} = req.params
      let params = req.parameters
      params = params.permit("password").value()
      if (!params.password) {
        throw {
          code: 400,
          message: "Invalid Input"
        }
      }
      params.employee_id = +employee_id

      let updated = await AdminEmployeeService.updateEmployee(params, next)
      if (updated) {
        res.status(200).json({
          message: "Success Update Employee"
        })
      }
    } catch (error) {
      next(error)
    }
  }

  static deleteEmployee = async(req, res, next) => {
    try {
      let {employee_id} = req.params
      let params = {}
      params.employee_id = +employee_id

      let deleted = await AdminEmployeeService.deleteEmployee(params, next)
      if (deleted) {
        res.status(200).json({
          message: "Success Delete Employee"
        })
      }
    } catch (error) {
      next(error)
    }
  }

  static getAllAttendance = async(req, res, next) => {
    try {
      let {date_attendance, username, order_from, order_by, page, limit} = req.query
      let params = {
        date_attendance,
        username: !username? "": username,
        order_from: !order_from? "id": order_from,
        order_by: !order_by? "DESC": order_by,
        page: !page? 0: +page - 1,
        limit: !limit? 10: +limit,
      }

      let all = await AdminEmployeeService.getAllAttendance(params, next)

      if (all) {
        res.status(200).json(all)
      }
    } catch (error) {
      next(error)
    }
  }

  static getAllEmployee = async(req, res, next) => {
    try {
      let {username, order_from, order_by, page, limit} = req.query
      let params = {
        username: !username? "": username,
        order_from: !order_from? "id": order_from,
        order_by: !order_by? "DESC": order_by,
        page: !page? 0: +page - 1,
        limit: !limit? 10: +limit,
      }

      let all = await AdminEmployeeService.getAllEmployee(params, next)
      if (all) {
        res.status(200).json(all)
      }
    } catch (error) {
      next(error)
    }
  }

  static getOneAttendance = async(req, res, next) => {
    try {
      let {att_id} = req.params
      let params = {
        att_id: +att_id
      }
      let finded = await AdminEmployeeService.getOneAttendance(params, next)
      if (finded) {
        res.status(200).json(finded)
      }
    } catch (error) {
      next(error)
    }
  }
}

module.exports = AdminEmployeeController