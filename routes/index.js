const express = require('express');
const route = express();
const employeeRoute = require('./employee')
const adminRoute = require('./admin')

route.use('/employee', employeeRoute)
route.use('/admin', adminRoute)
module.exports = route