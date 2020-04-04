const express = require('express')
const router = express.Router()
const RatingCtrl = require('../controllers/RatingCtrl')
const UniversityCtrl = require('../controllers/UniversityCtrl')
const AuthorCtrl = require('../controllers/AuthorCtrl')

router.get('/selectRecent', (request, response, next) => {
    console.log("selectRecent")
    RatingCtrl.selectRecent(request, response, next)
    .then(ratings => {
        response.send(ratings)
    })
})

//validated
router.get('/selectAll', (request, response, next) => {
    RatingCtrl.selectAll(request, response, next)
    .then(data => {
        response.send(data)
    })
})

//validated
router.get('/selectById', (request, response, next) => {
    RatingCtrl.select(request, response, next)
    .then(data => {
        response.send(data)
    })
})

//validated
router.get('/selectByAuthor', (request, response, next) => {
    RatingCtrl.selectByAuthor(request, response, next)
    .then(data => {
        response.send(data)
    })
})

//validated
router.get('/selectByDiploma', (request, response, next) => {
    RatingCtrl.selectByDiploma(request, response, next)
    .then(data => {
        response.send(data)
    })
})

//validated
router.get('/selectByUniversity', (request, response, next) => {
    RatingCtrl.selectByUniversity(request, response, next)
    .then(data => {
        response.send(data)
    })
})

//validated
router.post('/insert', (request, response, next) => {
    console.log(request.body)
    RatingCtrl.insert(request, response, next)
    .then(data => {
        response.send(data)
    })
})

//validated
router.post('/update', (request, response, next) => {
    RatingCtrl.update(request, response, next)
    .then(data => {
        response.send(data)
    })
})

//validated
router.get('/delete', (request, response, next) => {
    RatingCtrl.delete(request, response, next)
    .then(data => {
        response.send(data)
    })
})

module.exports = router