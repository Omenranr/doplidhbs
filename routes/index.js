var express = require('express')
var router = express.Router()

//FRONT ROUTING
router.get('/', (request, response) => {
    response.render('main', {layout:'home'})
});
router.get('/search', (request, response) => {
    response.render('main', {layout:'search'})
})
router.get('/university', (request, response) => {
    //GO SEARCH THE UNIVERSITY INFOS & ALL IT'S RATINGS (GET REQUEST)
    response.render('main', {layout:'university'})
})
router.get('/rateauth', (request, response) => {
    response.render('main', {layout:'rateauth'})
})
router.get('/rateform', (request, response) => {
    response.render('main', {layout:'rateform'})
})
//BACK ROUTING
module.exports = router;