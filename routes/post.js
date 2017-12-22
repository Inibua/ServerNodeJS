const express = require('express')
const postController = require('../controllers/post')

const router = new express.Router()

function validatePostForm (payload) {
  const errors = {}
  let isFormValid = true
  let message = ''

  if (!payload || typeof payload.title !== 'string' || payload.title.length < 3) {
    isFormValid = false
    errors.make = 'Make must be more than 3 symbols.'
  }

  if (!isFormValid) {
    message = 'Check the form for errors.'
  }

  return {
    success: isFormValid,
    message,
    errors
  }
}

router.post('/create', (req, res) => {
    postController.add.post(req, res)
} )

router.post('/addLike', (req, res) => {
    postController.addLike.post(req, res)
} )

router.post('/removeLike', (req, res) => {
    postController.removeLike.post(req, res)
} )

router.get('/all', (req, res) => {
    postController.getAllPosts.get(req, res)
})

module.exports = router
