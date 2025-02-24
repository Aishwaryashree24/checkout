import React, { useContext } from 'react';
import { FormContext } from '..context/FormContext';
import axios from 'axios';

const Review = ({ prev }) => {
  const { formData } = useContext(FormContext);

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
    try {
      const hotelPhotoFiles = formData.basicInfo.photos.map((url) => fetch(url).then((res) => res.blob()));
      const hotelPhotos = await Promise.all(hotelPhotoFiles);
      const hotelPhotoUrls = await uploadImagesToCloudinary(hotelPhotos);

      const roomDetailsWithUrls = await Promise.all(
        formData.roomDetails.map(async (room) => {
          const roomPhotoFiles = room.photos.map((url) => fetch(url).then((res) => res.blob()));
          const roomPhotos = await Promise.all(roomPhotoFiles);
          const roomPhotoUrls = await uploadImagesToCloudinary(roomPhotos);
          return { ...room, photos: roomPhotoUrls };
        })
      );

      const finalData = {
        ...formData,
        basicInfo: {
          ...formData.basicInfo,
          photos: hotelPhotoUrls,
        },
        roomDetails: roomDetailsWithUrls,
      };

      // await axios.post('/api/hotels', finalData);
      alert('Hotel published successfully!');
      console.log('Hotel data:', finalData);
    } catch (error) {
      console.error('Error publishing hotel:', error);
      alert('There was an error publishing the hotel. Please try again.');
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Review and Publish</h2>
      <pre className="bg-gray-100 p-4 mb-4">{JSON.stringify(formData, null, 2)}</pre>
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

export default Review;