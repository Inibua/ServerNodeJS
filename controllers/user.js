const User = require('../models/User')
const encryption = require('../utilities/encryption')

module.exports = {
  register: {
    post: (userData) => {
      let salt = encryption.generateSalt()
      userData.salt = salt

      if (userData.password) {
        userData.password = encryption.generateHashedPassword(
          salt,
          userData.password
        )
      }

      User.create(userData)
    }
  },
  login: {
    post: (req, res) => {
      let userData = req.body
      User.findOne({username: userData.username}).then(user => {
        if (!user || !user.authenticate(userData.password)) {
          return res.status(401).send({ message: 'Wrong credentials!' })
        }
        req.logIn(user, (err, user) => {
          if (err) {
            return res.status(401).send({ message: JSON.stringify(req) })
          }

          res.status(200).send(req.user)
        })
      })
    }
  },
  logout: (req, res) => {
    req.logout()
    res.status(200).end()
  },
  profile: {
    get: (req, res) => {
      let userId = req.params.userId

      User.findById(userId).then(user => {
        if (!user) {
          return res.status(404).send({
            message: 'User no longer exists'
          })
        }

        res.status(200).send(user)
      })
    }
  }
}
