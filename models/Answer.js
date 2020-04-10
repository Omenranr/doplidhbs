const mongoose = require('mongoose')

const QuestionSchema = new mongoose.Schema({
    date : {type : Date, default : Date.now},
    id_question : {type : mongoose.Schema.Types.ObjectId, ref : 'questions', required : true},
    content : {type : String, required : true},
})

module.exports = mongoose.model('answers', QuestionSchema)