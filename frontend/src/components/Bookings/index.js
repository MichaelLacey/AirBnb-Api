import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from 'react-router-dom'
import './index.css'
import { getUsersBookingsThunk , deleteBookingThunk} from "../../store/bookings";

export default function Bookings() {
    const dispatch = useDispatch();
    const history = useHistory();
    const bookings = Object.values(useSelector(state => state.bookings));

    useEffect(() => {
        dispatch(getUsersBookingsThunk());
    }, [dispatch]);
    if (!bookings) return null;

    const deleteBooking = (bookingId) => {
        if (window.confirm('Are you sure you want to cancel this booking?')) {
            dispatch(deleteBookingThunk(bookingId));
        };
    };
    return (
        <div className="bookingsDiv">
            {bookings && bookings.map(booking => (
                <div className="bookingsMap">

                    <div className="imgDivBooking">
                    <img src={`${booking.Spot?.PreviewImage}`} alt="" className="bookingsImg" />
                    </div>

                    <div className="rightBookingDiv">
                        <h2 onClick={() => history.push(`/spots/${booking.Spot?.id}`)}>{booking.Spot?.name}</h2>
                        <p>{booking.Spot?.city}, {booking.Spot?.country}</p>
                        <p>Start Date {booking.startDate.slice(0,10)}</p>
                        <p>End Date {booking.endDate.slice(0,10)}</p>
                        <button onClick={() => deleteBooking(booking.id)}>Cancel Trip</button>
                    </div>

                </div>
            ))}
        </div>


    );
};