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






































module.exports = router;
