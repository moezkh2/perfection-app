const express = require('express')
const path = require('path')
const mongoose = require('mongoose')
require('dotenv').config()
mongoose.connect(process.env.MONGO_URI).then(console.log("database connected")).catch((err) => { console.log(err) })
const app = express()
app.use(express.json())
app.use("/user", require('./route/RouteUser'))
app.use("/service", require('./route/RouteService'))
if (process.env.NODE_ENV === "production") {
    app.use(express.static('./client/build'))
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client/build/index.html'));
    })
}
app.listen(process.env.PORT, (err) => {
    err ? console.log(err) : console.log(`server is running at port ${process.env.PORT}`)
})
