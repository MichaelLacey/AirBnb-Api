
const LOAD_SPOTS = 'load/SPOTS';

export const loadSpots = (spots) => {
    return {
        type: LOAD_SPOTS,
        spots
    };
};

/* ___________ T H U N K S   ___________ */

// get all the spots data from backend to be able to render
export const allSpots = () => async (dispatch) => {
    const response = await fetch('/api/spots');
    const spots = await response.json();
    console.log('spotssssssssss', spots)
    console.log('spots spots 000000000', spots.Spots)
    dispatch(loadSpots(spots.Spots));
};

/* ___________ R E D U C E R ___________ */
const allSpotsReducer = (state = {}, action) => {
    let newState;
    switch (action.type) {
        case LOAD_SPOTS:
            newState = { ...state, ...action.spots }
            return newState




        default:
            return state;
    }


};
export default allSpotsReducer;