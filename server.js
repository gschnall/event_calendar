var 
  express = require('express'),
  app = express(),
  ejs = require('ejs'),
  bodyParser = require('body-parser'),
  mongoose = require('mongoose')

  // :: Models ::
var User = require('./models/User.js')
var Event = require('./models/Event.js')

// :: Database ::

// Local DB is set to event_cal
var db = 
process.env.MONGOLAB_URI || 
"mongodb://localhost/event_cal"

mongoose.connect(db, function(err){
  if(err) return console.log("!!COULD NOT CONNECT TO DATABASE: " + db)
  else{ console.log("Connected to Database: " + db) }
})

// :: Middleware ::

// Setup Path - /public/ - To server static files within /public/
app.use('/public', express.static(__dirname + '/public'));
// Configure for Use with ejs
app.set('view engine', 'ejs')
// JSON Parser
app.use(bodyParser.json())

app.get('/profile', function(req, res){
  res.render('profile.ejs')
})


// Local Server is on Port 3000::
thePort = process.env.Port || 3000
app.listen(thePort, function(err){
  if(err) throw err
  console.log('Connected to Port 3000! Stay Calm and Keep Coding.')
})
