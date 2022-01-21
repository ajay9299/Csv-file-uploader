const mongoose = require('mongoose');

const StudentSchmea = new mongoose.Schema({
  firstname: {
    type: String,
  },
  lastname: {
    type: String,
  },
  rollnumber: {
    type: Number,
    unique: true,
  },
  phonenumber: {
    type: Number,
    unique: true,
  },
});


module.exports = mongoose.model('student',StudentSchmea);