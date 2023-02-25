const express = require('express')
const router = express.Router()
const {adminAuthn} = require('../middlewares/authn')
const AdminAuthController = require('../controllers/admin/authController')
const AdminEmployeeController = require('../controllers/admin/employeeController')

//!Auth
router.post('/login', AdminAuthController.login)
router.use(adminAuthn)
//!Employee
router.post("/employee", AdminEmployeeController.createNewEmployee)
router.put("/employee/:employee_id", AdminEmployeeController.updateEmployee)
router.delete("/employee/:employee_id", AdminEmployeeController.deleteEmployee)
router.get("/employee/attendance", AdminEmployeeController.getAllAttendance)
router.get("/employee/attendance/:att_id", AdminEmployeeController.getOneAttendance)
router.get("/employee", AdminEmployeeController.getAllEmployee)

module.exports = router