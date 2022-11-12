const mongoose = require ('mongoose')

const URI_DB = process.env.URI_DB
const DB = process.env.DB

mongoose.connect(URI_DB+DB)
    .then(()=>console.log('Success connected to DB'))
    .catch((err)=> console.log('Error connecting to db ' + err))

module.exports = mongoose