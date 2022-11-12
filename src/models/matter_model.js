const mongoose = require("mongoose")

const matter_model = new mongoose.Schema({

  name: {
    type: String,
    required: true
  },
  nameTeacher: {
    type: String,
    required: true
  },
  activities: [
    {
      type: mongoose.ObjectId,
      ref: "activity"
    }
  ]
})

module.exports = mongoose.model("matter", matter_model)
