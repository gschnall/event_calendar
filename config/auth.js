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
    'callbackURL': 'https://ventcal.herokuapp.com/auth/facebook/callback',
    'profileFields': ['emails', 'displayName']
  }
}
