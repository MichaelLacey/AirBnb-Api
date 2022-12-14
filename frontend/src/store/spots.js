import { csrfFetch } from "./csrf";

const LOAD_SPOTS = 'load/SPOTS';
const GET_SPOT = 'get/SPOT';
const CREATE_SPOT = 'create/SPOTS';
const DELETE_SPOT = 'delete/SPOT';
const EDIT_SPOT = 'edit/SPOT';

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
export const deleteSpot = (spotId) => {
    return {
        type: DELETE_SPOT,
        spotId
    };
};
export const editSpot = (spot) => {
    return {
        type: EDIT_SPOT,
        spot
    };
};

/* ___________ T H U N K S   ___________ */

// get all the spots data from backend to be able to render
export const allSpots = () => async (dispatch) => {
    // console.log('all spots thunk')
    const response = await fetch('/api/spots');
    const spots = await response.json();
    // console.log('spots- -----', spots)
    dispatch(loadSpots(spots.Spots));
};
// Get spot by id
export const getSpotByid = (spotId) => async (dispatch) => {
    // console.log('get spot by id thunk');
    const response = await fetch(`/api/spots/${spotId}`);
    if (response.ok) {
        const oneSpot = await response.json();
        dispatch(getSingleSpot(oneSpot));
    };
};

// Create a new spot
export const createSpotThunk = (spot) => async (dispatch) => {
    const { address, city, state, country, lat, lng, name, description, price, previewImage } = spot;
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
            price
        })
    });
    if (response.ok) {
        const newSpot = await response.json();
        // console.log('This is the new spot', newSpot);
        const newSpotId = newSpot.id;
        const newResponse = await csrfFetch(`/api/spots/${newSpotId}/images`, {
            method: 'POST',
            body: JSON.stringify({
                url: previewImage,
                preview: true
            })
        });

        if (newResponse.ok) {
            const newSpotImg = await newResponse.json();
            newSpot.previewImage = newSpotImg.url;
            dispatch(createSpot(newSpot));
            return newSpot;
        };
    };
};

// Delete a spot
export const deleteSpotThunk = (spotId) => async (dispatch) => {
    // console.log('starting delete spot thunk -- ')
    const response = await csrfFetch(`/api/spots/${spotId}`, {
        method: 'DELETE',
    });
    // console.log('delete thunk response', response);
    if (response.ok) {
        dispatch(deleteSpot(spotId));
    };
};
// Edit a spot
// no need to edit preview image here
export const editSpotThunk = (spotId, spot) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${spotId}`, {
        method: 'PUT',
        body: JSON.stringify(spot)
    });
    if (response.ok) {
        const editedSpot = await response.json();
        dispatch(editSpot(editedSpot));
        return editedSpot;
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
            newState[action.spot.id] = action.spot
            return newState;

        case DELETE_SPOT:
            newState = { ...state }
            delete newState[action.spotId]
            return newState

        case EDIT_SPOT:
            newState = { ...state }
            newState[action.spot.id] = action.spot
            return newState

        default:
            return state;
    };
};
export default allSpotsReducer;