import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { allSpots } from "../../store/spots";
import { Link } from 'react-router-dom'
import './AllSpots.css'

export default function AllSpots() {
    const dispatch = useDispatch();

    // To listen for change of state. If a spot is added this updates state?
    const spotsObj = useSelector(state => state.spots);

    // useSelector returns and object. so lets turn that into an array so we can map through it
    const spots = Object.values(spotsObj);
    console.log('spots in allSpots component ---', spots)
    /* To run everytime useSelector listening to spots. Dispatch the reducer
     and run the thunk to get all the data */
    useEffect(() => {
        dispatch(allSpots());
    }, [dispatch]);

    // Get all images to render 
    return (
        <div className="allSpots">
            {spots.map(ele => (
                <>
                    <Link className='linkClass' key={`a${ele.id}`} to={`/spots/${ele.id}`}>
                        <div key={`b${ele.id}`} className='spotCard'>
                            <img key={ele.id} className='spotsImg' src={`${ele.previewImage}`} alt='spotPic'></img>

                            <div className="topRowDivski">
                                <h4 className='allSpotsH3' key={`c${ele.id}`}>{ele.city}, {ele.state}</h4>
                                <h4 className="avgRatingAllSpots">★{ele.avgRating}</h4>
                            </div>

                            <h4 className='allSpotsH4' key={`d${ele.id}`}>{ele.name}</h4>
                            <h4 key={`e${ele.id}`}>${ele.price} per night</h4>
                        </div>
                    </Link>
                </>
            ))}

        </div>
    );
};


