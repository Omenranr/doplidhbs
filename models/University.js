const mongoose = require('mongoose')

const UniversitySchema = new mongoose.Schema({
    name : {type: String, required: true},  
    website : {type: String},
    address : {type: String}, 
    diplomas: [{
        id_diploma : {type : mongoose.Schema.ObjectId, ref : 'diplomas', required : true},
    }]
})

module.exports = mongoose.model('universities', UniversitySchema)