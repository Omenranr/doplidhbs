const mongoose = require('mongoose')

const QuestionSchema = new mongoose.Schema({
    date : {type : Date, default : Date.now},
    id_university : {type : mongoose.Schema.Types.ObjectId, ref : 'universities', required : true},
    title : {type : String, required : true},
    content : {type : String, required : true},
    answers : [{ 
        id_answer : {type : mongoose.Schema.Types.ObjectId, ref : "answers"}
    }]
})

module.exports = mongoose.model('questions', QuestionSchema)