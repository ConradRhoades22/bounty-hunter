const mongoose = require('mongoose')
const Schema = mongoose.Schema

const bossSchema = new Schema({
    name: {
        type: String,
        requires: true,
    },
    location: {
        type: String,
        required: true,
    },
    bountysCompleted: {
        type: Number,
        required: true,
    },
})


module.exports = mongoose.model("Boss", bossSchema)




//Boss form for Postman

// {
//     "name": "Darth Vader",
//     "location": "Death Star",
//     "bountysCompleted": "5"
// }