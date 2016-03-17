// :: Setup Enviroment Variables ::
try {
    require('dotenv').config();
} catch (ex) {
    handleErr(ex);
}

var Yelp = require('yelp');

var yelp = new Yelp({
  consumer_key: process.env.YELP_KEY,
  consumer_secret: process.env.YELP_SECRET,
  token: process.env.YELP_TOKEN,
  token_secret: process.env.YELP_SECRET_TOKEN
})


module.exports = yelp
