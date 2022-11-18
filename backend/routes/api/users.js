const express = require('express');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');

const router = express.Router();
// Holds the routes /api/users

const validateSignup = [
  check('email')
    .exists({ checkFalsy: true })
    .isEmail()
    .withMessage('Please provide a valid email.'),
  check('username')
    .exists({ checkFalsy: true })
    .isLength({ min: 4, max: 20 })
    .withMessage('Please provide a username between 4 and 20 characters.'),
  check('firstName')
    .isLength({ min: 4 })
    // .exists({ checkFalsy: true })
    .withMessage('Please provide a first name between 4 and 25 characters.'),
  check('lastName')
    .isLength({ min: 4, max: 25 })
    // .exists({ checkFalsy: true })
    .withMessage('Please provide a last name between 4 and 25 characters.'),
  check('password')
    .exists({ checkFalsy: true })
    .isLength({ min: 6 })
    .withMessage('Password must be 6 characters or more.'),
  handleValidationErrors
];
// Sign up
router.post(
  '/',
  validateSignup,
  async (req, res) => {
    const { email, password, username, firstName, lastName } = req.body;
    const user = await User.signup({ email, username, password, firstName, lastName });
    const theToken = await setTokenCookie(res, user);

    const arr = [user.toJSON()];
    delete arr[0].createdAt;
    delete arr[0].updatedAt;
    arr[0].token = theToken;
    return res.json(
      arr[0]
    );
  }
);



module.exports = router;
