const mongoose = require('mongoose')
const encryption = require('../utilities/encryption')
const User = require('../models/User')

mongoose.Promise = global.Promise

function seedAdmin() {
    User.findOne({
        username: 'admin'
    }).then(user => {
        if (user) {
            return
        }

        let password = 'admin'
        let salt = encryption.generateSalt()
        let hashedPassword = encryption.generateHashedPassword(salt, password)

        let adminData = {
            username: 'admin',
            salt: salt,
            password: hashedPassword,
            roles: ['Admin']
        }

        User.create(adminData).then(admin => {
            console.log(`Seeded admin: ${admin.username}`)
        })
    })
}

module.exports = (envConfig) => {
    mongoose.connect(envConfig.database)

    mongoose.connection.once('open', () => {
        console.log('Connected to MongoDB.')
        mongoose.connection.db.admin().serverStatus(function (error, info) {
            console.log(info.version);
        });
        /*seedAdmin()*/
    })

    mongoose.connection.on('error', () => {
        console.log(
            'Error: Could not connect to MongoDB. Did you forget to run `mongod`?')
    })


}
