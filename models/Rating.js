const mongoose = require('mongoose')

const RatingSchema = new mongoose.Schema({
    date : {
        type : Date,
        default : Date.now,
    },
    id_author : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'authors',
        required : true,
    },
    id_university : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'universities',
        required : true,
    },
    id_diploma : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'diplomas',
        required : true,
    },
    average_rating : {
        value : {type : Number},
        content : {type : String},
    },
    general_rating : {
        value : {type : Number},
        content : {type : String},
    },
    academic_rating : {
        value : {type : Number},
        content : {type : String},
    },
    life_rating : {
        value : {type : Number},
        content : {type : String},
    },
    locals_rating : {
        value : {type : Number},
        content : {type : String},
    },
    pro_rating : {
        value : {type : Number},
        content : {type : String},
    },
})

module.exports = mongoose.model('ratings', RatingSchema)