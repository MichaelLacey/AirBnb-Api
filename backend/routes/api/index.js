// GET /api/restore-user
const router = require('express').Router();
const { SpotImage, Spot, Review, ReviewImage, Booking } = require('../../db/models');
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
const spotsRouter = require('./spots.js');
const reviewsRouter = require('./reviews.js')
const bookingsRouter = require('./bookings')
const { restoreUser } = require("../../utils/auth.js");

// Connect restoreUser middleware to the API router
// If current user session is valid, set req.user to the user in the database
// If current user session is not valid, set req.user to null
router.use(restoreUser);
// Connect all the routers
router.use('/session', sessionRouter);
router.use('/users', usersRouter);
router.use('/spots', spotsRouter);
router.use('/reviews', reviewsRouter);
router.use('/bookings', bookingsRouter);

//Delete routes in here bc why make a whole router for a couple deletes.
//Delete spotImages
router.delete('/spot-images/:imageId', async (req, res) => {
  const oldImage = await SpotImage.findOne({
    where: { id: req.params.imageId }
  });
  console.log(oldImage)
  if (oldImage === null) {
    res.status(404);
    return res.json({
      "message": "Spot Image couldn't be found",
      "statusCode": 404
    });
  };

  await oldImage.destroy();
  res.json({
    "message": "Successfully deleted",
    "statusCode": 200
  });
  res.json('stest')
});
// Delete review images
router.delete('/review-images/:imageId', async(req,res) => {
  const oldReview = await ReviewImage.findOne({
    where: { id: req.params.imageId }
  });
  if (oldReview === null) {
    res.status(404);
    return res.json({
      "message": "Review Image couldn't be found",
      "statusCode": 404
    });
  };

  await oldReview.destroy();
  res.json({
    "message": "Successfully deleted",
    "statusCode": 200
  });
  res.json('test')
});








router.post('/test', (req, res) => {
  res.json({ requestBody: req.body });
});

// GET /api/set-token-cookie
const { setTokenCookie } = require('../../utils/auth.js');
const { User } = require('../../db/models');
const { Router } = require('express');

router.get('/set-token-cookie', async (_req, res) => {
  const user = await User.findOne({
    where: {
      username: 'Demo-lition'
    }
  });
  setTokenCookie(res, user);
  return res.json({ user });
});

router.get(
  '/restore-user',
  (req, res) => {
    return res.json(req.user);
  }
);

// const { requireAuth } = require('../../utils/auth.js');
// router.get(
//   '/require-auth',
//   requireAuth,
//   (req, res) => {
//     return res.json(req.user);
//   }
// );

module.exports = router;
