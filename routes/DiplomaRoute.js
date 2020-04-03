const express = require('express')
const router = express.Router()
const DiplomaCtrl = require('../controllers/DiplomaCtrl')

//validated
router.get('/selectAll', (request, response, next) => {
    DiplomaCtrl.selectAll(request, response, next)
    .then(data => {
        response.send(data)
    })
})

//validated
router.get('/selectById', (request, response, next) => {
    console.log(request.query)
    DiplomaCtrl.select(request, response, next)
    .then(data => {
        response.send(data)
    })
})

//validated
router.get('/selectByName', (request, response, next) => {
    DiplomaCtrl.selectByName(request, response, next)
    .then(data => {
        response.send(data)
    })
})

//validated
router.post('/insert', (request, response, next) => {
    console.log(request.body)
    DiplomaCtrl.insert(request, response, next)
    .then(data => {
        response.send(data)
    })
})

//validated
router.post('/update', (request, response, next) => {
    console.log(request.body)
    DiplomaCtrl.update(request, response, next)
    .then(data => {
        response.send(data)
    })
})

//validated
router.get('/delete', (request, response, next) => {
    console.log(request.query)
    DiplomaCtrl.delete(request, response, next)
    .then(data => {
        response.send(data)
    })
})

module.exports = router