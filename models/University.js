const mongoose = require('mongoose')

const UniversitySchema = new mongoose.Schema({
    name : {type: String, required: true},  
    website : {type: String},
    address : {type: String},
    image : {type: String},
    diplomas: [{
        id_diploma : {type : mongoose.Schema.Types.ObjectId, ref : 'diplomas'},
    }],
    ratings: [{
        id_rating : {type : mongoose.Schema.Types.ObjectId, ref : 'ratings'},
    }],
    questions: [{
        id_question : {type : mongoose.Schema.Types.ObjectId, ref : 'questions'},
    }],
})

module.exports = mongoose.model('universities', UniversitySchema)