import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSpotByid } from "../../store/spots";
import './OneSpot.css';
import { useParams } from "react-router-dom";
import { getReviewsThunk } from "../../store/reviews";
import { useHistory } from "react-router-dom";

export default function OneSpot() {
    const dispatch = useDispatch();
    const history = useHistory();

    // Grab spotid from url
    let { spotId } = useParams();
    // Turn spot id into an integer not a string

    let spot = useSelector(state => state.spots[spotId]);
    useEffect(() => {
        dispatch(getSpotByid(spotId));
    }, [spotId, dispatch]);


    // Listen for reviews change of state. How we get reviews
    let reviews = useSelector(state => state.reviews)
    console.log('review from use selector', reviews)
    
    useEffect(() => {
        dispatch(getReviewsThunk(spotId))
    }, [spotId, dispatch]);
    
    /* -- Button to redirect user to reviews page!! Make it a modal to be easy -- */
    const getReviews = (e) => {
        e.preventDefault();
        history.push(`/api/spots/${spotId}/reviews`)
    };
    
    // Buying time to have something to render the page with. Without this
    // The page will be a blank screen until a hard refresh
    if (!spot || !spot.SpotImages) return null;
    return (

        <div className="onespotcarddiv">
            <div className='onespotCard'>
                <img className='spotsImg' src={spot.SpotImages[0]?.url} alt='spotPic'></img>
                <h3 >{spot.city}, {spot.state} ★{spot.avgStarRating}</h3>
                <h4 >{spot.name}</h4>
                <h4 >${spot.price} per night</h4>
                <button onClick={getReviews}>Reviews</button>
            </div>
        </div>
    );
};
