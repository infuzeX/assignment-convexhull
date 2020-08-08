const express = require("express");
const router = express.Router();

const Employee = require('../../models/Employees');
const response = require('../../lib/response');

//login route
router.post('/login', async (req, res) => {
    const employee = await Employee.findOne({ username: req.body.username });
    //check user exist or not
    if (employee) {
        //check password
        if (employee.password === req.body.password) response(true, employee._id, res);
        else response(false, "Incorrect password", res);
    }
    //if exist show error
    else response(false, "Username not found", res)
});


//register route
router.post('/register', async (req, res) => {
    //check if user already exists
    const isExist = await Employee.findOne({ username: req.body.username })

    //if not exist create employee record in database
    if (!isExist) {
        const newEmployee = await new Employee({
            name: req.body.name,
            username: req.body.username,
            password: req.body.password
        });
        newEmployee.save()
            .then(employee => response(true, employee._id, res))
            .catch(e => response(e.message, res))
    }
    else response(false,"Username already exist",res);

});

module.exports = router;

