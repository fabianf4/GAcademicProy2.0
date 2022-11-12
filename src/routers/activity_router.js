const express = require ("express")
const router = new express.Router()

const activity_controller = require("../controllers/activity_controller")

router.post("/add", activity_controller.addActivity)
router.delete("/delete/:id", activity_controller.deleteActivity)
router.patch("/update/:id", activity_controller.updateActivity)
router.get("/get/:id", activity_controller.getActivityByMatter)

module.exports = router