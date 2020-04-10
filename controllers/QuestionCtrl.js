const Question = require('../models/Question')
const mongoose = require('mongoose')
exports.selectAll = (req, res, next) => {
    return new Promise( (resolve, reject) => {
        Question.find()
              .then(question => {resolve(question)})
              .catch(err => {reject(err)})
    })
}

exports.select = (req, res, next) => {
    id = req.query.id
    return new Promise( (resolve, reject) => {
        Question.findById(id)
              .then(question => {resolve(question)})
              .catch(err => {reject(err)})
    })
}

exports.selectByAuthor = (req, res, next) => {
    id_author = req.query.id_author
    return new Promise( (resolve, reject) => {
        Question.find({id_author : id_author})
              .then(question => {resolve(question)})
              .catch(err => {reject(err)})
    })
}

exports.selectByDiploma = (req, res, next) => {
    id_diploma = req.query.id_diploma
    return new Promise( (resolve, reject) => {
        Question.find({id_diploma : id_diploma})
              .then(question => {resolve(question)})
              .catch(err => {reject(err)})
    })
}

exports.selectByUniversity = (req, res, next) => {
    id_university = req.query.id_university
    return new Promise( (resolve, reject) => {
        Question.find({id_university : id_university})
              .then(question => {resolve(question)})
              .catch(err => {reject(err)})
    })
}

exports.insertAnswer = (req, res, next) => {
    return new Promise( (resolve, reject) => {
        let id_question = req.body.id_question
        let id_answer = req.body.id_answer
        Question.findById(id_question)
        .then(question => {
            id = new mongoose.Types.ObjectId(id_answer)
            question.answers.push({id_answer : id})
            question.save()
            .then(() => {
                resolve(id_question)
            })
            .catch((err) => {
                reject(err)
            })
        })
    })
}

exports.insert = (req, res, next) => {
    return new Promise( (resolve, reject) => {
        const question = new Question({
            // date : req.body.date,
            id_university: req.body.id_university,
            title: req.body.title,
            content: req.body.content,
            answers : [],
        })
        question.save()
                  .then( question => {
                  resolve(question);
                })
                  .catch(err => {reject(err)})
    })
}

exports.update = (req, res, next)=> {
    return new Promise( (resolve, reject) => {
        let date = req.body.date
        let id_author = req.body.id_author
        let id_university = req.body.id_university
        let id_diploma = req.body.id_diploma
        let title = req.body.title
        let content = req.body.title
        University.findById(id)
                 .then( question => {
                    question.date = date
                    question.id_author = id_author
                    question.id_university = id_university
                    question.id_diploma = id_diploma
                    question.title = title
                    question.content = content
                    question.save()
                    .then( () => {
                        resolve('question has been updated')
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
        Question.findByIdAndRemove(id)
                .then( () =>{
                    resolve("question deleted")
                })
                .catch(err => { reject(err)});
    });
}