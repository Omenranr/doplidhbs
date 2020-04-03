const express = require('express')
const router = express.Router()
const UniversityCtrl = require('../controllers/UniversityCtrl')

//validated
router.get('/selectAll', (request, response, next) => {
    UniversityCtrl.selectAll(request, response, next)
    .then(data => {
        response.send(data)
    })
})

//validated
router.get('/selectById', (request, response, next) => {
    console.log(request.query)
    UniversityCtrl.select(request, response, next)
    .then(data => {
        response.send(data)
    })
})

//validated
router.get('/selectByName', (request, response, next) => {
    UniversityCtrl.selectByName(request, response, next)
    .then(data => {
        response.send(data)
    })
})

//validated
router.post('/insert', (request, response, next) => {
    UniversityCtrl.insert(request, response, next)
    .then(data => {
        response.send(data)
    })
})

//validated
router.post('/update', (request, response, next) => {
    console.log(request.body)
    UniversityCtrl.update(request, response, next)
    .then(data => {
        response.send(data)
    })
})

//validated
router.get('/delete', (request, response, next) => {
    console.log(request.query)
    UniversityCtrl.delete(request, response, next)
    .then(data => {
        response.send(data)
    })
})

module.exports = router