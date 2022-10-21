export const GET_REVIEWS = 'get/reviewsFor/SPOT';


/* ___________ A C T I O N S   ___________ */

// Get reviews for spot
export const getReviewsAction = (reviews) => {
    return {
        type: GET_REVIEWS,
        reviews
    };
};

/* ___________ T H U N K S   ___________ */

// Get reviews for a spat 
export const getReviewsThunk = (spotId) => async (dispatch) => {
    console.log('in get reviews for spot thunk');
    const response = await fetch(`/api/spots/${spotId}/reviews`);
    if (response.ok) {
        const reviews = await response.json();
        dispatch(getReviewsAction(reviews.Reviews));
        return reviews;
    };
};


/* ___________ R E D U C E R ___________ */

const reviewsReducer = (state = {}, action) => {
    let newState = {};
    switch (action.type) {
        case GET_REVIEWS:
            action.reviews.forEach(review => newState[review.id] = review)
            return newState

        default:
            return state;
    };
};

export default reviewsReducer;