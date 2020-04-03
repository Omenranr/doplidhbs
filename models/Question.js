const mongoose = require('mongoose')

const QuestionSchema = new mongoose.Schema({
    date : {type : Date, default : Date.now},
    id_author : {type : mongoose.Schema.Types.ObjectId, ref : 'authors', required : true},
    id_university : {type : mongoose.Schema.Types.ObjectId, ref : 'universities', required : true},
    id_diploma : {type : mongoose.Schema.Types.ObjectId, ref : 'diplomas', required : true},
    title : {type : String, required : true},
    content : {type : String, required : true},
})

module.exports = mongoose.model('questions', QuestionSchema)