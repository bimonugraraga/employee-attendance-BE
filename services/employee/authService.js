const {Employee, Attendance} = require('../../models')
const {signToken} = require('../../helpers/jwtHandler')
class EmployeeAuthService {
  static login = async(params, next) => {
    try {
      let targetEmployee = await Employee.findOne({
        where: {
          username: params.username,
        }
      })

      if (!targetEmployee) {
        throw {
          code: 400,
          message: "Invalid Username Or Password"
        }
      }

      if (targetEmployee.password != params.password) {
        throw {
          code: 400,
          message: "Invalid Username Or Password"
        }
      }

      let payload = {
        id: targetEmployee.id,
        username: targetEmployee.username,
        role: "employee"
      }

      let jwt = signToken(payload)

      payload.access_token = jwt

      return payload
    } catch (error) {
      next(error)
    }
  }

  static createAttendance = async(params, next) => {
    try {
      let currentDate= new Date()
      let seconds = currentDate.getSeconds();
      let minutes = currentDate.getMinutes();
      let hour = currentDate.getHours();
      let created = await Attendance.create({
        employee_id: params.employee.id,
        picture: params.picture,
        date_attendance: currentDate,
        time_attendance: `${hour}:${minutes}:${seconds}`
      })
      if (!created) {
        throw {
          code: 400,
          message: "Failed To Create Attendance"
        }
      }

      return created
    } catch (error) {
      next(error)
    }
  }
}

module.exports = EmployeeAuthService