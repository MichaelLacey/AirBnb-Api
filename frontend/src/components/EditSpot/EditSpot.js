import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import './EditSpot.css';
import { editSpotThunk } from "../../store/spots";
import { useParams } from "react-router-dom";
import { getSpotByid } from "../../store/spots";

export default function EditSpot({spot}) {
    const dispatch = useDispatch();
    const [address, setAddress] = useState(spot.address || '');
    const [city, setCity] = useState(spot.city || '');
    const [state, setState] = useState(spot.state ||'');
    const [country, setCountry] = useState(spot.country ||'');
    const [name, setName] = useState(spot.name ||'');
    const [description, setDescription] = useState(spot.description ||'');
    const [price, setPrice] = useState(spot.price || '');
    const [validationErrors, setValidationErrors] = useState([]);

    const { spotId } = useParams();

    /* Handle form errors */
    useEffect(() => {
        const validationErrors = [];
        if (!address || address.length < 5) validationErrors.push('Please provide a valid address');
        if (!city || city.length < 4) validationErrors.push('Please provide a valid city');
        if (!state || state.length < 2) validationErrors.push('Please provide a valid state.');
        if (!country) validationErrors.push('Country is required');
        if (name.length > 25) validationErrors.push('Name must be less than 25 characters');
        if (!description) validationErrors.push('Description is required');
        if (!price) validationErrors.push('Price per day is required');
        if (price < 0 || !price || !Number(price)) validationErrors.push('Price must be a number than 0');
        if (description.length > 250) validationErrors.push('Please provide a description less than 250 characters');
        setValidationErrors(validationErrors);
    }, [address, name, city, state, country, description, price]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const spot = {
            address,
            city,
            state,
            country,
            name,
            description,
            price,
        };

        const editedSpot = await dispatch(editSpotThunk(spotId, spot));
        if (editedSpot) {
            console.log('editedSpot', editedSpot)
            await dispatch(getSpotByid(spotId));
        };
    };
    return (
        <form className='editForm' onSubmit={handleSubmit}>
            <ul className="errors">
                {validationErrors.map((error, idx) => (
                    <li key={idx}>{error}</li>
                ))}
            </ul>
            <h3 className="editSpotH3"> Want to edit your spot? </h3>
            <label>
                <input
                    type="text"
                    placeholder="Address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    required
                />
            </label>
            <label>
                <input
                    type="text"
                    placeholder="City"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    required
                />
            </label>
            <label>
                <input
                    type="text"
                    placeholder="State"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    required
                />
            </label>
            <label>
                <input
                    type="text"
                    placeholder="Country"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    required
                />
            </label>
            <label>
                <input
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
            </label>
            <label>
                <textarea
                    type="text"
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                />
            </label>
            <label>
                <input
                    type="text"
                    placeholder="Price"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    required
                />
            </label>
                <button type="submit" disabled={validationErrors.length > 0}>Edit</button>
        </form>
    );
};