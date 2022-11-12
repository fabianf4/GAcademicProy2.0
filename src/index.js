const express = require("express")
const app = express()

//dotenv
require("dotenv").config()
const port = process.env.PORT

//cors
const cors = require("cors")
app.use(cors())

//other
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

require("./drivers/mongoose_driver")

app.use("/student", require("./routers/student_router"))
app.use("/matter", require("./routers/matter_router"))
app.use("/activity", require("./routers/activity_router"))

app.get('/',(req,res)=>{
    res.send("Api is running")
    })


app.listen(port, () => {
  console.log(`Api initialized on port ${port}`)
})
