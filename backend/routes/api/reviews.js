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
router.get('/current', async(req,res) => {
    const arr = [];
    const userReviews = await Review.findAll({
        where: {
            userId: req.user.id
        },
        include: [
            { model: User}, { model: Spot}, { model: ReviewImage}
        ]
    });
    userReviews.forEach(ele => {
        arr.push(ele.toJSON());
    });
    //Delete the username in user object
    arr.forEach(ele => {
        delete ele.User.username
    })
    // Delete Description price createdAt updatedAT
    arr.forEach(ele => {
        delete ele.Spot.description;
        delete ele.Spot.createdAt;
        delete ele.Spot.updatedAt;
    });
    // Delete Review Images extra fields;
    const revImg = arr[0].ReviewImages
    revImg.forEach(ele => {
        delete ele.ReviewId;
        delete ele.createdAt;
        delete ele.updatedAt;
        delete ele.reviewId
    });

const imgArr = [];
let count = 0;
for (let i = 0; i < userReviews.length; i++) {
    let ele = arr[i]
    // console.log(ele)
    let eleId = arr[i].Spot.id
    // console.log('Id:', eleId)
    const spots = await SpotImage.findAll({
        where: {
            id: eleId
        },
        include: [
            {model: Spot}
        ]
    })
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





































module.exports = router;
