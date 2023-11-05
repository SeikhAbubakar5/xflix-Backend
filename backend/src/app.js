const express = require('express')
const ApiError=require('./utils/ApiError')
const routes =require('./routes')
const httpStatus =require('http-status')
const helmet = require('helmet')
const { handleErrors } =require('./middlewares/error')
const compression=require('compression')
const cors= require('cors')


const app = express()
// gzip compression
app.use(compression());
// set security HTTP headers
app.use(helmet());
// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));
// parse json request body
app.use(express.json());

// enable cors
app.use(cors());
app.options("*", cors());
// Reroute all API request starting with "/" route
app.use('/v1', routes)

app.use((req, res, next) => {
    next(new ApiError(httpStatus.NOT_FOUND, "Not found"));
})
app.use(handleErrors)



module.exports = app