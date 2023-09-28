const express = require('express');
const employeeRouter = express.Router();
const employeesController = require("../controllers/employees.controller");

employeeRouter.route("/").get(employeesController.getAllEmployee)

module.exports = employeeRouter;