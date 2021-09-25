const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config()
mongoose.connect(process.env.MONGO_URI).then(console.log("database connected")).catch((err) => { console.log(err) })
const app = express()
app.use(express.json())
app.use("/user", require('./route/RouteUser'))
app.use("/service", require('./route/RouteService'))
if (process.env.NODE_ENV === "production") {
    app.use(express.static('../build'))

}
app.listen(process.env.PORT, (err) => {
    err ? console.log(err) : console.log("server is running")
})
