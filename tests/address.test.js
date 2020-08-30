const request = require('supertest')
const app = require('../src/app')
const Address = require('../src/models/address')
const { 
    addressOneId,
    addressOne,    
    counterOne,
    addressTwoId,
    addressTwo,
    counterTwo,
    setUpDatabase
} = require('./fixtures/db')

//Delete all the existing addresses.
beforeEach(setUpDatabase)

test('Should request all addresses', async() => {
    const response = await request(app)
        .get('/addresses')
        .expect(200)

    expect(response.body.length).toBe(2)
    expect(response.body[0]._id).toBe(addressOneId)
    expect(response.body[1]._id).toBe(addressTwoId)
    expect(response.body[0].address).toBe(addressOne.address)
    expect(response.body[1].address).toBe(addressTwo.address)
})
