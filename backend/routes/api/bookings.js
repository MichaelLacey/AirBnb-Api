const express = require('express');
const { User, SpotImage, Spot, Review, ReviewImage, Booking } = require('../../db/models');
const router = express.Router();
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');


//
// GET ROUTES
//
// GET all bookings for current user


router.get('/current', async (req, res) => {
    const arr = [];
    const bookings = await Booking.findAll({
        where: {
            userId: req.user.id
        },
        include: [{ model: Spot, attributes: ['id', 'ownerId', 'address', 'city', 'state', 'country', 'lat', 'lng', 'name', 'price'] }]
    });
    bookings.forEach(ele => {
        arr.push(ele.toJSON())
    });

    // Add the preview image urls to all the spot objects
    for (let i = 0; i < arr.length; i++) {
        let ele = arr[i];
        let eleId = arr[i].Spot.id;
        const spots = await SpotImage.findOne({
            where: {
                spotId: eleId
            },
        });
        if (!spots) {

        }
        else{
            arr[i].Spot.PreviewImage = spots.url
        };

    }
    const bookingsObj = { Bookings: arr };
    res.json(bookingsObj);
});

//
// PUT ROUTES
//
//Edit a booking
router.put('/:bookingId', async (req, res) => {
    const { startDate, endDate } = req.body;

    const updateBooking = await Booking.findOne({
        where: { id: req.params.bookingId }
    })
    if (!updateBooking) {
        res.status(404);
        return res.json({
            "message": "Booking couldn't be found",
            "statusCode": 404
        })
    };
    updateBooking.update({
        startDate,
        endDate,
        userId: req.user.id
    })
    await updateBooking.save
    res.json(updateBooking)
});

//
// DESTROY ROUTES
//
// Delete a booking
router.delete('/:bookingId', async (req, res) => {
    const oldBooking = await Booking.findOne({
        where: {id: req.params.bookingId}
    });
    if (oldBooking === null) {
        res.status(404);
        return res.json({
            "message": "Booking couldn't be found",
            "statusCode": 404
        });
    };
    await oldBooking.destroy();
    res.json({
        "message": "Successfully deleted",
        "statusCode": 200
    });

});





















module.exports = router;
