const passport = require('passport');
const User = require('../models/user');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.serializeUser(async function (user, done) {
  /*
  From the user take just the id (to minimize the cookie size) and just pass the id of the user
  to the done callback
  PS: You dont have to do it like this its just usually done like this
  */
  const getUser = await User.findOne({ email: user.email })
  done(null, getUser.email);
});

passport.deserializeUser(async function (user, done) {
  /*
  Instead of user this function usually recives the id 
  then you use the id to select the user from the db and pass the user obj to the done callback
  PS: You can later access this data in any routes in: req.user
  */
 const getUsers = await User.findOne({ email: user.email })
  done(null, getUsers);
});

passport.use(new GoogleStrategy({
  clientID: "10247334101-c4ffdu3sbhactgao15t9i0d5llhuce66.apps.googleusercontent.com",
  clientSecret: "euznOupYMvKpcuw1t2gZ1PVS",
  callbackURL: "http://localhost:3000/login/gg/cb"
},
  async function (accessToken, refreshToken, profile, done) {
    const isUserExist = await User.findOne({ email: profile.emails[0].value })
    const user = {
      firstName: profile.name.familyName,
      lastName: profile.name.givenName,
      email: profile.emails[0].value,
      password: "ThisismyPassworkd",
      avtar: profile.photos[0].value
    }
    if (isUserExist) {
      return done(null, user);
    } else {
      await User(user).save()
      return done(null, user)
    }
  }
));