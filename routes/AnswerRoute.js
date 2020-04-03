const express = require('express')
const router = express.Router()
const AnswerCtrl = require('../controllers/AnswerCtrl')

router.get('/selectAll', (request, response, next) => {
    AnswerCtrl.selectAll(request, response, next)
    .then(data => {
        response.send(data)
    })
})

router.get('/selectById', (request, response, next) => {
    AnswerCtrl.select(request, response, next)
    .then(data => {
        response.send(data)
    })
})

router.get('/selectByAuthor', (request, response, next) => {
    AnswerCtrl.selectByAuthor(request, response, next)
    .then(data => {
        response.send(data)
    })
})

router.get('/selectByQuestion', (request, response, next) => {
    AnswerCtrl.selectByUniversity(request, response, next)
    .then(data => {
        response.send(data)
    })
})

router.post('/insert', (request, response, next) => {
    console.log(request.body)
    AnswerCtrl.insert(request, response, next)
    .then(data => {
        response.send(data)
    })
})

router.post('/update', (request, response, next) => {
    AnswerCtrl.update(request, response, next)
    .then(data => {
        response.send(data)
    })
})

router.get('/delete', (request, response, next) => {
    AnswerCtrl.delete(request, response, next)
    .then(data => {
        response.send(data)
    })
})

module.exports = router