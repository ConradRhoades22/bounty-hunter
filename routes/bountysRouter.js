const express = require('express')
const bountysRouter = express.Router()
const Bounty = require('../models/bounty.js')

//Get all
bountysRouter.get ("/", (req, res, next) => {
    console.log(typeof(Bounty))
    Bounty.find((err, Bounty) => {
        if(err){
            res.status(500)
            return next(err)
        }
        return res.status(200).send(Bounty)
    })
})

// Get by Boss
bountysRouter.get("/:bossID", (req, res, next) => {
    Bounty.find ({ boss: req.params.bossID }, (err, Bounty) => {
        if(err){
            res.status(500)
            return next(err)
        }
        return res.status(200).send(Bounty)
    })
})
//Post one
bountysRouter.post("/:bossID", (req, res, next) => {
    req.body.boss = req.params.bossID
    const newBounty = new Bounty(req.body)
    newBounty.save((err, savedBounty) => {
        if(err){
            res.status(500)
            return next(err)
        }
        return res.status(201).send(savedBounty)
    })
})


// delete one
bountysRouter.delete("/:bountysId",(req, res) =>{
    Bounty .findOneAndDelete({_id: req.params.bountysId}, (err, deletedItem) =>{
        if(err){
            res.status(500)
            return next(err)
        }
        return res.status(200).send(`Sucessfulyl deleted item ${deletedItem.title} from the database`)
    })

//update one
    bountysRouter.put("/:bountysId", (req, res, next) => {
        Bounty.findOneAndUpdate(
            {_id: req.params.bountysId}, //find this one to update
            req.body, //update the object with this data
            { new: true }, // send back the updated version please
            (err, updatedBounty) => {
                if(err){
                    res.status(500)
                    return next(err)
                }
            return res.status(201).send(updatedBounty)
            }
        )
    })
})

// get by type
bountysRouter.get("/search/type", (req, res, next) => {
    Bounty.find({ type: req.query.type }, (err, bountys) => {
        if(err){
            res.status(500)
            return next(err)
        }
        return res.status(200).send (bountys)
    })
})

module.exports = bountysRouter