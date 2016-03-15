var
  express = require('express'),
  app = express(),
  ejs = require('ejs'),
  bodyParser = require('body-parser'),
  mongoose = require('mongoose')
  flash = require('connect-flash')
  cookieParser = require('cookie-parser')
  session = require('express-session')
  passport = require('passport')
  passportConfig = require('./config/passport.js')
  eventful = require('eventful-node')


// :: Setup Enviroment Variables ::
require('dotenv').config();
// :: Models ::
var User = require('./models/User.js')
var Event = require('./models/Event.js')

// :: Database ::

// Local DB is set to event_cal
var db = "mongodb://localhost/event_cal"
//process.env.MONGOLAB_URI ||

mongoose.connect(db, function(err){
  if(err) return console.log("!!COULD NOT CONNECT TO DATABASE: " + db)
  else{ console.log("Connected to Database: " + db) }
})

// :: Middleware ::

// Setup Path - /public/ - To server static files within /public/
app.use('/public', express.static(__dirname + '/public'));
// Configure for Use with ejs
app.set('view engine', 'ejs')
// JSON/Cookie Parsers
app.use(cookieParser())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
// Passport and Sessions
app.use(session({
  secret: process.env.SESSION_SECRET,
  cookie: {_expires: 1000000}
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(flash())

// :: Routes ::
var userRoutes = require('./routes/users.js')
var eventRoutes = require('./routes/events.js')

// TEMPORARY HOME ROUTE
app.get('/', function(req, res){
  res.render('index')
})

// User Routes
app.use('/', userRoutes)

// Event Routes
app.use('/events', eventRoutes)

// Local Server is on Port 3000
thePort = process.env.PORT || 3000
app.listen(thePort, function(err){
  if(err) throw err
  console.log('Connected to Port 3000! Stay Calm and Keep Coding.')
})
