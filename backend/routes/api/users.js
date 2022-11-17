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
      .isLength({ min: 4 })
      .withMessage('Please provide a username with at least 4 characters.'),
      check('firstName')
      .exists({ checkFalsy: true })
      .withMessage('Please provide a first name.'),
      check('lastName')
      .exists({ checkFalsy: true })
      .withMessage('Please provide a last name.'),
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
