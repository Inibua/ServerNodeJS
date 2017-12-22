const jwt = require('jsonwebtoken')
const PassportLocalStrategy = require('passport-local').Strategy
const User = require('../models/User')

module.exports = new PassportLocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    session: false,
    passReqToCallback: true
}, (req, username, password, done) => {
    const user = {
        username: username.trim(),
        password: password.trim()
    }
    let savedUser = {

    }
    User.findOne({
        username: user.username
    }).then(userFound => {
        savedUser = userFound

        if (!savedUser || !savedUser.authenticate(user.password)) {
            const error = new Error('Incorrect username or password')
            error.username = 'IncorrectCredentialsError'
            return done(error)
        }
        
        const payload = {
            sub: savedUser.id
        }

        // create a token string
        const token = jwt.sign(payload, 's0m3 r4nd0m str1ng')
        const data = {
            id: savedUser.id,
            username: savedUser.username
        }
        return done(null, token, data)
    })
})
