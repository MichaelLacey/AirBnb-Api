import { csrfFetch } from "./csrf";

const LOAD_SPOTS = 'load/SPOTS';
const GET_SPOT = 'get/SPOT';
const CREATE_SPOT = 'create/SPOTS';

/* ___________ A C T I O N S   ___________ */
export const loadSpots = (spots) => {
    return {
        type: LOAD_SPOTS,
        spots
    };
};
export const createSpot = (spot) => {
    return {
        type: CREATE_SPOT,
        spot
    };
};
export const getSingleSpot = (spot) => {
    return {
        type: GET_SPOT,
        spot
    };
};
/* ___________ T H U N K S   ___________ */

// get all the spots data from backend to be able to render
export const allSpots = () => async (dispatch) => {
    const response = await fetch('/api/spots');
    const spots = await response.json();
    console.log('spots thunk ------', spots.Spots)
    dispatch(loadSpots(spots.Spots));
};
// Get spot by id
export const getSpotByid = (spotId) => async (dispatch) => {
    console.log('get spot by id thunk');
    const response = await fetch(`/api/spots/${spotId}`);
    if (response.ok) {
        const oneSpot = await response.json();
        console.log('Spot by id thunk', oneSpot);
        dispatch(getSingleSpot(oneSpot));
    };
};
// Create a new spot
export const createSpotThunk = (spot) => async (dispatch) => {
    const { address, city, state, country, lat, lng, name, description, price } = spot;
    // use csrfFetch bc we need the token
    const response = await csrfFetch('/api/spots', {
        method: 'POST',
        body: JSON.stringify({
            address,
            city,
            state,
            country,
            lat,
            lng,
            name,
            description,
            price,
        })
    });
    if (response.ok) {
        const newSpot = await response.json();
        dispatch(createSpot(newSpot));
        return newSpot;
    };
};

/* ___________ R E D U C E R ___________ */
const allSpotsReducer = (state = {}, action) => {
    let newState = {};
    switch (action.type) {
        case LOAD_SPOTS:
            action.spots.forEach(spot => newState[spot.id] = spot)
            return newState

        case GET_SPOT:
            newState[action.spot.id] = action.spot
            return newState

        case CREATE_SPOT:
            newState = { ...state }
            newState.spots[action.spot.id] = action.spot
            return newState;


        default:
            return state;
    };
};
export default allSpotsReducer;