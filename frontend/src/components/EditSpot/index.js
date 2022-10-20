import { useDispatch } from "react-redux";
import { useState } from "react";
import './EditSpot.css';
import { editSpotThunk } from "../../store/spots";
import { useHistory, useParams } from "react-router-dom";

export default function EditSpot() {
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
    
        const {spotId} = useParams();
        
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
                previewImage
            };
            dispatch(editSpotThunk(spotId, spot));
                history.push(`/`);
              
        };
        return (
            <form onSubmit={handleSubmit}>
                {/* <ul>
                {errors.map((error, idx) => (
                  <li key={idx}>{error}</li>
                ))}
              </ul> */}
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
              <label>
                Preview Image
                <input
                  type="text"
                  value={previewImage}
                  onChange={(e) => setPreviewImage(e.target.value)}
                  required
                />
              </label>
                <button type="submit">Edit</button>
            </form>
        );
};