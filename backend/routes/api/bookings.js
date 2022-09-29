const express = require('express');
const { User, SpotImage, Spot, Review, ReviewImage, Booking } = require('../../db/models');
const router = express.Router();
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');


//
// GET ROUTES
//
// GET all bookings for current user
router.get('/current', async(req,res) => {
    const arr = [];
    const bookings = await Booking.findAll({
        where: {
            userId: req.user.id
        },
        include: [ {model: Spot, attributes: ['id', 'ownerId', 'address', 'city', 'state', 'country', 'lat','lng','name','price']}]
    });
    bookings.forEach(ele => {
        arr.push(ele.toJSON())
    });
    // Add the preview image urls to all the spot objects
let count = 0;
for (let i = 0; i < bookings.length; i++) {
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
const bookingsObj = {Bookings:arr}
    res.json(bookingsObj);
});

//
// POST ROUTES
//
// router.post('')






















module.exports = router;
