import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSpotByid } from "../../store/spots";
import './OneSpot.css';
import './Reviews.css'
import { useParams } from "react-router-dom";
import { getReviewsThunk, deleteReviewThunk } from "../../store/reviews";
import { Modal } from '../../context/Modal';
import EditSpot from "../EditSpot";
import EditDelSpot from "../EditDelSpot";
import CreateAReviewModal from "../CreateReview";

export default function OneSpot() {
    const dispatch = useDispatch();
    const [showModal, setShowModal] = useState(false);
    // Grab spotid from url
    let { spotId } = useParams();
    // Turn spot id into an integer not a string

    // Grab user of the session
    let sessionUserObject = useSelector(state => state.session.user);

    let spot = useSelector(state => state.spots[spotId]);
    useEffect(() => {
        console.log('use effect ran with spotId dependecy')
        dispatch(getSpotByid(spotId));
    }, [spotId,  dispatch]);
    

    // Listen for reviews change of state. How we get reviews
    const reviewsArr = Object.values(useSelector(state => state.Reviews))
    console.log('reviews state useSelector---', reviewsArr);

    useEffect(() => {
        console.log('getting reviews for spot id ...');
        dispatch(getReviewsThunk(spotId));
    }, [spotId, dispatch]);
  
    // Buying time to have something to render the page with. Without this
    // The page will be a blank screen until a hard refresh
    if (!spot || !spot.SpotImages) return null;

    /*--- Grabbing the spot images array! ---*/
    const spotImgArr = [];
    if (spot) {
        const spotImages = spot.SpotImages;
        spotImages.forEach(ele => spotImgArr.push(ele.url))
        // Fill image array with 'image not found' sources to populate the page with something if no other images found
        while (spotImgArr.length < 10) {
            let url = 'https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg?20200913095930';
            spotImgArr.push(url);
        };
    };


    return (
        <>
            <div className="onespotcarddiv">

                <div className='onespotCard'>

                    <img className='spotsImg' src={spotImgArr[0]} alt='spotPic'></img>

                    <div className="topRowDivOneSpot">
                        <h3 className="spotCityState">{spot.city}, {spot.state}</h3>
                        <h3 className="avgStarRatingSpot"> ★{reviewsArr.length > 0 ? spot.avgStarRating : 0.0} </h3>
                    </div>

                    <h5 className="h4PerNightSpotname"> {spot.name} </h5>
                    <h5 className="h4PerNight">${Number(spot.price).toFixed(2)} per night</h5>
                    <p className="spotDescription">{spot.description}</p>
                </div>

                <div className="oneSpotExtraPics">
                    <img className='extraSpotPics' src={spotImgArr[1]} alt='spotPic'></img>
                    <img className='extraSpotPics' src={spotImgArr[2]} alt='spotPic'></img>
                    <img className='extraSpotPics' src={spotImgArr[3]} alt='spotPic'></img>
                    <img className='extraSpotPics' src={spotImgArr[4]} alt='spotPic'></img>
                </div>

            </div>
            <button className='oneSpotReviewBtn' onClick={() => setShowModal(true)}>Reviews</button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <div className="bigReviewDiv">
                        <div className="leftReviewModal">
                            <h1> {spot.name}</h1>
                            <h2 className="h2ForSpot">★{reviewsArr.length > 0 ? spot.avgStarRating : ''} ·{reviewsArr.length > 0 ? spot.numReviews : 0} Reviews</h2>
                        </div>

                        <div className="reviewsDiv">
                            {reviewsArr.map(ele => (
                                
                                <div className="reviewCard" key={`e${ele.id}`}>
                                    <h2 className="revNames" key={`a${ele.id}`}>{ele.User.firstName} {ele.User.lastName}</h2>
                                    <h3 className="revRating" key={`b${ele.id}`}>Rating: ★ {ele.stars}</h3>
                                    <h4 className="revDate" key={`c${ele.id}`}>{ele.createdAt.slice(0, 10)}</h4>
                                    <p key={`d${ele.id}`}> {ele.review} </p>
                                    {sessionUserObject?.id === ele.User?.id &&
                                        <button className="deleteRevBtn" onClick={() => dispatch(deleteReviewThunk(ele.id))} key={ele.id}>Delete review</button>
                                    }
                                </div>
                            ))}
                        </div>
                    </div>
                </Modal>
            )}
            <CreateAReviewModal />
            {sessionUserObject?.id === spot.ownerId &&
                <div className="userEditDel">
                    < EditSpot />
                    < EditDelSpot />
                </div>
            }

        </>
    );
};

