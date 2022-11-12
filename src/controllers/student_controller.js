const student_model = require("../models/student_model")

const student_controller = {
    addStudent: async (req, res) => {
        const student = new student_model(req.body)
        try {
            await student.save()
            res.status(201).send(student)
        } catch (e) {
            res.status(500).send(e)
        }
    },
    getStudents: async (req, res) => {
        try {
            const students = await student_model.find()
            res.send(students)
        } catch (e) {
            res.status(500).send(e)
        }
    },
    deleteStudent: async (req, res) => {
        try {
            const student = await student_model.findByIdAndDelete(req.params.id)
            if (!student) {
                return res.status(404).send()
            }
            res.send(student)
        } catch (e) {
            res.status(500).send(e)
        }
    },
    updateStudent: async (req, res) => {
        try {
            const student = await student_model.findByIdAndUpdate(
                req.params.id,
                req.body
            )
            if (!student) {
                return res.status(404).send()
            }
            res.status(200).send(student)
        } catch (e) {
            res.status(500).send(e)
        }
    },
    login: async (req, res) => {
        try {
            const student = await student_model.findOne({
                username: req.body.username,
                password: req.body.password
            })
            if (!student) {
                return res.status(404).send()
            }
            res.status(200).send(student)
        } catch (e) {
            res.status(500).send(e)
        }
    }
}

module.exports = student_controller
