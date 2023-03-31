const express =require('express')
const bossRouter = express.Router()
const Boss = require("../models/boss.js")

//get all bosses
bossRouter.get("/", (req, res, next) => {
    Boss.find((err, bosses) => {
        if(err){
            res.status(500)
            return next(err)
        }
    return res.status(200).send(bosses)
    })
})

// Add new boss
bossRouter.post("/", (req, res, next) => {
    const newBoss = new Boss(req.body)
    newBoss.save((err, savedBoss) => {
        if(err){
            res.status(500)
            return next(err)
        }
    return res.status(201).send(savedBoss)
    })
})

// Completed Bounty counter
bossRouter.put("/bountysCompleted/:bossID", (req, res, next) => {
    Boss.findOneAndUpdate(
        { _id: req.params.bossID },
        { $inc: {bountysCompleted: 1}},
        {new: true},
        (err, updatedBoss) => {
            if(err){
                res.status(500)
                return next(err)
            }
        return res.status(201).send(updatedBoss)
        }
    )
})

//Get boss byt search terms
bossRouter.get("/search", (req, res, next) => {
    const { boss } = req.query
    const pattern = new RegExp(boss)
    Boss.find( 
        { name: { $regex: pattern, $options: 'i' } }, 
        (err, bosses) => {
            if(err){
                res.status(500)
                return next(err)
            }
        return res.status(200).send(bosses)
    } )
})

//find bosses by range
bossRouter.get("/bybountysCompleted", (req, res, next) => {
    Boss.where("bountysCompleted").gte(req.query.bountysCompletedamount).exec((err, Boss) => {
        if(err){
            res.status(500)
            return next(err)
        }
    return res.status(201).send(Boss)
    })
})



module.exports = bossRouter