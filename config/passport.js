var
  passport = require('passport'),
  LocalStrategy = require('passport-local').Strategy,
  FacebookStrategy = require('passport-facebook').Strategy,
  User = require('../models/User.js'),
  configAuth = require('./auth.js')

passport.serializeUser(function(user, done){
  done(null, user.id)
})

passport.deserializeUser(function(id, done){
  User.findById(id, function(err, user){
    done(err, user)
  })
})

// Strategy for creating Local Users ::
passport.use('local-signup', new LocalStrategy({
  // :: Map email and password to passports default keys
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true
}, function(req, email, password, done){
  // :: Check for duplicate user
  User.findOne({'local.email': email}, function(err, user){
    if(err) return done(err)
    // :: If Email already exists
    if(user) return done(null, false, req.flash('signupMessage', 'That email is taken.'))
    // :: Create User and redirect them
    var newUser = new User()
    newUser.local.name = req.body.name
    newUser.local.email = req.body.email
    newUser.local.password = newUser.generateHash(password)
    newUser.local.city = req.body.city 
    newUser.local.zipcode = req.body.zipcode
    newUser.local.genre = req.body.genre
    newUser.save(function(err){
      if(err) return console.log(err)
      return done(null, newUser, null)
    })
  })
}))

// Local Login Strategy
passport.use('local-login', new LocalStrategy({
  usernameField: 'email',
  password: 'password',
  passReqToCallback: true
}, function(req, email, password, done){
  User.findOne({'local.email': email}, function(err, user){
    if(err) return done(err)
    if(!user) return done(null, false, req.flash('loginMessage', 'User not found...'))
    if(!user.validPassword(password)) return done(null, false, req.flash('loginMessage', 'Wrong password bro.'))
    return done(null, user)
  })
}))

passport.use(new FacebookStrategy({
  clientID: configAuth.facebook.clientID,
  clientSecret: configAuth.facebook.clientSecret,
  callbackURL: configAuth.facebook.callbackURL,
  profileFields: configAuth.facebook.profileFields
}, function(token, refreshToken, profile, done){
  User.findOne({'facebook.id': profile.id}, function(err, user){
    if(err) return done(err)
    if(user) return done(null, user)
    var newUser = new User()
    newUser.facebook.id = profile.id
    newUser.facebook.token = token
    newUser.facebook.name = profile.displayName
    newUser.facebook.email = profile.emails[0].value
    newUser.save(function(err){
      if(err) return console.log(err)
      return done(null, newUser)
    })
  })
}))

module.exports = passport
