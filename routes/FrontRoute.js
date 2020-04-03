const express = require('express')
const router = express.Router()
const UniversityCtrl = require('../controllers/UniversityCtrl')

router.get('/', (request, response, next) => {
    response.render('main', {layout:'home'})
});

router.get('/search', (request, response, next) => {
    UniversityCtrl.selectAll(request, response, next)
                  .then(data => {
                    response.render('main', {layout:'search', data})
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