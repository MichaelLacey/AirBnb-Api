import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { allSpots } from "../../store/allSpots";
import './AllSpots.css';




export default function AllSpots() {
    const dispatch = useDispatch();
    // To listen for change of state. If a spot is added this updates state?
 
    const spotsObj = useSelector(state => state.spots);
    // console.log('spotsObj ---', spotsObj)

    // useSelector returns and object. so lets turn that into an array so we can map through it
    const spots = Object.values(spotsObj)
    console.log('spots][]][][][][', spots)

    /* To run everytime useSelector listening to spots. Dispatch the reducer
     and run the thunk to get all the data */
    useEffect(() => {
        dispatch(allSpots());
    }, [dispatch]);

    // Get all images to render 
    return (
        <div className="allSpots">

                {spots.map(ele => (

                        <img key={ele.id} className='spotsImg' src={`${ele.previewImage}`}></img>
                                               
                        ))}
                        

        </div>
    );
};