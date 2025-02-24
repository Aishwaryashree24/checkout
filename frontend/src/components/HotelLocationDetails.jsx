import React, { useContext, useState } from 'react';
import { FormContext } from '../context/FormContext';

const HotelLocationDetails = ({ next, prev }) => {
  const { formData, setFormData } = useContext(FormContext);
  const [locationDetails, setLocationDetails] = useState({
    city: formData.city || '',
    address: formData.address || '',
    state: formData.state || '',
    country: formData.country || '',
    code: formData.code || '',
    distance: formData.distance || '',
  });

  const handleChange = (e) => {
    setLocationDetails({ ...locationDetails, [e.target.name]: e.target.value });
  };

  const handleNext = () => {
    if (
      locationDetails.city &&
      locationDetails.address &&
      locationDetails.state &&
      locationDetails.country &&
      locationDetails.code &&
      locationDetails.distance
    ) {
      setFormData({ ...formData, ...locationDetails });
      next();
    } else {
      alert('Please fill in all fields.');
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Location Details</h2>
      <div className="mb-4">
        <label className="block mb-2">Country</label>
        <input
          type="text"
          name="country"
          value={locationDetails.country}
          onChange={handleChange}
          placeholder="Enter country"
          className="border p-2 w-full"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2">State</label>
        <input
          type="text"
          name="state"
          value={locationDetails.state}
          onChange={handleChange}
          placeholder="Enter state"
          className="border p-2 w-full"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2">City</label>
        <input
          type="text"
          name="city"
          value={locationDetails.city}
          onChange={handleChange}
          placeholder="Enter city"
          className="border p-2 w-full"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2">Address</label>
        <input
          type="text"
          name="address"
          value={locationDetails.address}
          onChange={handleChange}
          placeholder="Enter address"
          className="border p-2 w-full"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2">Postal Code</label>
        <input
          type="text"
          name="code"
          value={locationDetails.code}
          onChange={handleChange}
          placeholder="Enter postal code"
          className="border p-2 w-full"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2">Distance to Nearby Location</label>
        <input
          type="text"
          name="distance"
          value={locationDetails.distance}
          onChange={handleChange}
          placeholder="Enter distance"
          className="border p-2 w-full"
          required
        />
      </div>
      <div>
        <button onClick={prev} className="bg-gray-500 text-white p-2 mr-2">
          Previous
        </button>
        <button onClick={handleNext} className="bg-blue-500 text-white p-2">
          Next
        </button>
      </div>
    </div>
  );
};

export default HotelLocationDetails;