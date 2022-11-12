const mongoose = require("mongoose")

const student_model = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true
  },
  username: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  lastname: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  matter: [
    {
      type: mongoose.ObjectId,
      ref: "matter"
    }
  ]
})

module.exports = mongoose.model("student", student_model)
