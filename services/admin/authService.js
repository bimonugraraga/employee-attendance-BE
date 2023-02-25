const {Admin} = require('../../models')
const {signToken} = require('../../helpers/jwtHandler')
class AdminAuthService {
  static login = async(params, next) => {
    try {
      let targetAdmin = await Admin.findOne({
        where: {
          username: params.username,
        }
      })

      if (!targetAdmin) {
        throw {
          code: 400,
          message: "Invalid Username Or Password"
        }
      }

      if (targetAdmin.password != params.password) {
        throw {
          code: 400,
          message: "Invalid Username Or Password"
        }
      }

      let payload = {
        id: targetAdmin.id,
        username: targetAdmin.username
      }

      let jwt = signToken(payload)

      payload.access_token = jwt

      return payload
    } catch (error) {
      next(error)
    }
  }
}

module.exports = AdminAuthService