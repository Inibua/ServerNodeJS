const mongoose = require('mongoose')
const encryption = require('../utilities/encryption')

let userSchema = mongoose.Schema({
  username: {
    type: mongoose.Schema.Types.String,
    required: true,
    unique: true
  },
  password: {
    type: mongoose.Schema.Types.String,
    required: true
  },
  salt: {type: mongoose.Schema.Types.String, required: true}

})
userSchema.method({
  authenticate: function (password) {
    let hashedPassword = encryption.generateHashedPassword(this.salt, password)

    return hashedPassword === this.password
  }
})
const User = mongoose.model('User', userSchema)

module.exports = User