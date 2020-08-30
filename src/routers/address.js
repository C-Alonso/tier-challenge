const express = require('express')
const Address = require('../models/address')
const router = new express.Router()


const bodyParser = require("body-parser");
const jsonencodedParser = bodyParser.json({ extended: false });
const Counter = require('../models/counter');


router.post('/addresses', jsonencodedParser, async (req, res) => {

    console.log("Got called")   
    
    try {
        //shortAddress = generate(req.body.address, {latitude, longitude, location}) //We set the {} as a default return value.
        
        const address = new Address(req.body)

        await address.save()
        res.status(201).send({
            address: address.address,
            shortAddress: address._id
        })
       
    } catch (e) {
        console.log(e)
        res.status(400).send(e)
    } 
    
    console.log(req.body)
})

//Return all addresses
router.get('/addresses', async (req, res) => {    
    try{
        const allAddresses = await Address.find({})

        if(!allAddresses) {
            res.status(404).send()
        }

        res.send(allAddresses)
    } catch (e) {
        res.status(500).send("Internal Server Error")
    }
})

//Return specific address
router.get('/addresses/*', async (req, res) => {
    //Get first parameter
    const _id = req.params[0]
    console.log(_id)
    
    try{
        const address = await Address.findOne({ _id: _id })

        if(!address) {
            res.status(404).send()
        }

        //Increment visit counter!
        const counter = await Counter.findOne({ addressId: _id })
        counter.visits += 1
        await counter.save()

        res.send(address)
        
    } catch (e) {
        res.status(500).send()
    }
})


module.exports = router