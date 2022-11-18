import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSpotByid } from "../../store/spots";
import './OneSpot.css';
import './Reviews.css'
import { useParams } from "react-router-dom";
import { getReviewsThunk, deleteReviewThunk } from "../../store/reviews";
import { Modal } from '../../context/Modal';
import EditDelSpot from "../EditDelSpot";
import CreateAReviewModal from "../CreateReview";
import EditASpotModal from "../EditSpot";

export default function OneSpot() {
    const dispatch = useDispatch();
    const [showModal, setShowModal] = useState(false);
    // Grab spotid from url
    let { spotId } = useParams();

    // Grab user of the session
    let sessionUserObject = useSelector(state => state.session.user);

    let spot = useSelector(state => state.spots[spotId]);
    useEffect(() => {
        dispatch(getSpotByid(spotId));
    }, [spotId, dispatch]);


    // Listen for reviews change of state. How we get reviews
    const reviewsArr = Object.values(useSelector(state => state.Reviews))

    useEffect(() => {
        dispatch(getReviewsThunk(spotId));
    }, [spotId, dispatch]);

    // Buying time to have something to render the page with. Without this
    // The page will be a blank screen until a hard refresh
    if (!spot || !spot.SpotImages) return null;

    /*--- Grabbing the spot images array! ---*/
    const spotImgArr = [];
    // if (spot) {
        const spotImages = spot.SpotImages;
        spotImages.forEach(ele => spotImgArr.push(ele.url))
        // Fill image array with 'image not found' sources to populate the page with something if no other images found
        while (spotImgArr.length < 10) {
            let url = 'https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg?20200913095930';
            spotImgArr.push(url);
        };
    // };


    return (
        <>
            <div className="onespotcarddiv">

                <div className='onespotCard'>

                    <img className='spotsImg' src={spotImgArr[0]} alt='spotPic'></img>

                    <div className="topRowDivOneSpot">
                        <h3 className="spotCityState">{spot.name}</h3>
                        <h3 className="avgStarRatingSpot"> ★{reviewsArr.length > 0 ? spot.avgStarRating : 0.0} </h3>
                    </div>
                    
                    <h5 className="h4PerNightSpotname">{spot.city}, {spot.state}</h5>
                    <h5 className="h4PerNight">${Number(spot.price).toFixed(2)} per night</h5>
                    <p className="oneSpotDesc">{spot.description}</p>
                </div>

                <div className="oneSpotExtraPics">
                    <img className='extraSpotPics' src={spotImgArr[1]} alt='spotPic'></img>
                    <img className='extraSpotPics' id='roundExtraPics' src={spotImgArr[2]} alt='spotPic'></img>
                    <img className='extraSpotPics' src={spotImgArr[3]} alt='spotPic'></img>
                    <img className='extraSpotPics' id='roundExtraPics1' src={spotImgArr[4]} alt='spotPic'></img>
                </div>


            </div>
            <div className="detailsDiv">
                <div className="amenityBigDiv">
                    <h4 className="detailsOneSpot"> Amenities and things this place has to offer </h4>
                    <div className="amenities">
                        <i id="logoOnespot" class="fa-regular fa-hot-tub-person"></i>
                        <p> 3.5 bathrooms</p>
                    </div>
                    <div className="amenities">
                        <i id="logoOnespot" class="fa-solid fa-mug-hot"></i>
                        <p> Keurig machines</p>
                    </div>
                    <div className="amenities">
                        <i id="logoOnespot" class="fa-solid fa-wifi"></i>
                        <p> Free Wifi</p>
                    </div>
                    <div className="amenities">
                        <i id="logoOnespot" class="fa-solid fa-bullseye"></i>
                        <p> Dartboard</p>
                    </div>
                    <div className="amenities">
                        <i id="logoOnespot" class="fa-solid fa-dumbbell"></i>
                        <p> Personal Gym</p>
                    </div>
                    <div className="amenities">
                        <i id="logoOnespot" class="fa-solid fa-table-tennis-paddle-ball"></i>
                        <p> Table Tennis</p>
                    </div>
                </div>
                <div className="modalsDiv">
                    <h3 className="h3ModalsDiv">User Portal</h3>


                    <h4 className="h4ModalsDiv">Want to see the reviews?</h4>
                    <button className='oneSpotReviewBtn' onClick={() => setShowModal(true)}>Reviews</button>


                    {(!(sessionUserObject?.id === spot?.ownerId) && (sessionUserObject)) && <>
                        <h4>Want to create a review?</h4>
                        <CreateAReviewModal />
                    </>}

                    {sessionUserObject?.id === spot?.ownerId && <>
                        <h4>Want to edit your spot?</h4>
                        <EditASpotModal spot={spot}/>
                    </>}

                    {sessionUserObject?.id === spot?.ownerId && <>
                        <h4>Want to delete your spot?</h4>
                        < EditDelSpot />
                    </>}

                </div>
            </div>
            <div className="newDivForMargin"> .</div>
            {showModal && (
                <Modal onClose={() => setShowModal(false)} className='reviewModalSki'>
                    <div className="bigReviewDiv">
                        <div className="leftReviewModal">
                            <h3> {spot.name}</h3>
                            <h3 className="h2ForSpot">★{reviewsArr.length > 0 ? spot.avgStarRating : ''} ·{reviewsArr.length > 0 ? spot.numReviews : 0} Reviews</h3>
                        </div>

                        <div className="reviewsDiv">
                            {reviewsArr.map(ele => (

                                <div className="reviewCard" key={`e${ele.id}`}>
                                    <h3 className="revNames" key={`a${ele.id}`}>{ele.User.firstName} {ele.User.lastName}</h3>
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

        </>
    );
};

