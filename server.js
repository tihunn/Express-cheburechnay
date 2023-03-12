const express = require('express')
const {Sequelize} = require('sequelize')
const fileUpload = require("express-fileupload")
const path = require("path")
const mainRouter = require("./router/mainRouter")
require("./modelsORM")
const sequelize = require("./sequelize")
const cors = require("cors")



const port = process.env.PORT || 3007
const host =  "127.0.0.1"


const app = express()
app.use(express.json())
app.use(cors())
app.use(fileUpload({}))
app.use(express.static (path.resolve(__dirname, "static") ))
app.use('/', mainRouter)


const start = async () => {
    try {
        await sequelize.authenticate()
        await sequelize.sync()
        console.log('Connection has been established successfully.');
        console.log("Used this env: '" + process.env.SERVER_PORT + "' and '" + process.env.DATABASE_URL + "'")
        app.listen( port, () => console.log(`Server listens http://${host}:${port}`) )
    } catch (e) {
        console.error('Unable to connect to the database:', e);
    }
}

start()


