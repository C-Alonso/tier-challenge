const { Mongoose } = require("mongoose");
const validator = require('validator')

const mongoose = require('mongoose');

const counterSchema = new mongoose.Schema({
    visits: {
        type: Number,
        default: 0
    },
    addressId: {
        type: String,
        required: true,
        ref: 'Address'
    }
})

//And this one is an instance method.
//This works because, behind the scenes, JSON.stringify() gets called by the response.
counterSchema.methods.toJSON = function() {
    const counter = this
    const counterObject = counter.toObject()
    //So the id doesn't show.
    delete counterObject._id

    return counterObject
}

//We explicitly created a schema to be able to use schema options (f.e.: timestamps)
const Counter = mongoose.model('Counter', counterSchema)

module.exports = Counter