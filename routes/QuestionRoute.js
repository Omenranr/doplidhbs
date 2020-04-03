const express = require('express')
const router = express.Router()
const QuestionCtrl = require('../controllers/QuestionCtrl')

router.get('/selectAll', (request, response, next) => {
    QuestionCtrl.selectAll(request, response, next)
    .then(data => {
        response.send(data)
    })
})

router.get('/selectById', (request, response, next) => {
    QuestionCtrl.select(request, response, next)
    .then(data => {
        response.send(data)
    })
})

router.get('/selectByAuthor', (request, response, next) => {
    QuestionCtrl.selectByAuthor(request, response, next)
    .then(data => {
        response.send(data)
    })
})

router.get('/selectByDiploma', (request, response, next) => {
    QuestionCtrl.selectByDiploma(request, response, next)
    .then(data => {
        response.send(data)
    })
})

router.get('/selectByUniversity', (request, response, next) => {
    QuestionCtrl.selectByUniversity(request, response, next)
    .then(data => {
        response.send(data)
    })
})

router.post('/insert', (request, response, next) => {
    console.log(request.body)
    QuestionCtrl.insert(request, response, next)
    .then(data => {
        response.send(data)
    })
})

router.post('/update', (request, response, next) => {
    QuestionCtrl.update(request, response, next)
    .then(data => {
        response.send(data)
    })
})

router.get('/delete', (request, response, next) => {
    QuestionCtrl.delete(request, response, next)
    .then(data => {
        response.send(data)
    })
})

module.exports = router