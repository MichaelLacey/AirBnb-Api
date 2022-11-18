import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { allSpots } from "../../store/spots";
import { Link } from 'react-router-dom'
import './AllSpots.css'

export default function AllSpots() {
    const dispatch = useDispatch();

    // To listen for change of state. If a spot is added this updates state?
    const spots = Object.values(useSelector(state => state.spots));

    /* To only run one time. useSelector picks up the state of the spots after */
    useEffect(() => {
        dispatch(allSpots());
    }, [dispatch]);
    
    // Get all images to render 
    return (
        <div className="allSpots">
            {spots.map(ele => (
                    <Link className='linkClass' key={`a${ele.id}`} style={{ textDecoration: 'none' }} to={`/spots/${ele.id}`}>
                        <div key={`b${ele.id}`} className='spotCard'>
                            <img key={ele.id} className='spotsImg' src={`${ele.previewImage}`} alt='spotPic'></img>

                            <div className="topRowDivski" key={`f${ele.id}`}>
                                <h4 className='allSpotsH3' key={`c${ele.id}`}>{ele.city}, {ele.state}</h4>
                                <h4 className="avgRatingAllSpots"key={`g${ele.id}`}>★{ele.avgRating ? ele.avgRating : '0.0'}</h4>
                            </div>

                            <h5 className='allSpotsH4' key={`d${ele.id}`}>{ele.name}</h5>
                            <h5 className="pricePerNight" key={`e${ele.id}`}>${Number(ele.price).toFixed(2)} per night</h5>
                        </div>
                    </Link>
            ))}

        </div>
    );
};


