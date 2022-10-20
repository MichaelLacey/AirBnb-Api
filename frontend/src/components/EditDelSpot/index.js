// import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import './EditDel.css';
import { deleteSpotThunk } from "../../store/spots";
// import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";

export default function EditDelSpot() {
    const dispatch = useDispatch();
    const history = useHistory();

    let spotObj = useSelector(state => state.spots);
    let spots = Object.values(spotObj);
    const spot = spots[0]

    const submitDelete = (e) => {
        e.preventDefault();
        dispatch(deleteSpotThunk(spot.id));
        history.push(`/`);
    }


    return (
        <div>
            <h2>Delete Spot component</h2>
            <button onClick={submitDelete}>DELETE</button>
        </div>
    );
};