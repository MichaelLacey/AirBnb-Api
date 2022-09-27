const e = require('express');
const express = require('express')
const { User, SpotImage, Spot, Review, ReviewImage, Booking } = require('../../db/models');
const router = express.Router();

//  GET

// ALL SPOTS
router.get('/', async (req, res) => {
    const spots = await Spot.findAll({
        include: [
            { model: Review },
            { model: SpotImage }
        ],
    })
    const spotsList = [];

    spots.forEach(spot => {
        spotsList.push(spot.toJSON());
    })
    let destroy = 0

    spotsList.forEach(ele => {
        const spotReviews = ele.Reviews;
        const eleImg = ele.SpotImages;

        let sum = 0;
        let count = 0;
        for (let i = 1; i < spotReviews.length + 1; i++) {
            sum += spotReviews[i - 1].stars;
            count++;
        };
        ele.avgRating = (sum / count).toFixed(1);

        for (let i = 0; i < eleImg.length; i++) {
            ele.previewImage = eleImg[i].url;
        };

        delete spotsList[destroy].Reviews;
        delete spotsList[destroy].SpotImages;
        destroy++
    })

    return res.json(spotsList);
});

// ALL SPOTS FOR CURRENT USER
router.get('/current', async (req, res) => {

})

// Post routes

//Create new spot
router.post('/', async (req,res) => {
    const { address, city, state, country, lat, lng, name, description, price } = req.body;

    const newSpot = await Spot.create({
        address, city, state, country, lat, lng, name, description, price
    });
    const spots = await Spot.findAll({
        order: [['id','DESC']],
        limit: 1
    });
    // HOW TO GET OWNERid
    console.log(newSpot)
    // console.log(spots)
    res.json(spots)
});

router.post('/spots/:spotId/images', async (req, res) => {
    const { url, preview } = req.body;

    const findSpot = await Spot.findByPk(req.params.spotId)

    // console.log(findSpot)
    const newImg = await SpotImage.create({

    })
})









module.exports = router;
