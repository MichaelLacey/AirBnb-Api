const e = require('express');
const express = require('express')
const { User, SpotImage, Spot, Review, ReviewImage, Booking } = require('../../db/models');
const router = express.Router();

//  GET
router.get('/', async (req, res) => {
    const spots = await Spot.findAll({
        attributes: {
            exclude: ['Reviews']
        },
        include: [
            { model: Review },
            { model: SpotImage }
        ],
    })
    let spotsList = [];

    spots.forEach(spot => {
        spotsList.push(spot.toJSON())
    })
    let destroy = 0

    spotsList.forEach(ele => {
        const spotReviews = ele.Reviews;
        const eleImg = ele.SpotImages;
        let sum = 0;
        for (let i = 1; i < spotReviews.length + 1; i++) {
            sum += spotReviews[i - 1].stars;
            ele.avgRating = sum / i;
        };

        for (let i = 0; i < eleImg.length; i++) {
            console.log(eleImg[i]);
            ele.previewImage = eleImg[i].url;
        };

        delete spotsList[destroy].Reviews;
        delete spotsList[destroy].SpotImages;
        destroy++
    })

    return res.json(spotsList);
});




// Post routes


module.exports = router;
