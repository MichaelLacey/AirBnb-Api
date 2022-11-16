import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import './EditSpot.css';
import { editSpotThunk } from "../../store/spots";
import { useParams } from "react-router-dom";
import { getSpotByid } from "../../store/spots";

export default function EditSpot() {
        const dispatch = useDispatch();
        const [address, setAddress] = useState('');
        const [city, setCity] = useState('');
        const [state, setState] = useState('');
        const [country, setCountry] = useState('');
        const [name, setName] = useState('');
        const [description, setDescription] = useState('');
        const [price, setPrice] = useState('');
        const [ validationErrors, setValidationErrors ] = useState([]);
    
        const {spotId} = useParams();
        
        /* Handle form errors */
    useEffect(() => {
        const validationErrors = [];
        if (!address) validationErrors.push('Street address is required');
        if (!city) validationErrors.push('City is required');
        if (!state) validationErrors.push('State is required');
        if (!country) validationErrors.push('Country is required');
        if(name.length > 25) validationErrors.push('Name must be less than 50 characters');
        if(!description) validationErrors.push('Description is required');
        if (!price) validationErrors.push('Price per day is required');
        if (price < 0 || !price) validationErrors.push('Price must be greater than 0');
        setValidationErrors(validationErrors);
    }, [ address, name, city, state, country, description, price ]);

        const handleSubmit = async(e) => {
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
              {validationErrors.length === 0 &&
              <button type="submit">Edit</button>}
            </form>
        );
};