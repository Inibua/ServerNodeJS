const mongoose = require('mongoose')

let postSchema = mongoose.Schema({
  title: {
    type: mongoose.Schema.Types.String,
    required: true
  },
  author: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  createdOn: {
    type: mongoose.Schema.Types.Date,
    default: new Date(Date.now()).toISOString()
  },
  postUrl: {type: mongoose.Schema.Types.String, required: true},
  comments: [{type: mongoose.Schema.Types.ObjectId, ref: 'Comment'}],
  likes: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}]
})

const Post = mongoose.model('Post', postSchema)

module.exports = Post
