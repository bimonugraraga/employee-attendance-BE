const { Admin, Employee } = require('../models')
const { verifyToken } = require('../helpers/jwtHandler')
async function employeeAuthn (req,res, next) {
  try {
    if (!req.headers.authorization){
      throw {
        code: 401,
        message: "Invalid Access Token"
      }
    }

    let [type, access_token] = req.headers.authorization.split(' ');
    if(!type || !access_token){
      throw {
        code: 401,
        message: "Invalid Access Token"
      }
    }
    if( type.toLowerCase() != 'bearer' ){
      throw {
        code: 401,
        message: "Invalid Access Token"
      }
    }
    let payload = verifyToken(access_token)
    if (!payload){
      throw {
        code: 401,
        message: "Invalid Access Token"
      }
    }

    let targetEmployee = await Employee.findOne({
      where: {
        id: payload.id,
        username: payload.username
      }
    })
    if (!targetEmployee){
      throw {
        code: 401,
        message: "Invalid Access Token"
      }
    }

    req.employee = {
      id: targetEmployee.id,
      username: targetEmployee.username
    }
    next()
  } catch (error) {
    next(error)
  }
}

async function adminAuthn (req,res, next) {
  try {
    if (!req.headers.authorization){
      throw {
        code: 401,
        message: "Invalid Access Token"
      }
    }

    let [type, access_token] = req.headers.authorization.split(' ');
    if(!type || !access_token){
      throw {
        code: 401,
        message: "Invalid Access Token"
      }
    }
    if( type.toLowerCase() != 'bearer' ){
      throw {
        code: 401,
        message: "Invalid Access Token"
      }
    }
    let payload = verifyToken(access_token)
    if (!payload){
      throw {
        code: 401,
        message: "Invalid Access Token"
      }
    }

    let targetAdmin = await Admin.findOne({
      where: {
        id: payload.id,
        username: payload.username
      }
    })
    if (!targetAdmin){
      throw {
        code: 401,
        message: "Invalid Access Token"
      }
    }

    req.admin = {
      id: targetAdmin.id,
      username: targetAdmin.username
    }
    next()
  } catch (error) {
    next(error)
  }
}

module.exports = {
  employeeAuthn,
  adminAuthn
}