// import React, { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useParams } from "react-router-dom";
// import './Spot.css';
// import { getSingleSpot } from "../../store/allSpots";

// export default function getSpotByid() {

//     const dispatch = useDispatch();
//     const { spotId } = useParams();
//     console.log('Spot id---', spotId) 
    
//     useEffect(() => {
//         dispatch(getSingleSpot(spotId))
//     }, [dispatch])




//     return (
//         <div className="SpotById">
//             <h2>Spot by id</h2>
//         </div>
//     )
// };