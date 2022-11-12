const express = require ("express")
const router = new express.Router()

const student_controller = require("../controllers/student_controller")

router.post("/add", student_controller.addStudent)
//router.get("/get", student_controller.getStudents)
router.delete("/delete/:id", student_controller.deleteStudent)
router.patch("/update/:id", student_controller.updateStudent)
router.post("/login", student_controller.login)

module.exports = router