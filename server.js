//library imports 
const express = require('express')
const handlebars = require('express-handlebars')
var bodyParser = require('body-parser')
var routes = require('./routes/index')
var path = require('path')

// defaultLayout: 'layout', layoutDir : __dirname+'/views/layouts/'
const app = express()
    .engine('.hbs', handlebars({ extname: '.hbs', cache: false, defaultLayout: 'main', layoutDir: __dirname + '/views/layouts/' }))
    .set('views', path.join(__dirname, 'views'))
    .set('view engine', '.hbs')
    .use('/static', express.static('static'));

// parse urlencoded request bodies into req.body
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', routes)

//const regions = region.features;


// Private key, in `.json` format, for an Earth Engine service account.
const PORT = process.env.PORT || 3001
app.listen(PORT)
console.log(`Listening on port ${PORT}`)