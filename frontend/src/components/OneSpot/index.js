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
    spotId = parseInt(spotId);

    let spotObj = useSelector(state => state.spots);
    console.log('spotobj', spotObj)
    let spots = Object.values(spotObj);
    console.log('spots--', spots)

    useEffect(() => {
        dispatch(getSpotByid(spotId));
    }, [spotId, dispatch]);
    
    if (!spots.length) {
        console.log('-- no spots length --')
        return null;
    }

    return (

        <div>
            {spots.map(ele => (

                <div key={`b${ele.id}`} className='spotCard'>
                    <img key={ele.id} className='spotsImg' src={`${ele.SpotImages[0].url}`} alt='spotPic'></img>
                    <h2 key={`c${ele.id}`}>{ele.city}, {ele.state}</h2>
                    <h4 key={`d${ele.id}`}>{ele.name}</h4>
                    <h4 key={`e${ele.id}`}>${ele.price} per night</h4>
                </div>
            ))};

        </div>

    );
};
