import './CreateReview.css';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { createReviewThunk, getReviewsThunk } from '../../store/reviews';
import { getSpotByid } from "../../store/spots";

export default function CreateReview({setShowModal}) {
    const [review, setReview] = useState('');
    const [stars, setStars] = useState(1);
    const [validationErrors, setValidationErrors] = useState([]);
    
    const dispatch = useDispatch();
    const { spotId } = useParams();

    useEffect(() => {
        const validationErrors = [];
        if (!review) validationErrors.push('Please provide a lengthier review');
        setValidationErrors(validationErrors);
    }, [review]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const reviewData = {
            review,
            stars
        };
        setReview('');
        setStars(1);

        let reviewDispatch = await dispatch(createReviewThunk(reviewData, spotId));

        if (reviewDispatch) {
            // close the modal
            setShowModal(false);
            // get reviews again after we create review
            await dispatch(getReviewsThunk(spotId));
            await dispatch(getSpotByid(spotId));
        };
    };

    return (
        <form className='reviewForm' onSubmit={handleSubmit}>
            <h2 className='reviewH2'>Create a review </h2>
            <ul className='createReviewErrors'>
                {validationErrors.map((error, idx) => (
                    <li key={idx}>{error}</li>
                ))}
            </ul>
            <label>
                <textarea 
                className='reviewTextArea'
                    placeholder='Write a review'
                    type="text"
                    value={review}
                    onChange={(e) => setReview(e.target.value)}
                    required
                />
            </label>
            <label>
                Stars
                <select
                className='starsSelect'
                    onChange={(e) => setStars(e.target.value)}
                    value={stars}
                    required
                >
                    <option value={1}>1</option>
                    <option value={2}>2</option>
                    <option value={3}>3</option>
                    <option value={4}>4</option>
                    <option value={5}>5</option>
                </select>
            </label>
            <button type='submit' className='createReviewButton'>Create</button>
        </form>
    );
};

