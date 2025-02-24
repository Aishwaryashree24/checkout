// src/components/Section3.js
import React, { useContext, useState } from 'react';
import { FormContext } from '../context/FormContext';
import axios from 'axios';

const HotelPropertyDetails = ({ prev }) => {
  const { formData, setFormData } = useContext(FormContext);
  const [propertyDetails, setPropertyDetails] = useState({
    offerings: formData.offerings || [],
    cheapestPrice: formData.cheapestPrice || '',
    cancellationPolicy: formData.cancellationPolicy || '',
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      setPropertyDetails({
        ...propertyDetails,
        offerings: checked
          ? [...propertyDetails.offerings, value]
          : propertyDetails.offerings.filter((offering) => offering !== value),
      });
    } else {
      setPropertyDetails({ ...propertyDetails, [name]: value });
    }
  };

  const uploadImagesToCloudinary = async (images) => {
    const uploadPromises = images.map(async (image) => {
      const formData = new FormData();
      formData.append('file', image);
      formData.append('upload_preset', 'hotel-booking'); 

      const response = await axios.post(
        'https://api.cloudinary.com/v1_1/drn7pbcb8/image/upload', 
        formData
      );
      return response.data.secure_url;
    });

    return Promise.all(uploadPromises);
  };

  const handlePublish = async () => {
    if (
      propertyDetails.offerings.length >= 1 &&
      propertyDetails.cheapestPrice &&
      propertyDetails.cancellationPolicy
    ) {
      try {
        // Convert local image URLs to blobs
        const hotelPhotoFiles = formData.photos.map((url) =>
          fetch(url).then((res) => res.blob())
        );
        const hotelPhotos = await Promise.all(hotelPhotoFiles);

        // Upload images to Cloudinary
        const hotelPhotoUrls = await uploadImagesToCloudinary(hotelPhotos);

        const finalData = {
          ...formData,
          photos: hotelPhotoUrls,
          offerings: propertyDetails.offerings,
          cheapestPrice: parseFloat(propertyDetails.cheapestPrice),
          cancellationPolicy: propertyDetails.cancellationPolicy,
        };

        // Send the finalData to your backend
        // await axios.post('/api/hotels', finalData);
        alert('Hotel published successfully!');
        console.log('Hotel data:', finalData);
      } catch (error) {
        console.error('Error publishing hotel:', error);
        alert('There was an error publishing the hotel. Please try again.');
      }
    } else {
      alert('Please fill in all fields and select at least one offering.');
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Property Details</h2>
      <div className="mb-4">
        <label className="block mb-2">Offerings</label>
        <div>
          <input
            type="checkbox"
            name="offerings"
            value="ac"
            checked={propertyDetails.offerings.includes('ac')}
            onChange={handleChange}
          />{' '}
          AC
          <input
            type="checkbox"
            name="offerings"
            value="pets allowed"
            checked={propertyDetails.offerings.includes('pets allowed')}
            onChange={handleChange}
          />{' '}
          Pets Allowed
          <input
            type="checkbox"
            name="offerings"
            value="transport to airport"
            checked={propertyDetails.offerings.includes('transport to airport')}
            onChange={handleChange}
          />{' '}
          Transport to Airport
          <input
            type="checkbox"
            name="offerings"
            value="complimentary wifi"
            checked={propertyDetails.offerings.includes('complimentary wifi')}
            onChange={handleChange}
          />{' '}
          Complimentary Wifi
          <input
            type="checkbox"
            name="offerings"
            value="breakfast"
            checked={propertyDetails.offerings.includes('breakfast')}
            onChange={handleChange}
          />{' '}
          Breakfast
          <input
            type="checkbox"
            name="offerings"
            value="daily cleaning"
            checked={propertyDetails.offerings.includes('daily cleaning')}
            onChange={handleChange}
          />{' '}
          Daily Cleaning
          <input
            type="checkbox"
            name="offerings"
            value="laundry service"
            checked={propertyDetails.offerings.includes('laundry service')}
            onChange={handleChange}
          />{' '}
          Laundry Service
        </div>
      </div>
      <div className="mb-4">
        <label className="block mb-2">Cheapest Price</label>
        <input
          type="number"
          name="cheapestPrice"
          value={propertyDetails.cheapestPrice}
          onChange={handleChange}
          placeholder="Enter cheapest price"
          className="border p-2 w-full"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2">Cancellation Policy</label>
        <select
          name="cancellationPolicy"
          value={propertyDetails.cancellationPolicy}
          onChange={handleChange}
          className="border p-2 w-full"
          required
        >
          <option value="">Select Policy</option>
          <option value="Refundable upto 1 day before check-in date">
            Refundable upto 1 day before check-in date
          </option>
          <option value="Refundable upto 3 day before check-in date">
            Refundable upto 3 day before check-in date
          </option>
          <option value="Non-refundable">Non-refundable</option>
        </select>
      </div>
      <div>
        <button onClick={prev} className="bg-gray-500 text-white p-2 mr-2">
          Previous
        </button>
        <button onClick={handlePublish} className="bg-green-500 text-white p-2">
          Publish
        </button>
      </div>
    </div>
  );
};

export default HotelPropertyDetails;