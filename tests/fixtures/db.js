const mongoose = require('mongoose')
const shortid = require('shortid')

const Address = require('../../src/models/address')
const Counter = require('../../src/models/counter')


const addressOneId = "eAhr-6"
const addressOne = {
    _id: addressOneId,
    address: 'https://en.wikipedia.org/wiki/Main_Page'
}

const addressTwoId = "qBQ7q4"
const addressTwo = {
    _id: addressTwoId,
    address: 'https://www.youtube.com/watch?v=Z-nCqohtrEY'
}

const counterOne = {
    _id: new mongoose.Types.ObjectId(),
    visits: 0,
    addressId: addressOneId
}

const counterTwo = {
    _id: new mongoose.Types.ObjectId(),
    visits: 0,
    addressId: addressTwoId
}



const setUpDatabase = async () => {
    await Address.deleteMany()
    await Counter.deleteMany()
    await new Address(addressOne).save()
    await new Address(addressTwo).save()
    await new Counter(counterOne).save()
    await new Counter(counterTwo).save()
}

module.exports = {
    addressOneId,
    addressOne,    
    counterOne,
    addressTwoId,
    addressTwo,
    counterTwo,
    setUpDatabase
}