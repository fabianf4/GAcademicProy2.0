const activity_model = require("../models/activity_model")
const matter_model = require("../models/matter_model")

const activity_controller = {
    // body = idMatter = id de la materia
    addActivity: async (req, res) => {
        const activity = new activity_model(req.body)
        if(!req.body.idMatter){
            return res.status(400).send({error: "idMatter es requerido"})
        }
        try {
            const {activities} = await matter_model.findById(req.body.idMatter).populate("activities")

            let percentage = 0
            activities.forEach((activity) => {
                percentage += activity.percentage
            })

            if(parseFloat(percentage) + parseFloat(req.body.percentage) > 100){
                return res.status(400).send({error: "El porcentaje de la actividad es mayor al porcentaje disponible"})
            }

            const activitySave = await activity.save()

            await matter_model.findByIdAndUpdate(req.body.idMatter, {
                $push: {
                    activities: activitySave._id
                }
            })
            res.status(201).send(activitySave)
        } catch (e) {
            res.status(500).send(e)
        }
    },
    // params = id de la actividad
    // body = idMatter = id de la materia
    deleteActivity: async (req, res) => {
        try {
            const activity = await activity_model.findByIdAndDelete(
                req.params.id
            )
            if (!activity) {
                return res.status(404).send()
            }

            await matter_model.findByIdAndUpdate(req.body.idMatter, {
                $pull: {
                    activities: req.params.id
                }
            })

            res.status(200).send(activity)
        } catch (e) {
            res.status(500).send(e)
        }
    },
    // params = id de la actividad
    updateActivity: async (req, res) => {
        try {
            const activity = await activity_model.findByIdAndUpdate(
                req.params.id,
                req.body
            )
            if (!activity) {
                return res.status(404).send()
            }
            res.status(200).send(activity)
        } catch (e) {
            res.status(500).send(e)
        }
    },
    // params = id de la materia
    getActivityByMatter: async (req, res) => {
        try {
            const matter = await matter_model
                .findById(req.params.id)
                .populate("activities")
            if (!matter) {
                return res.status(404).send()
            }
            res.send(matter)
        } catch (e) {
            res.status(500).send(e)
        }
    }
}

module.exports = activity_controller
