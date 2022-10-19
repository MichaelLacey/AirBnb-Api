import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { allSpots } from "../../store/allSpots";
import { NavLink } from 'react-router-dom'
import './AllSpots.css';
import { useParams } from "react-router-dom";



export default function AllSpots() {
    
    const dispatch = useDispatch();
    // To listen for change of state. If a spot is added this updates state?

    const spotsObj = useSelector(state => state.spots);
    

    // useSelector returns and object. so lets turn that into an array so we can map through it


    const spots = Object.values(spotsObj);

    /* To run everytime useSelector listening to spots. Dispatch the reducer
     and run the thunk to get all the data */
    useEffect(() => {
        dispatch(allSpots());
    }, [dispatch]);

    // Get all images to render 
    return (
        <div className="allSpots">

            {spots.map(ele => (
            <NavLink key={`a${ele.id}`}to={`/spots/${ele.id}`}>
                <div key={`b${ele.id}`} className='spotCard'>
                    <img key={ele.id} className='spotsImg' src={`${ele.previewImage}`} alt='spotPic'></img>
                    <h2 key={`c${ele.id}`}>{ele.city}, {ele.state}</h2>
                    <h4>{ele.name}</h4>
                    <h4>${ele.price} per night</h4>
                </div>
            </NavLink>
            ))}

        </div>
    );
};