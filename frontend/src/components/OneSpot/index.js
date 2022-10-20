import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSpotByid } from "../../store/spots";
import './OneSpot.css';
import { useParams } from "react-router-dom";

export default function OneSpot() {
    const dispatch = useDispatch();

    // Grab spotid from url
    let { spotId } = useParams();
    // Turn spot id into an integer not a string

    let spot = useSelector(state => state.spots[spotId]);
   console.log('spotttt', spot)
    useEffect(() => {
        dispatch(getSpotByid(spotId));
    }, [spotId, dispatch]);
    // Buying time to have something to render the page with. Without this
    // The page will be a blank screen until a hard refresh
    if (!spot || !spot.SpotImages) return null;

    return (

        <div>
            <div className='spotCard'>
                <img className='spotsImg' src={spot.SpotImages[0]?.url} alt='spotPic'></img>
                <h2 >{spot.city}, {spot.state}</h2>
                <h4 >{spot.name}</h4>
                <h4 >${spot.price} per night</h4>
            </div>
        </div>
    );
};
