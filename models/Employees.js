const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const employeeSchema = new Schema({
   name:String,
   username:String,
   employeeID:String,
   password:String
});

module.exports = Employee = mongoose.model('employees', employeeSchema);