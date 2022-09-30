const express = require('express');
const { User, SpotImage, Spot, Review, ReviewImage, Booking } = require('../../db/models');
const router = express.Router();
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { json } = require('sequelize');

// POST ROUTES
//
// Add an image to a review based on the reviews id
router.post('/:reviewId/images', async (req, res) => {
    const { url } = req.body;

    const review = await Review.findAll({
        include: [{ model: ReviewImage }],
        where: {
            id: req.params.reviewId
        }
    });
    // Error: If the reviewId isnt in the database
    if (!review.length) {
        res.status(404);
        res.json({
            "message": "Review couldn't be found",
            "statusCode": 404
        })
    };
    // console.log(review);
    const arr = [];
    review.forEach(ele => {
        arr.push(ele.toJSON())
    });

    // ERROR if the review has the maximum of 10 img already
    if (arr[0].ReviewImages.length >= 10) {
        res.status(403);
        return res.json({
            "message": "Maximum number of images for this resource was reached",
            "statusCode": 403
        })
    }
    // Create new image
    const revImg = await ReviewImage.create({
        reviewId: req.params.reviewId,
        url
    });
    // push image into the reviews images array
    arr[0].ReviewImages.push(revImg.toJSON());

    const jsonImg = revImg.toJSON();

    // Delete the fields we dont want to see
    delete jsonImg.reviewId;
    delete jsonImg.updatedAt;
    delete jsonImg.createdAt;

    res.json(jsonImg);
});
//
// GET ROUTES
//
// GET all reviews of a current user
router.get('/current', async (req, res) => {
    const arr = [];
    const userReviews = await Review.findAll({
        where: {
            userId: req.user.id
        },
        include: [
            { model: User, attributes: ['id', 'firstName', 'lastName'] }, { model: Spot,attributes: ['id', 'ownerId', 'address', 'city', 'state', 'state', 'country', 'lat', 'lng', 'name', 'price'] }, { model: ReviewImage, attributes: ['id', 'url'] }
        ]
    });
    userReviews.forEach(ele => {
        arr.push(ele.toJSON());
    });
    const imgArr = [];
    let count = 0;
    for (let i = 0; i < userReviews.length; i++) {
        let ele = arr[i];
        let eleId = arr[i].Spot.id;
        const spots = await SpotImage.findAll({
            where: {
                id: eleId
            },
            include: [
                { model: Spot }
            ]
        });
        // Add the url for each ele in the spots object..
        spots.forEach(ele => {
            arr[count].Spot.previewImage = ele.url;
            count++;
        });
    }
    const objArr = {};
    objArr.Reviews = arr
    res.json(objArr)
});
//
// PUT ROUTES
//
const reviewsValidations = [
    check('review')
    .exists({ checkFalsy: true})
    .notEmpty()
    .withMessage("Review text is required"),
    check('stars')
    .exists({ checkFalsy: true})
    .notEmpty()
    .isInt({ min: 1, max: 5 })
    .withMessage("Stars must be an integer from 1 to 5"),
    handleValidationErrors
];
// EDIT a review
router.put('/:reviewId',reviewsValidations, async (req, res) => {
    const { review, stars } = req.body;
    const findReview = await Review.findOne({
        where: { id: req.params.reviewId }
    });
    if (!findReview) {
        res.status(404);
        res.json({
            "message": "Review couldn't be found",
            "statusCode": 404
          });
    };
    findReview.update({
        id: req.params.id,
        userId: req.user.id,
        review,
        stars
    });
    await findReview.save
    res.json(findReview);
});

// Delete a review
router.delete('/:reviewId', async(req,res) => {
    const oldReview = await Review.findOne({
        where: {id: req.params.reviewId}
    });
    if (!oldReview) {
        res.status(404);
        return res.json({
            "message": "Review couldn't be found",
            "statusCode": 404
          })
    };
    await oldReview.destroy();
    res.json({
        "message": "Successfully deleted",
        "statusCode": 200
      })
});


































module.exports = router;
