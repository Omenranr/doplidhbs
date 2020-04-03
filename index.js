var express = require('express')
var router = express.Router()
var path = require('path')
var bodyParser = require('body-parser')
const handlebars = require('express-handlebars')

//FRONT END ROUTS
const FrontRoute = require('./routes/FrontRoute')

//BACK END ROUTES
const UniversityRoute = require('./routes/UniversityRoute')
const RatingRoute = require('./routes/RatingRoute')
const AuthorRoute = require('./routes/AuthorRoute')
const QuestionRoute = require('./routes/QuestionRoute')
const DiplomaRoute = require('./routes/DiplomaRoute')
const AnswerRoute = require('./routes/AnswerRoute')
//connect to database
require('./util/database/mongodbConnection')

const app = express()
    .engine('.hbs', handlebars({ extname: '.hbs', cache: false, defaultLayout: 'main', layoutDir: __dirname + '/views/layouts/' }))
    .set('views', path.join(__dirname, 'views'))
    .set('view engine', '.hbs')
    .use('/static', express.static('static'))

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
//FRONT ROUTING
app.use('/', FrontRoute)

//BACK END ROUTS
app.use('/api/university', UniversityRoute)
app.use('/api/rating', RatingRoute)
app.use('/api/author', AuthorRoute)
app.use('/api/question', QuestionRoute)
app.use('/api/diploma', DiplomaRoute)
app.use('/api/answer', AnswerRoute)
module.exports = app;