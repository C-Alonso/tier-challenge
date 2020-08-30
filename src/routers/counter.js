const express = require('express')
const Counter = require('../models/counter')
const router = new express.Router()


//Function to find user by e-mail and credentials.

router.get('/counters/*', async (req, res) => {
    const _id = req.params[0]
    
    try{
        const counter = await Counter.findOne({addressId: _id})

        if(!counter) {
            res.status(404).send()
        }

        res.send(counter)
    } catch (e) {
        res.status(500).send()
    }

})


module.exports = router