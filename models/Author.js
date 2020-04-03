const mongoose = require('mongoose')

const AuthorSchema = new mongoose.Schema({
    first_name : {type : String, required : true},
    last_name : {type : String},
    promotion : {type : String, required : true},
    id_university : {type : mongoose.Schema.Types.ObjectId, ref : 'universities', required : true},
    id_diploma : {type : mongoose.Schema.Types.ObjectId, ref : 'diplomas', required : true},
    mail_address : {type : String, required : true},
    anonyme : {type : Boolean, required : true, default : false},
})

module.exports = mongoose.model('authors', AuthorSchema)