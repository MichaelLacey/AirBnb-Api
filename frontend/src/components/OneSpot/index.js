import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSpotByid } from "../../store/spots";
import './OneSpot.css';
import './Reviews.css'
import { useParams } from "react-router-dom";
import { getReviewsThunk } from "../../store/reviews";
import { Modal } from '../../context/Modal';

export default function OneSpot() {
    const dispatch = useDispatch();
    const [showModal, setShowModal] = useState(false);
    // Grab spotid from url
    let { spotId } = useParams();
    // Turn spot id into an integer not a string

    let spot = useSelector(state => state.spots[spotId]);
    useEffect(() => {
        dispatch(getSpotByid(spotId));
    }, [spotId, dispatch]);
    console.log('spot[][][]', spot)
    // 
    // Listen for reviews change of state. How we get reviews
    let reviews = useSelector(state => state.Reviews)

    let reviewsArr = Object.values(reviews)
    console.log('reviews ARRR ', reviewsArr)
    useEffect(() => {
        dispatch(getReviewsThunk(spotId))
    }, [spotId, dispatch]);

    // Buying time to have something to render the page with. Without this
    // The page will be a blank screen until a hard refresh
    if (!spot || !spot.SpotImages) return null;

    /*--- Grabbing the spot images array! ---*/
    const spotImgArr = [];
    if (spot || spot.SpotImages) {
        const spotImages = spot.SpotImages;
        console.log('spotImages', spotImages)
        spotImages.forEach(ele => spotImgArr.push(ele.url))
        console.log('spotImgArr', spotImgArr)
        while (spotImgArr.length < 11) {
            let url = 'https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg?20200913095930'
            spotImgArr.push(url)
        };
    };

    return (
        <>
            <div className="onespotcarddiv">

                <div className='onespotCard'>
                    <img className='spotsImg' src={spot.SpotImages[0]?.url} alt='spotPic'></img>

                    <div className="topRowDivOneSpot">
                        <h3 className="spotCityState">{spot.city}, {spot.state}</h3>
                        <h3 className="avgStarRatingSpot"> ★{spot.avgStarRating} </h3>
                    </div>

                    <h5 className="h4PerNightSpotname"> {spot.name} </h5>
                    <h5 className="h4PerNight">${spot.price} per night</h5>
                </div>

            <div className="oneSpotExtraPics">
            <img className='extraSpotPics' src={spotImgArr[1]} alt='spotPic'></img>
            <img className='extraSpotPics' src={spotImgArr[2]} alt='spotPic'></img>
            <img className='extraSpotPics' src={spotImgArr[3]} alt='spotPic'></img>
            <img className='extraSpotPics' src={spotImgArr[4]} alt='spotPic'></img>
            </div>

            </div>
            <button className='oneSpotReviewBtn' onClick={() => setShowModal(true)}>Reviews</button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <div className="bigReviewDiv">
                        <div className="leftReviewModal">
                            <h1> {spot.name}</h1>
                            <h2 className="h2ForSpot">★{spot.avgStarRating} ·{spot.numReviews} Reviews</h2>
                        </div>

                        <div className="reviewsDiv">
                            {reviewsArr.map(ele => (
                                <div className="reviewCard">
                                    <h2 className="revNames">{ele.User.firstName} {ele.User.lastName}</h2>
                                    <h3 className="revRating">Rating: ★ {ele.stars}</h3>
                                    <h4 className="revDate">{ele.createdAt.slice(0, 10)}</h4>
                                    <p> {ele.review} </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </Modal>
            )}
        </>
    );
};

