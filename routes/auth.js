const express = require('express')
const passport = require('passport')
const router = express.Router()

// @desc  Auth with Google
// @route GET /auth/google
router.get('/google', passport.authenticate('google', { scope: ['profile'] }))

// @desc  Google auth callback
// @route GET /auth/google/callback
router.get('/google/callback', passport.authenticate('google', {failureRedirect: '/'}), (req, res) => {
  res.redirect('/dashboard')
 }
)

// @desc Logout User
// @route /auth/logout
// ! Passport 0.6 requires logot to be async function, unlike what Traversy does
router.get('/logout', (req, res, next) => {
  req.logout((err) => {
    if (err) {return next(err)}
    res.redirect('/')
  })
})

module.exports = router