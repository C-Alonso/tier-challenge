const request = require('supertest')
const app = require('../src/app')
const Counter = require('../src/models/counter')
const { userOneId, userOne, setUpDatabase, addressOneId } = require('./fixtures/db')



//Delete all the existing counters.
beforeEach(setUpDatabase)

test('Should increase visits by one', async() => {
    const response = await request(app).get('/addresses/' + addressOneId).send({}).expect(200)

    //Assert that the token has been saved on the DB.
    counter = await Counter.findOne({addressId: addressOneId})
    expect(counter.visits).toBe(1)
})
