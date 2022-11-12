const express = require ("express")
const router = new express.Router()

const matter_controller = require("../controllers/matter_controller")

router.post("/add", matter_controller.addMatter)
router.get("/get/:id", matter_controller.getMattersByStudent)
router.delete("/delete/:id", matter_controller.deleteMatter)
router.patch("/update/:id", matter_controller.updateMatter)

module.exports = router