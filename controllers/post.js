/*death to all memes*/
const Post = require('../models/Post')
const Comment = require('../models/Comment')
const User = require('../models/User')
module.exports = {
    add: {
        post: (req, res) => {
            let postData = {
                title: req.body.title,
                author: req.body.author /*"5a330eb67808f412e8844ab9"*/ ,
                postUrl: req.body.postUrl,
                likes: []
            }
            Post.create(postData).then(post => {
                res.status(200).send({
                    post
                })
            })
        }
    },
    getAllPosts: {
        get: (req, res) => {
            Post.find({})
                .populate( /*'comments',*/ 'author')
                .sort({
                    createdOn: -1
                })
                .then(posts => {
                    res.status(200).send(posts)
                }).catch((err) => {
                    res.status(400).send(err)
                })
        }
    },
    getUserPosts: {
        get: (req, res) => {
            // Display them in user profile page
        }
    },
    getOnePost: {
        get: (req, res) => {
            let postID = res._postID
            Post.find({
                    id: postID
                })
                .populate('author', 'category', 'comments')
                .then(post => {
                    res.status(200).send(post)
                })
        }
    },
    addLike: {
        post: (req, res) => {
            let userLiked = req.body.userLiked
            let postID = req.body.postId
            Post.findById(postID)
                .then(post => {
                    post.likes = post.likes.concat([userLiked])
                    post.save((err, post) => {
                        if (err) {
                            res.status(500).send(err)
                        }
                        res.status(200).send(post)
                    })
                })
        }
    },
    removeLike: {
        post: (req, res) => {
            let userLiked = req.body.userLiked
            let postID = req.body.postId
            Post.findById(postID)
                .then(post => {
                /*It works*/
                    function removeUserLiked(arr) {
                        let what, a = arguments,
                            L = a.length,
                            ax;
                        while (L > 1 && arr.length) {
                            what = a[--L];
                            while ((ax = arr.indexOf(what)) !== -1) {
                                arr.splice(ax, 1);
                            }
                        }
                        return arr;
                    }  
                    post.likes = removeUserLiked(post.likes, userLiked);
                    post.save((err, post) => {
                        if (err) {
                            res.status(500).send(err)
                        }
                        res.status(200).send(post)
                    })
                })
        }
    }
}
