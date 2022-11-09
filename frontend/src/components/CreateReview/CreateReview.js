import './CreateReview.css';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { createReviewThunk, getReviewsThunk } from '../../store/reviews';


export default function CreateReview() {
    const [review, setReview] = useState('');
    const [stars, setStars] = useState(1);
    // const history = useHistory();
    const dispatch = useDispatch();
    const { spotId } = useParams();
   
    const handleSubmit = async (e) => {
        e.preventDefault();
        const reviewData = {
            review,
            stars
        };
        setReview('');
        setStars(1);

      let reviewDispatch = await dispatch(createReviewThunk(reviewData, spotId)); 
      
    if (reviewDispatch) await dispatch(getReviewsThunk(spotId));
    };

    return (
        <form className='reviewForm' onSubmit={handleSubmit}>
            <h2>Create a review !</h2>
            <label>
                Review Description
                <input
                    type="text"
                    value={review}
                    onChange={(e) => setReview(e.target.value)}
                    required
                />
            </label>
            <label>
                Stars
                <select
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

