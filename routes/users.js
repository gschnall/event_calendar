// ONLY USER RELATED ROUTES GO HERE
var
  express = require('express')
  passport = require('passport')
  userRouter = express.Router()
  mongoose = require('mongoose')
  User = require('../models/User.js')
  Event = require('../models/Event.js')

// :Post Event to User
/*
userRouter.route('/addEvent/:id')
  .post(function(req, res){
    User.findOne({_id: req.params.id}, function(err, user){
      if(err) throw err
      var event = new Event(req.body)
      event.save()
      // Push event to users event array
      user.local.events.push(event)
      user.save(function(err, newUser){
        if(err) throw err
        res.json(newUser)
      })
    })
  })
*/

// :Add event to User event array 
userRouter.post('/addEvent', isLoggedIn, function(req, res){
  User.findOne({_id: req.user._id}, function(err, user){
    if(err) throw err
    var event = new Event(req.body)
    event.save()
    //Push event to users event array
    user.local.events.push(event)
    user.save(function(err, newUser){
      if(err) throw err
      res.json(newUser)
    })
  })
})

// :Get User Calendar Events
userRouter.get('/calendar/events', isLoggedIn, function(req, res){
  User.findOne({_id: req.user._id})
    .populate("local.events")
    .exec(function(err, user){
      res.json({userName: user.local.name, userEvents: user.local.events})
    })
})

// :delete event from user event array
userRouter.delete('/calendar/events', isLoggedIn, function(req, res){
  User.findOne({_id: req.user._id}, function(err, user){
    if(err) throw err
    var toRemove = user.local.events.indexOf(req.body.eventId)
    user.local.events.splice(toRemove, 1)
    user.save()
  })
  Event.findOneAndRemove({_id: req.body.eventId}, function(err, user){
    if(err) throw err
  })
  res.json({success:true})
})

// :Update event from user event array Based on Calendar drop/drag/resize
userRouter.patch('/calendar/events', isLoggedIn, function(req, res){
  User.findOne({_id: req.user._id}, function(err, user){
    if(err) throw err
    var toUpdate = user.local.events.indexOf(req.body.eventId)
    user.local.events[toUpdate].start = req.body.eventStart
    if(req.body.eventStop){
      user.local.events[toUpdate].end = req.body.eventStop
    }
    user.save()
  })
  Event.findOne({_id: req.body.eventId}, function(err, event){
    if(err) throw err
    event.start = req.body.eventStart
    if(req.body.eventStop){
      event.end = req.body.eventStop
    }
    event.save()
  })
  res.json({success:true})
})

// :Login
userRouter.route('/login')
  .get(function(req, res){
    res.render('login', {message: req.flash('loginMessage')})
  })
  .post(passport.authenticate('local-login', {
    successRedirect: '/profile',
    failureRedircct: '/login'
  }))
//:Signup
userRouter.route('/signup')
  .get(function(req, res){
    res.render('signup', {message: req.flash('signupMessage')})
  })
  .post(passport.authenticate('local-signup', {
    successRedirect: '/profile',
    failureRedirect: '/signup'
  }))
// :Profile
userRouter.get('/profile', isLoggedIn, function(req, res){
  res.render('profile', {userName: req.user.local.name})
})
// :Logout
userRouter.get('/logout', function(req, res){
  req.logout()
  res.redirect('/')
})

userRouter.get('/auth/facebook', passport.authenticate('facebook', {
  scope: ['email']
}))

userRouter.get('/auth/facebook/callback', passport.authenticate('facebook', {
  successRedirect: '/profile',
  failureRedircct: '/login'
}))

function isLoggedIn(req, res, next){
  if(req.isAuthenticated()) return next()
  res.redirect('/login')
}

module.exports = userRouter
