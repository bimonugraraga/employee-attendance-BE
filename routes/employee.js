const express = require('express')
const router = express.Router()
const {employeeAuthn} = require('../middlewares/authn')
const EmployeeAuthController = require('../controllers/employee/authController')

//!Auth
router.post("/login", EmployeeAuthController.login)

router.use(employeeAuthn)
//!Attendance
router.post("/attendance", EmployeeAuthController.employeeAttendance)
module.exports = router