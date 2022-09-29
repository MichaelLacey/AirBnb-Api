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
        destroy++;
    });

    const newObj = {};
    newObj.Spots = spotsList;
    return res.json(newObj);

});
//
// ALL SPOTS FOR CURRENT USER
//
router.get('/current', async (req, res) => {
    const newArr = [];
    const userSpots = await Spot.findAll({
        where: {
            ownerId: req.user.id
        },
        include: [
            { model: Review },
            { model: SpotImage }
        ],
    });
    let count = 0;
    let delCount = 0;
    userSpots.forEach(ele => {
        newArr.push(ele.toJSON())
    });
    newArr.forEach(ele => {
        const spotReviews = ele.Reviews;
        const eleImg = ele.SpotImages;
        let sum = 0
        for (let i = 1; i < spotReviews.length + 1; i++) {
            sum += spotReviews[i - 1].stars;
            count++;
        };
        ele.avgRating = (sum / count).toFixed(1);

        for (let i = 0; i < eleImg.length; i++) {
            ele.previewImage = eleImg[i].url;
        };
        delete newArr[delCount].SpotImages;
        delete newArr[delCount].Reviews;
        delCount++;
        count++;
    });
    let newObject = {}
    newObject.Spots = newArr
    res.json(newObject)
});

// Find spot by id
router.get('/:spotId', async (req, res) => {
    const spot = await Spot.findOne({
        include: [
            { model: Review }, { model: User }
        ],
        where:  { id: req.params.spotId },
    });
    console.log('spot   ', spot)
    //Error handling
    if (spot === null) {
        res.status(404)
        return res.json({
            "message": "Spot couldn't be found",
            "statusCode": 404
          });
    };
    // Find spotimages so we can insert them into our res for ordering purposes instead of including in line 95-96
    const spotImages = await SpotImage.findAll({
        where: {
            spotId: req.params.spotId
        },
    })
    const imgArr = [];
    spotImages.forEach(ele => imgArr.push(ele.toJSON()))

    if(imgArr[0]){
        delete imgArr[0].updatedAt;
        delete imgArr[0].createdAt;
    };

    let arr = [];
    // To be able to key in and manipulate the spot 'promise'
    arr.push(spot.toJSON())

    let count = 0;
    let delCount = 0;
    arr.forEach(ele => {
        const spotReviews = ele.Reviews;
        const eleImg = ele.SpotImages;
        let sum = 0
        for (let i = 1; i < spotReviews.length + 1; i++) {
            sum += spotReviews[i - 1].stars;
            count++;
        };
        ele.numReviews = spotReviews.length;
        ele.avgStarRating = (sum / count).toFixed(1);

        delete arr[delCount].Reviews;
        delCount++;
        count++;
    });

    const idx = arr[0];
    idx['User'] = idx['Owner']
    delete idx[User];

    arr[0].SpotImages = imgArr
    arr[0].Owner = {
        "id": req.user.id,
        "firstName": req.user.firstName,
        "lastName": req.user.lastName
    };
    res.json(arr[0])
})
// GET all reviews by Spot id
router.get('/:spotId/reviews', async(req,res)=> {
    const reviews = await Review.findAll({
        include: [
            {model: User}, { model: ReviewImage}
        ],
        where: {
            spotId: req.params.spotId
        },
    });
    //Error handling if theres no spot in the database with the params id
    if (!reviews.length) {
        res.status(404);
        return res.json({
            "message": "Spot couldn't be found",
            "statusCode": 404
          });
    };
    const arr = [];
    reviews.forEach(ele => {
        arr.push(ele.toJSON())
    });
    //Delete the username in user object
    arr.forEach(ele => {
        delete ele.User.username
    });
    // Delete Review Images extra fields;
    const revImg = arr[0].ReviewImages
    revImg.forEach(ele => {
        delete ele.ReviewId;
        delete ele.createdAt;
        delete ele.updatedAt;
        delete ele.reviewId
    });
    const obj = {Reviews:arr}
    res.json(obj)
})

//
// Post routes
//
const validateSignup = [
    check('address')
        .exists({ checkFalsy: true })
        .withMessage("Street address is required"),
    check('city')
        .exists({ checkFalsy: true })
        .withMessage("City is required"),
    check('state')
        .exists({ checkFalsy: true })
        .withMessage("State is required"),
    check('country')
        .exists({ checkFalsy: true })
        .withMessage("Country is required"),
    // check('lat')
    //    .isLatLong()
    //    .withMessage("Latitude is not valid"),
    // check('lng')
    // .isLatLong()
    // .withMessage("Longitude is not valid"),
    check('name')
        .isLength({ max: 49 })
        .withMessage("Name must be less than 50 characters"),
    check('description')
        .exists({ checkFalsy: true })
        .withMessage("Description is required"),
    check('price')
        .exists({ checkFalsy: true })
        .withMessage("Price per day is required"),
    handleValidationErrors
];
const reviewsValidations = [
    check('review')
    .exists({ checkFalsy: true})
    .notEmpty()
    .withMessage("Review text is required"),
    check('stars')
    .notEmpty()
    .isNumeric({ min: 0, max: 5 })
    .exists({checkFalsy:true})
    .withMessage("Stars must be an integer from 1 to 5"),
    handleValidationErrors
];



//Create new spot
router.post('/', validateSignup, async (req, res) => {
    const ownerId = req.user.id
    const { address, city, state, country, lat, lng, name, description, price } = req.body;

    const spot = await Spot.create({
        ownerId, address, city, state, country, lat, lng, name, description, price
    });

    const spots = await Spot.findAll({
        order: [['id', 'DESC']],
        limit: 1
    });

    spots[0].ownerId = req.user.id
    res.status(201)
    res.json(spots)
});
// CREATE NEW IMAGE FOR SPOT
router.post('/:spotId/images', async (req, res) => {
    const spotId = req.params.spotId;

    const { url, preview } = req.body;

    const findSpot = await Spot.findByPk(req.params.spotId)

    // ERROR HANDLING
    if (findSpot === null) {
        res.status(404);
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

// CREATE NEW REVIEW FOR A SPOT
router.post('/:spotId/reviews',reviewsValidations, async(req,res) => {
    const { review, stars } = req.body;

    const reviewedSpot = await Spot.findAll({
        where: {id: req.params.spotId},
        include: [{ model: Review }]
    });
    // Error if the spot isnt in the database
    if(!reviewedSpot.length){
        res.status(404);
        return res.json({
            "message": "Spot couldn't be found",
            "statusCode": 404
        })
};
    const arr = [];
    reviewedSpot.forEach(ele => arr.push(ele.toJSON()));


    const idxArr = arr[0];
    const revArr = idxArr.Reviews;
    // Error handling if user has a review for a spot already
    revArr.forEach(review => {
        // console.log(review)
        // console.log('review userid _-_', review.userId)
        // console.log('req user id', req.user.id)
        if (review.userId === req.user.id) {
            res.status(403)
            return res.json({
                "message": "User already has a review for this spot",
                "statusCode": 403
              })
        }
    });

    // Create new review
    const newReview = await Review.create({
        userId: req.user.id,
        spotId: req.params.spotId,
        review,
        stars
    });
    res.status(201);
    res.json(newReview)
})


//
// PUT ROUTES
//

// Edit a spot
router.put('/:spotId', validateSignup, async(req,res) => {
const { address, city, state, country, lat, lng, name, description, price } = req.body;

    const updateSpot = await Spot.findOne({
        where: {id: req.params.spotId},
    })
    if (updateSpot === null) {
        res.status(404);
        return res.json({
            "message": "Spot couldn't be found",
            "statusCode": 404
          });
    };

    updateSpot.update({
        address,
        city,
        state,
        country,
        lat,
        lng,
        name,
        description,
        price
    })
    res.json(updateSpot)
});


//
// DELETE
//
router.delete('/:spotId', async(req,res) => {
    const oldSpot = await Spot.findOne({
        where:
            {id: req.params.spotId},
        });

    if (oldSpot === null) {
        res.status(404);
        return res.json({
            "message": "Spot couldn't be found",
            "statusCode": 404
          });
        }

        await oldSpot.destroy();
    res.json({
        "message": "Successfully deleted",
        "statusCode": 200
      });
    })
module.exports = router;
