const Comment = require('../models/Comment')
const Post = require('../models/Post')

module.exports = {
    getPostComments: {
        get: (req, res) => {
            let postId = req.params.postId

            Comment.find({
                    post: postId
                })
                .sort({
                    createdOn: 1
                })
                .populate('author')
                .then(comments => {
                    res.status(200).send(comments)
                })
        },
        post: (req, res) => {
            let userId = req.body.author
            let postId = req.body.postId
            let content = req.body.content
            if (content.length < 1) {
                return res.status(401).send({
                    message: 'Content cannot be empty'
                })
            } else {
                let commentData = {
                    author: userId,
                    post: postId,
                    content: req.body.content
                }
                Comment.create(commentData).then(comment => {
                    Post.findById(postId).then(post => {
                        post.comments.push(comment._id)
                        post.save()
                    })
                    res.status(200).send({
                        comment
                    })
                }).catch(function (error) {
                    console.error(error)
                })
                /*console.log(error) - should be used in dev mode*/

            }
        }
    }
}
