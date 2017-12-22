const mongoose = require('mongoose')

let commentSchema = mongoose.Schema({
  author: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  content: {type: mongoose.Schema.Types.String, required: true},
  createdOn: {
    type: mongoose.Schema.Types.Date,
    default: new Date(Date.now()).toISOString()
  },
  post: {type: mongoose.Schema.Types.ObjectId, ref: 'Post'}
})

const Comment = mongoose.model('Comment', commentSchema)

module.exports = Comment
