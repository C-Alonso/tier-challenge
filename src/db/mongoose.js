const { Mongoose } = require("mongoose");
const validator = require('validator')

const mongoose = require('mongoose')

mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false //To address the deprecation warning.
})
