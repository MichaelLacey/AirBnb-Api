const express = require('express');
const { User, SpotImage, Spot, Review, ReviewImage, Booking } = require('../../db/models');
const router = express.Router();
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { body } = require('express-validator');
const { requireAuth } = require('../../utils/auth.js');
//  GET

const allSpotsVal = [
    check('page')
    .isInt({ min: 1, max:10})
        .exists({ checkFalsy: true })
        .withMessage("Page must be greater than or equal to 1"),
    check('size')
        .exists({ checkFalsy: true })
        // .notEmpty()
        .isInt({ min: 1, max: 20 })
        .withMessage("Size must be greater than or equal to 1"),
    // check('maxLat')
    //     .exists({ checkFalsy: true })
    //     .withMessage('Please provide a first name.'),
    // check('minLat')
    //     .exists({ checkFalsy: true })
    //     .withMessage('Please provide a last name.'),
    check('minPrice')
        .exists({ checkFalsy: true })
        .isInt({ min: 9})
        .withMessage("Minimum price must be greater than or equal to 0"),
        check('maxPrice')
        .exists({ checkFalsy: true })
        .isInt({ min: 0})
        .withMessage("Maximum price must be greater than or equal to 0"),
    handleValidationErrors
];
// ALL SPOTS
router.get('/', async (req, res) => {
    let { page, size, mingLng, maxlng, minprice, maxPrice } = req.query;
    const pagination = {};
    if (!page) {
        page = 1
    }
    if (!size) {
        size = 20
    };
    let offset = size * (page - 1);

    if (page >= 1 && size >= 1) {
        pagination.offset = size * (page - 1);
        pagination.limit = size
    }
    const spots = await Spot.findAll({
        include: [
            { model: Review },
            { model: SpotImage }
        ],
        ...pagination
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
        if (ele.avgRating == 'NaN') {
            ele.avgRating = '0.0'
        };

        for (let i = 0; i < eleImg.length; i++) {
            ele.previewImage = eleImg[i].url;
        };

        delete spotsList[destroy].Reviews;
        delete spotsList[destroy].SpotImages;
        destroy++;
    });

    const newObj = {};
    newObj.Spots = spotsList;
    newObj.Page = page;
    newObj.size = size;
    return res.json(newObj);

});
//
// ALL SPOTS FOR CURRENT USER
//
router.get('/current', requireAuth, async (req, res) => {
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
        if (ele.avgRating == 'NaN') {
            ele.avgRating = '0.0'
        };

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

// GET details of a spot by id
router.get('/:spotId', async (req, res) => {
    const spot = await Spot.findOne({
        include: [
            { model: Review }, { model: User }
        ],
        where: { id: req.params.spotId },
    });
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
    spotImages.forEach(ele => {
        imgArr.push(ele.toJSON());
    });

    if (imgArr.length) {
        imgArr.forEach(ele => {
            delete ele.spotId;
            delete ele.createdAt;
            delete ele.updatedAt;
        });
    };

    let arr = [];
    // To be able to key in and manipulate the spot 'promise'
    arr.push(spot.toJSON());

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
        if (ele.avgStarRating == 'NaN') {
            ele.avgRating = '0.0'
        };

        delete arr[delCount].Reviews;
        delCount++;
        count++;
    });

    const idx = arr[0];
    idx['User'] = idx['Owner']
    delete idx[User];

    console.log(imgArr)
    arr[0].SpotImages = imgArr
    arr[0].Owner = {
        "id": req.user.id,
        "firstName": req.user.firstName,
        "lastName": req.user.lastName
    };
    res.json(arr[0])
})
// GET all reviews by Spot id
router.get('/:spotId/reviews', async (req, res) => {
    const reviews = await Review.findAll({
        include: [
            { model: User, attributes: ['id', 'firstName', 'lastName'] }, { model: ReviewImage, attributes: ['url', 'id'] }
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
        arr.push(ele.toJSON());
    });

    const obj = { Reviews: arr }
    res.json(obj);
})
// Get all bookings for a spot based on spotId
router.get('/:spotId/bookings', async (req, res) => {
    if (req.user) {

        // If you are the owner
        const ownersBooking = await Booking.findAll({
            include: [{ model: User }],
            where: { userId: req.user.id, spotId: req.params.spotId },
        });
        const newArr = [];

        ownersBooking.forEach(ele => {
            newArr.push(ele.toJSON())
        });
        // if you are the owner push it into a structured obj
        if (ownersBooking.length) {
            const obj = {}
            obj.Bookings = [];
            obj.Bookings.push(newArr)
            return res.json(obj);
        };
    }
    // If you are not the owner
    const nonOwnersBookings = await Spot.findAll({
        include: { model: Booking, attributes: ['spotId', 'startDate', 'endDate',] },
        where: { id: req.params.spotId },
        attributes: []
    });
    if (!nonOwnersBookings.length) {
        res.status(404);
        return res.json({
            "message": "Spot couldn't be found",
            "statusCode": 404
        })
    };
    const arr = [];
    nonOwnersBookings.forEach(ele => {
        arr.push(ele.toJSON());
    });
    if (nonOwnersBookings.length) {
        return res.json(arr)
    };

    res.json(ownersBooking)
});
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
        .exists({ checkFalsy: true })
        .notEmpty()
        .withMessage("Review text is required"),
    check('stars')
        .exists({ checkFalsy: true })
        .notEmpty()
        .isInt({ min: 1, max: 5 })
        .exists({ checkFalsy: true })
        .withMessage("Stars must be an integer from 1 to 5"),
    handleValidationErrors
];


//Create new spot
router.post('/', validateSignup, requireAuth, async (req, res) => {
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
router.post('/:spotId/images', requireAuth, async (req, res) => {
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
router.post('/:spotId/reviews', requireAuth, reviewsValidations, async (req, res) => {
    const { review, stars } = req.body;

    const reviewedSpot = await Spot.findAll({
        where: { id: req.params.spotId },
        include: [{ model: Review }]
    });
    // Error if the spot isnt in the database
    if (!reviewedSpot.length) {
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
// CREATE a booking based on spotId
router.post('/:spotId/bookings', requireAuth, async (req, res) => {
    const { startDate, endDate } = req.body;

    const findSpot = await Spot.findAll({
        include: [{ model: Booking }],
        where: { id: req.params.spotId }
    });
    // ERROR HANDLING
    if (!findSpot.length) {
        res.status(404);
        return res.json({
            "message": "Spot couldn't be found",
            "statusCode": 404
        });
    };
    // console.log(findSpot)
    const arr = [];
    findSpot.forEach(ele => {
        arr.push(ele.toJSON())
    });
    const oldBookings = arr[0].Bookings

    const tempEndDate = new Date(endDate)
    const tempStartDate = new Date(startDate)
    for (let i = 0; i < oldBookings.length; i++) {
        const ele = oldBookings[i];
        if (((tempStartDate >= new Date(ele.startDate) && tempStartDate <= new Date(ele.endDate)) || (tempEndDate <= new Date(ele.endDate) && tempEndDate >= new Date(ele.startDate))) || (tempStartDate <= new Date(ele.startDate) && tempEndDate >= new Date(ele.endDate))) {
            res.status(404);
            return res.json({
                "message": "Validation error",
                "statusCode": 400,
                "startDate": "Start date conflicts with an existing booking",
                "endDate": "End date conflicts with an existing booking"
            })
        };
    };

    if (tempStartDate >= tempEndDate) {
        res.status(400);
        return res.json({
            "error": "endDate cannot be on or before startDate",
            "statusCode": 400
        });
    };
    const newBooking = await Booking.create({
        spotId: req.params.spotId,
        userId: req.user.id,
        startDate,
        endDate
    });

    return res.json(newBooking)
})
//
// PUT ROUTES
//

// Edit a spot
router.put('/:spotId', validateSignup, requireAuth, async (req, res) => {
    const { address, city, state, country, lat, lng, name, description, price } = req.body;

    const updateSpot = await Spot.findOne({
        where: { id: req.params.spotId },
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
    updateSpot.save;
    res.json(updateSpot)
});


//
// DELETE
//
router.delete('/:spotId', requireAuth, async (req, res) => {
    const oldSpot = await Spot.findOne({
        where:
            { id: req.params.spotId },
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
});
module.exports = router;
