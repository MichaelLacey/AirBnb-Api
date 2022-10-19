import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSpotByid } from "../../store/allSpots";
import { NavLink } from 'react-router-dom'
import './OneSpot.css';
import { useParams } from "react-router-dom";

export default function OneSpot() {
    // Grab spotid from url
    let{ spotId } = useParams();
    // Turn spot id into an integer not a string
    spotId = parseInt(spotId);
    console.log('spot Id', spotId);

    const spotObj = useSelector(state=> state.spots);
    console.log('spotObj component', spotObj)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getSpotByid(spotId))
    }, [spotId])

    
    console.log('spotObj', spotObj)
    return (
            <div>

            </div>
    );
};