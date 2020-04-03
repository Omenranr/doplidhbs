const express = require('express')
const router = express.Router()
const AuthorCtrl = require('../controllers/AuthorCtrl')

router.get('/selectAll', (request, response, next) => {
    AuthorCtrl.selectAll(request, response, next)
    .then(data => {
        response.send(data)
    })
})

router.get('/selectById', (request, response, next) => {
    AuthorCtrl.select(request, response, next)
    .then(data => {
        response.send(data)
    })
})

router.get('/selectByName', (request, response, next) => {
    AuthorCtrl.selectByName(request, response, next)
    .then(data => {
        response.send(data)
    })
})

router.post('/insert', (request, response, next) => {
    AuthorCtrl.insert(request, response, next)
    .then(data => {
        response.send(data)
    })
})

router.post('/update', (request, response, next) => {
    AuthorCtrl.update(request, response, next)
    .then(data => {
        response.send(data)
    })
})

router.get('/delete', (request, response, next) => {
    AuthorCtrl.delete(request, response, next)
    .then(data => {
        response.send(data)
    })
})

module.exports = router