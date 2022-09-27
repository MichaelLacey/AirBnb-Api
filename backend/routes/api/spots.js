const e = require('express');
const express = require('express');
const { User, SpotImage, Spot, Review, ReviewImage, Booking } = require('../../db/models');
const router = express.Router();
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
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

// const validateSignup = [
//     check('address')
//       .exists({ checkFalsy: true })
//       .withMessage("Street address is required"),
//     check('city')
//       .exists({ checkFalsy: true })
//       .withMessage("City is required"),
//     check('state')
//       .exists({ checkFalsy: true })
//       .withMessage("State is required"),
//     check('country')
//       .exists({ checkFalsy: true })
//       .withMessage("Country is required"),
//     check('lat')
//        .withMessage("Latitude is not valid"),
//     check('lng')
//         .withMessage("Longitude is not valid"),
//     check('name')
//         .isLength({max: 49})
//         .withMessage("Name must be less than 50 characters"),
//     check('description')
//     .exists({ checkFalsy: true })
//         .withMessage("Description is required"),
//     check('price')
//     .exists({ checkFalsy: true })
//         .withMessage("Price per day is required"),
//     handleValidationErrors
//   ];
//Create new spot
router.post('/', async (req, res) => {

    const { address, city, state, country, lat, lng, name, description, price } = req.body;

    const spot = await Spot.create({
        address, city, state, country, lat, lng, name, description, price
    });

    const spots = await Spot.findAll({
        order: [['id', 'DESC']],
        limit: 1
    });

    spots[0].ownerId = req.user.id
    res.json(spots)
});

router.post('/:spotId/images', async (req, res) => {
    const spotId = req.params.spotId;

    const { url, preview } = req.body;

    const findSpot = await Spot.findByPk(req.params.spotId)

    // ERROR HANDLING
    if (findSpot === null) {
        return res.json({
                    "message": "Spot couldn't be found",
                    "statusCode": 404
                  });
    };
    // CREATE NEW IMG
    const newImg = await SpotImage.create({
        url,
        preview,
        spotId: spotId
    });

    const foundImg = await SpotImage.findOne({
        where: {
            id: newImg.id
        },
        attributes: ['id', 'url', 'preview']
    });


    res.json(foundImg)
});









module.exports = router;
