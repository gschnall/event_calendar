// ONLY USER RELATED ROUTES GO HERE
var
  express = require('express')
  passport = require('passport')
  userRouter = express.Router()

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
  res.render('profile', {user: req.user})
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
