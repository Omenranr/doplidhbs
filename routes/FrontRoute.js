const express = require('express')
const router = express.Router()
const UniversityCtrl = require('../controllers/UniversityCtrl')
const RatingCtrl = require('../controllers/RatingCtrl')

router.get('/', (request, response, next) => {
    response.render('main', {layout:'home'})
});

router.get('/search', (request, response, next) => {
    UniversityCtrl.selectAll(request, response, next)
    .then(universities => {
        RatingCtrl.selectAll(request, response, next)
        .then(ratings => {
            response.render('main', {layout:'search', universities, ratings})
        })
    })
})

router.get('/university', (request, response, next) => {
    //GO SEARCH THE UNIVERSITY INFOS & ALL IT'S RATINGS (GET REQUEST)
    console.log(request.query)
    response.render('main', {layout:'university'})
})

router.get('/rateauth', (request, response, next) => {
    response.render('main', {layout:'rateauth'})
})

router.get('/rateform', (request, response, next) => {
    response.render('main', {layout:'rateform'})
})

module.exports = router