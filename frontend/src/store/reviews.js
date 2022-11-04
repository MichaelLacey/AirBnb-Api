import { csrfFetch } from "./csrf";

export const GET_REVIEWS = 'get/reviewsFor/SPOT';
export const DELETE_REVIEW = 'delete/REVIEW/spot'
export const CREATE_REVIEW = 'create/REVIEW/spot'
/* ___________ A C T I O N S   ___________ */

// Get reviews for spot
export const getReviewsAction = (reviews) => {
    return {
        type: GET_REVIEWS,
        reviews
    };
};

export const deleteReviewAction = (reviewId) => {
    return {
        type: DELETE_REVIEW,
        reviewId
    };
};

export const createReviewAction = (review) => {
    return {
        type: CREATE_REVIEW,
        review
    };
};
/* ___________ T H U N K S   ___________ */

// Get reviews for a spot 
export const getReviewsThunk = (spotId) => async (dispatch) => {
    console.log('in get reviews for spot thunk');
    const response = await fetch(`/api/spots/${spotId}/reviews`);
    console.log('spot id is in the thunk :', spotId)
    if (response.ok) {
        const reviews = await response.json();
        dispatch(getReviewsAction(reviews.Reviews));
        // return reviews;
    };
    // I did this bc i kept getting old reviews. Adding this updated my review thing
    if (!response.ok) {
        dispatch(getReviewsAction([]))
        console.log('hello empty array')
    }
};

// Delete a review for a spot 
export const deleteReviewThunk = (reviewId) => async (dispatch) => {
    console.log('in delete review thunk... ');
    const response = await csrfFetch(`/api/reviews/${reviewId}`,{
        method: 'DELETE'
    })
    console.log('delete a review response..', response);
    if (response.ok) {
        dispatch(deleteReviewAction(reviewId))
    }
}

/* ___________ R E D U C E R ___________ */

const reviewsReducer = (state = {}, action) => {
    let newState = {};
    switch (action.type) {
        case GET_REVIEWS:
            action.reviews.forEach(review => newState[review.id] = review)
            return newState

        case DELETE_REVIEW:
            newState = { ...state }
            delete newState[action.reviewId]
            return newState

        default:
            return state;
    };
};

export default reviewsReducer;