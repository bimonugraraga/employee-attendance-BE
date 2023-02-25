const AdminAuthService = require('../../services/admin/authService')
class AdminAuthController {
  static login = async(req, res, next) => {
    try {
      let params = req.parameters
      params = params.permit("username", "password").value()
      let loggedIn = await AdminAuthService.login(params, next)
      if (loggedIn) {
        res.status(200).json(loggedIn)
      }
    } catch (error) {
      next(error)
    }
  }
}

module.exports = AdminAuthController