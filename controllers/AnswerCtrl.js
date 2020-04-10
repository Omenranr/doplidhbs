const Answer = require('../models/Answer')

exports.selectAll = (req, res, next) => {
    return new Promise( (resolve, reject) => {
        Answer.find()
              .then(answer => {resolve(answer)})
              .catch(err => {reject(err)})
    })
}

exports.select = (req, res, next) => {
    id = req.query.id
    return new Promise( (resolve, reject) => {
        Answer.findById(id)
              .then(answer => {resolve(answer)})
              .catch(err => {reject(err)})
    })
}

exports.selectByAuthor = (req, res, next) => {
    id_author = req.query.id_author
    return new Promise( (resolve, reject) => {
        Answer.find({id_author : id_author})
              .then(answer => {resolve(answer)})
              .catch(err => {reject(err)})
    })
}

exports.selectByQuestion = (req, res, next) => {
    id_question = req.query.id_question
    return new Promise( (resolve, reject) => {
        Answer.find({id_question : id_question})
              .then(answer => {resolve(answer)})
              .catch(err => {reject(err)})
    })
}

exports.insert = (req, res, next) => {
    return new Promise( (resolve, reject) => {
        const answer = new Answer({
            // date : req.body.date,
            date : Date.now(),
            id_question : req.body.id_question,
            content: req.body.content,
        })
        answer.save()
                  .then( answer => {
                  resolve(answer._id);
                })
                  .catch(err => {reject(err)})
    })
}

exports.update = (req, res, next)=> {
    return new Promise( (resolve, reject) => {
        let date = Date.now()
        let id_author = req.body.id_author
        let id_question = req.body.id_question
        let content = req.body.content
        Answer.findById(id)
                 .then( answer => {
                    answer.date = date
                    answer.id_author = id_author
                    answer.id_question = id_question
                    answer.content = content
                    answer.save()
                        .then( () => {
                        resolve('answer has been updated')
                    })
                    .catch( err => {
                        reject(err)
                    });
                })
    })
}

exports.delete = (req, res, next)=>{
    return new Promise( (resolve, reject) =>{
        let id = req.query.id;
        Answer.findByIdAndRemove(id)
                .then( () =>{
                    resolve("answer deleted")
                })
                .catch(err => { reject(err)});
    });
}