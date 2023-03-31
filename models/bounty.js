const mongoose =  require('mongoose');
const Schema = mongoose.Schema;


// Bounty Blueprint

const bountySchema = new Schema({
    fName: {
        type: String,
        required: true,
    },
    lName: { 
        type: String,
        required: true,
    },
    living: {
        type: Boolean,
        required: true,
    },
    bounty: {
        type: Number,
        required: true,
    },
    type : {
        type: String,
        enum: ["Sith", "Jedi"],
        required : true,
    },
    bosses: {
        type: Schema.Types.ObjectId,
        ref: "Boss",
        required: true,
    },
})

// generate the model
module.exports = mongoose.model('Bounty', bountySchema)



// Bounty form for Postman

// {
//     "fName":"Skim",
//     "lName":"Beeble",
//     "living":"true",
//     "bounty": 200551156,
//     "type": "Jedi",
//     "bosses": "6425e0543197a4b98110fa4f"
// }