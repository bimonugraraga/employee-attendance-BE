const EmployeeAuthService = require('../../services/employee/authService')
class EmployeeAuthController {
  static login = async(req, res, next) => {
    try {
      let params = req.parameters
      params = params.permit("username", "password").value()
      let loggedIn = await EmployeeAuthService.login(params, next)
      if (loggedIn) {
        res.status(200).json(loggedIn)
      }
    } catch (error) {
      next(error)
    }
  }

  static employeeAttendance = async(req, res, next) => {
    try {
      let params = req.parameters
      params = params.permit("picture").value()

      if (!params.picture) {
        throw {
          code: 400,
          message: "Invalid Input"
        }
      }
      params.employee = req.employee
      let created = await EmployeeAuthService.createAttendance(params, next)
      if (created) {
        res.status(201).json({
          message: "Success Create Attendance"
        })
      }
    } catch (error) {
      next(error)
    }
  }
}

module.exports = EmployeeAuthController