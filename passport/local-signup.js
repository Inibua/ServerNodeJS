const PassportLocalStrategy = require('passport-local').Strategy
const userController = require('../controllers/user')
const User = require('../models/User')

module.exports = new PassportLocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    session: false,
    passReqToCallback: true
}, (req, username, password, done) => {
    const user = {
        password: password.trim(),
        username: req.body.username.trim()
    }
    let user2 = User.findOne({
        username: req.body.username.trim()
    }).then(user2 => {
        if (user2) {
            const error = new Error('This username is already taken!')
            return done(error)
        }
        userController.register.post(user)
    })
    return done(null)
})
