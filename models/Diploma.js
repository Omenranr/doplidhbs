const mongoose = require('mongoose')

const DiplomaSchema = new mongoose.Schema({
    id_university : {type : mongoose.Schema.Types.ObjectId, ref : 'universities', required : true},
    name : {type : String, required : true},
    website : {type : String, required : true},
})

module.exports = mongoose.model('diplomas', DiplomaSchema)