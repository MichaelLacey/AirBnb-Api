import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { createSpotThunk } from "../../store/spots";
import './CreateSpot.css';
import { useHistory } from "react-router-dom";

/* COMPONENT TO CREATE A SPOT ! */
export default function CreateASpot({ setShowModal }) {
    const dispatch = useDispatch();
    const history = useHistory();

    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [country, setCountry] = useState('');
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [previewImage, setPreviewImage] = useState('');
    const [validationErrors, setValidationErrors] = useState([]);

    /* Handle form errors */
    useEffect(() => {
        const validationErrors = [];
        if (!address) validationErrors.push('Street address is required');
        if (!city) validationErrors.push('City is required');
        if (!state) validationErrors.push('State is required');
        if (!country) validationErrors.push('Country is required');
        if (name.length > 25) validationErrors.push('Name must be less than 50 characters');
        if (!description) validationErrors.push('Description is required');
        if (!price) validationErrors.push('Price per day is required');
        if (price < 0 || !price || !Number(price)) validationErrors.push('Price must be a number than 0');
        if (!previewImage) validationErrors.push('Preview image is required')
        setValidationErrors(validationErrors);
    }, [address, name, city, state, country, description, price, previewImage]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const spot = {
            address,
            city,
            state,
            country,
            name,
            description,
            price,
            previewImage,
        };
        dispatch(createSpotThunk(spot));
        /* Close the modal using useState after submitting */
        setShowModal(false);
        history.push(`/`);
    };
    
    return (
        <form onSubmit={handleSubmit} className='createASpotForm'>
            <ul className='createSpotErrors'>
                {validationErrors.map((error, idx) => (
                    <li key={idx}>{error}</li>
                ))}
            </ul>
            <h2 className="createASpotFormH2">Create a spot </h2>
            <label>
                <input
                    placeholder="Address"
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    required
                />
            </label>
            <label>
                <input
                    placeholder="City"
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    required
                />
            </label>
            <label>
                <input
                    placeholder="State"
                    type="text"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    required
                />
            </label>
            <label>
                <input
                    placeholder="Country"
                    type="text"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    required
                />
            </label>
            <label>
                <input
                    placeholder="Name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
            </label>
            <label >
                <textarea
                    placeholder="Description"
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                    className="descLabel"
                />
            </label>
            <label>
                <input
                    placeholder="Price"
                    type="text"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    required
                />
            </label>
            <label>
                <input
                    placeholder="Preview Image"
                    type="text"
                    value={previewImage}
                    onChange={(e) => setPreviewImage(e.target.value)}
                    required
                />
            </label>
            {validationErrors.length === 0 &&
                <button type="submit" className="createASpotBtn">Create</button>}
        </form>
    );
};
