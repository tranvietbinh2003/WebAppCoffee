// const express = require('express')
// const cors = require('cors')
import cors from 'cors'
import express from 'express'
require ('dotenv').config()
const routes = require('./src/routes')
// const initRoutes = require('./src/routes')
import initRoutes from './src/routes'
require('./connection_database')

const app = express()

//CRUD
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cors())

initRoutes(app)

const PORT = process.env.PORT || 8888

const listener = app.listen(PORT,() =>{
    console.log('Server is running on the PORT ' + listener.address().port);
})