const express = require('express')
const router = express.Router()
const UniversityCtrl = require('../controllers/UniversityCtrl')
const RatingCtrl = require('../controllers/RatingCtrl')
const sendMail = require('../util/mailing/sendMail')

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
    UniversityCtrl.select(request, response, next)
    .then(university => {
        response.render('main', {layout:'university'})
    })
})

router.get('/rateauth', (request, response, next) => {
    response.render('main', {layout:'rateauth'})
})

router.get('/rateform', (request, response, next) => {
    response.render('main', {layout:'rateform'})
})

router.get('/contact', (request, response, next) => {
    response.render('main', {layout:'contact'})
})

router.get('/about', (request, response, next) => {
    response.render('main', {layout: 'about'})
})

router.post('/api/contact/sendMail', (request, response, next) => {
    let name = request.body.name
    let mail = request.body.mail
    let subject = request.body.subject
    let message = request.body.message
    sendMail(name, mail, subject, message)
    .catch((err) => {
        response.send(err)
    })
})

module.exports = router