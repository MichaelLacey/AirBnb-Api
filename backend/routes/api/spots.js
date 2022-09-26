const express = require('express')
const { User, SpotImages, Spot, Reviews, ReviewImages, Booking } = require('../../db/models');
const router = express.Router();

// app.use(express.json())

router.get('/', (req,res) => {
    const spots = Spot.findAll()
    res.json(spots)
})





module.exports = router;
