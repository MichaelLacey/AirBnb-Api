import { csrfFetch } from "./csrf";

export const CREATE_BOOKING = 'create/booking';
export const USERS_BOOKINGS = 'current/users/bookings'
export const DELETE_BOOKING = 'delete/booking'
/* ___________ A C T I O N S   ___________ */
export const createBookingAction = (booking) => {
    return {
        type: CREATE_BOOKING,
        booking
    };
};

export const getCurrentUserBookingsAction = (bookings) => {
    return {
        type: USERS_BOOKINGS,
        bookings
    };
};

export const deleteBookingAction = (bookingId) => {
    return {
        type: DELETE_BOOKING,
        bookingId
    };
};

/* ___________ T H U N K S   ___________ */
export const createBookingThunk = (bookingObj, spotId) => async (dispatch) => {
    const { startDate, endDate } = bookingObj;

    const response = await csrfFetch(`/api/spots/${spotId}/bookings`, {
        method: 'POST',
        body: JSON.stringify({
            startDate,
            endDate
        })
    });

    if (response.ok) {
        const newBooking = await response.json();
        console.log('newBooking : ', newBooking);
        dispatch(createBookingAction(newBooking));
        return newBooking;
    };
};

export const getUsersBookingsThunk = () => async (dispatch) => {
    const response = await fetch('/api/bookings/current');
    const usersBookings = await response.json();
    dispatch(getCurrentUserBookingsAction(usersBookings.Bookings));
};

export const deleteBookingThunk = (bookingId) => async (dispatch) => {
    const response = await csrfFetch(`/api/bookings/${bookingId}`, { method: 'DELETE' });
    if (response.ok) dispatch(deleteBookingAction(bookingId));
};
/* ___________ R E D U C E R ___________ */
const bookingsReducer = (state = {}, action) => {
    let newState = {};
    switch (action.type) {

        case CREATE_BOOKING:
            newState = { ...state }
            newState[action.booking.id] = action.booking
            return newState

        case USERS_BOOKINGS:
            action.bookings.forEach(booking => newState[booking.id] = booking)
            return newState

        case DELETE_BOOKING:
            newState = { ...state }
            delete newState[action.bookingId]
            return newState

        default:
            return state

    };
};

export default bookingsReducer;