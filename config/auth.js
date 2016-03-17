// :: Setup Enviroment Variables ::
try {
    require('dotenv').config();
} catch (ex) {
    handleErr(ex);
}

module.exports = {
  'facebook': {
    'clientID': process.env.FACEBOOK_APP_ID,
    'clientSecret': process.env.FACEBOOK_APP_SECRET,
    'callbackURL': 'http://localhost:3000/auth/facebook/callback',
    'profileFields': ['emails', 'displayName']
  }
}
