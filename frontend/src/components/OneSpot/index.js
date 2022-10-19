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

    let spotObj = useSelector(state => state);
    // console.log('spotObj ---', spotObj)


    let spots = Object.values(spotObj);
    console.log('spots--', spots)
    spots = spots[1][1]
    console.log('spots2', spots)


    let arr = [];
    if (spots) {
        arr.push(spots)
        console.log('arrrrr', arr)
    }



    useEffect(() => {
        dispatch(getSpotByid(spotId));
    }, [spotId, dispatch]);


    return (
        <div>
            {spots.map(ele => (

                <div key={`b${ele.id}`} className='spotCard'>
                    <img key={ele.id} className='spotsImg' src={`${ele.previewImage}`} alt='spotPic'></img>
                    <h2 key={`c${ele.id}`}>{ele.city}, {ele.state}</h2>
                    <h4 key={`d${ele.id}`}>{ele.name}</h4>
                    <h4 key={`e${ele.id}`}>${ele.price} per night</h4>
                </div>
            ))};

        </div>

    );
};
// {spots.map(ele => (

//     <div key={`b${ele.id}`} className='spotCard'>
//         <img key={ele.id} className='spotsImg' src={`${ele.previewImage}`} alt='spotPic'></img>
//         <h2 key={`c${ele.id}`}>{ele.city}, {ele.state}</h2>
//         <h4 key={`d${ele.id}`}>{ele.name}</h4>
//         <h4 key={`e${ele.id}`}>${ele.price} per night</h4>
//     </div>
// ))};


/* <div className='spotCard'>
    <img className='spotsImg' src={spots.spotImages.url} alt='spotPic'></img>
    <h2 >{spots.city}, {spots.state}</h2>
    <h4 >{spots.name}</h4>
    <h4 >${spots.price} per night</h4>
</div> */