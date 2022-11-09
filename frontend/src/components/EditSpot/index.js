import { useDispatch } from "react-redux";
import { useState } from "react";
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
    
        const {spotId} = useParams();
        
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
                await dispatch(getSpotByid(spotId));
            };
        };
        return (
            <form className='editForm' onSubmit={handleSubmit}>
                {/* <ul>
                {errors.map((error, idx) => (
                  <li key={idx}>{error}</li>
                ))}
              </ul> */}
              <h3 className="editSpotH3"> Want to edit your spot? </h3>
                <label>
                    Address
                    <input
                        type="text"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        required
                    />
                </label>
                <label>
                    City
                    <input
                        type="text"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        required
                    />
                </label>
                <label>
                    State
                    <input
                        type="text"
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                        required
                    />
                </label>
                <label>
                    Country
                    <input
                        type="text"
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                        required
                    />
                </label>
                <label>
                    Name
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </label>
                <label>
                    Description
                    <textarea
                        type="text"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />
                </label>
                <label>
                Price
                <input
                  type="text"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  required
                />
              </label>
                <button type="submit">Edit</button>
            </form>
        );
};