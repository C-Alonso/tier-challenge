const { Mongoose } = require("mongoose");
const validator = require('validator')
const shortid = require('shortid')
const Counter = require('./counter')

const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({
    address: {
        type: String,
        trim: true,        
        required: true,
        validate(value) {
            if(!validator.isURL(value)) {
                throw new Error('Please enter a valid URL')
            }
        }
    },
    _id: {
        'type': String,
        'default': shortid.generate
      }
})

//We create the counter!
addressSchema.pre('save', async function (next) {
    const address = this

    try {
        console.log("Address id:")
        console.log(address._id)
        const counter = new Counter({addressId: address._id})
        await counter.save()
        console.log("Counter created!")
    } catch (e) {
        console.log(e)
    }
    next()
    
});


//We explicitly created a schema to be able to use schema options (f.e.: timestamps)
const Address = mongoose.model('Address', addressSchema)

module.exports = Address