import React, { useContext, useState } from 'react';
import { FormContext } from '../context/FormContext';

const BasicHotelInfo = ({ next }) => {
  const { formData, setFormData } = useContext(FormContext);
  const [basicInfo, setBasicInfo] = useState({
    name: formData.name || '',
    type: formData.type || '',
    title: formData.title || '',
    description: formData.description || '',
    photos: formData.photos || [],
  });

  const handleChange = (e) => {
    setBasicInfo({ ...basicInfo, [e.target.name]: e.target.value });
  };

  const handleImageSelect = (e) => {
    const files = Array.from(e.target.files);
    const newPhotos = files.map((file) => URL.createObjectURL(file));
    setBasicInfo({ ...basicInfo, photos: [...basicInfo.photos, ...newPhotos] });
  };

  const handleImageDelete = (index) => {
    const updatedPhotos = basicInfo.photos.filter((_, i) => i !== index);
    setBasicInfo({ ...basicInfo, photos: updatedPhotos });
  };

  const handleNext = () => {
    if (
      basicInfo.name &&
      // basicInfo.type &&
      // basicInfo.title &&
      basicInfo.description &&
      basicInfo.photos.length > 0
    ) {
      setFormData({ ...formData, ...basicInfo });
      next();
    } else {
      alert('Please fill in all fields and upload at least one photo.');
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Basic Information</h2>
      <div className="mb-4">
        <label className="block mb-2">Hotel Name</label>
        <input
          type="text"
          name="name"
          value={basicInfo.name}
          onChange={handleChange}
          placeholder="Enter hotel name"
          className="border p-2 w-full"
          required
        />
      </div>
      {/* <div className="mb-4">
        <label className="block mb-2">Type</label>
        <input
          type="text"
          name="type"
          value={basicInfo.type}
          onChange={handleChange}
          placeholder="Enter hotel type"
          className="border p-2 w-full"
          required
        />
      </div> */}
      {/* <div className="mb-4">
        <label className="block mb-2">Title</label>
        <input
          type="text"
          name="title"
          value={basicInfo.title}
          onChange={handleChange}
          placeholder="Enter hotel title"
          className="border p-2 w-full"
          required
        />
      </div> */}
      <div className="mb-4">
        <label className="block mb-2">Description</label>
        <textarea
          name="description"
          value={basicInfo.description}
          onChange={handleChange}
          placeholder="Enter hotel description"
          className="border p-2 w-full"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2">Photos</label>
        <input
          type="file"
          multiple
          onChange={handleImageSelect}
          className="border p-2 w-full"
          required
        />
        <div className="mt-2 flex">
          {basicInfo.photos.map((photo, index) => (
            <div key={index} className="relative mr-2">
              <img src={photo} alt="Hotel" className="w-32 h-32 object-cover" />
              <button
                onClick={() => handleImageDelete(index)}
                className="absolute top-0 right-0 bg-red-500 text-white p-1"
              >
                X
              </button>
            </div>
          ))}
        </div>
      </div>
      <button onClick={handleNext} className="bg-blue-500 text-white p-2">
        Next
      </button>
    </div>
  );
};

export default BasicHotelInfo;