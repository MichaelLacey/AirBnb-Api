const express = require('express')
const { User, SpotImage, Spot, Review, ReviewImage, Booking } = require('../../db/models');
const router = express.Router();

// const cats = await Cat.findAll({ where: { name: 'Lucy' }, include: Owner })
// cats[0].Owner
// Get routes
// app.patch('/authors/:authorId/books', async (req, res) => {
//     const author = await Author.findOne({
//         include: { model: Book },
//         where: {
//             id: req.params.authorId
//         }
//     });

router.get('/', async (req,res) => {
    console.log("You're in the right url")
    const spots = await Spot.findAll({
        include: [
            {
                model: Review
            },
            {
                model: SpotImage
            }
        ]

    })
    // console.log(spots)
    let spotsList = [];

    spots.forEach(spot => {
        // console.log(spot)
        // console.log(spot.toJSON())
        spotsList.push(spot)
    })
console.log('review: ', spotsList[0].Reviews)

    return res.json(spots)
});




// Post routes


module.exports = router;
