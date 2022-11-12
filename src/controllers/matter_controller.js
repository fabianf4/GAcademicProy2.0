const matter_model = require("../models/matter_model")
const student_model = require("../models/student_model")

const matter_controller = {
    // body = idStudent = id del estudiante
    addMatter: async (req, res) => {
        const matter = new matter_model(req.body)
        if(!req.body.idStudent){
            return res.status(400).send()
        }
        try {
            await matter.save()

            await student_model.findByIdAndUpdate(
                req.body.idStudent,
                {
                    $push: {
                        matter: matter._id
                    }
                }
            )

            res.status(201).send(matter)
        } catch (e) {
            res.status(500).send(e)
        }
    },
    // params = id del estudiante
    getMattersByStudent: async (req, res) => {
        try {
            const student = await student_model
                .findById(req.params.id)
                .populate("matter")
            if (!student) {
                return res.status(404).send()
            }
            res.send(student)
        } catch (e) {
            res.status(500).send(e)
        }
    },
    // params = id de la materia
    // body = idStudent = id del estudiante
    deleteMatter: async (req, res) => {
        try {
            const matter = await matter_model.findByIdAndDelete(req.params.id)
            if (!matter) {
                return res.status(404).send()
            }
            await student_model.findByIdAndUpdate(
                req.body.idStudent,
                {
                    $pull: {
                        matter: req.params.id
                    }
                }
            )
            res.send(matter)
        } catch (e) {
            res.status(500).send(e)
        }
    },
    updateMatter: async (req, res) => {
        try {
            const matter = await matter_model.findByIdAndUpdate(
                req.params.id,
                req.body
            )
            if (!matter) {
                return res.status(404).send()
            }
            res.status(200).send(matter)
        } catch (e) {
            res.status(500).send(e)
        }
    }
}

module.exports = matter_controller
