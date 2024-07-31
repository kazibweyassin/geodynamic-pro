// backend/auth/index.js
const express = require('express');
const passport = require('passport');
const OAuth2Strategy = require('passport-oauth2');

const app = express();
const PORT = process.env.PORT || 3001;

passport.use(new OAuth2Strategy({
    authorizationURL: 'https://provider.com/oauth2/authorize',
    tokenURL: 'https://provider.com/oauth2/token',
    clientID: 'CLIENT_ID',
    clientSecret: 'CLIENT_SECRET',
    callbackURL: 'http://localhost:3001/auth/callback'
},
    (accessToken, refreshToken, profile, done) => {
        // Save user profile
        done(null, profile);
    }));

app.use(passport.initialize());

app.get('/auth/callback', passport.authenticate('oauth2', { failureRedirect: '/' }), (req, res) => {
    res.redirect('/');
});

app.listen(PORT, () => {
    console.log(`Auth service listening on port ${PORT}`);
});
