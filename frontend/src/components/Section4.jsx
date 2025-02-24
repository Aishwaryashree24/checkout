import React, { useContext, useState } from 'react';
import { FormContext } from '../context/FormContext';

const Section4 = ({ next, prev }) => {
  const { formData, setFormData } = useContext(FormContext);
  const [rooms, setRooms] = useState(formData.roomDetails || []);

  const handleRoomChange = (index, e) => {
    const updatedRooms = rooms.map((room, i) =>
      i === index ? { ...room, [e.target.name]: e.target.value } : room
    );
    setRooms(updatedRooms);
  };

  const handleImageSelect = (index, e) => {
    const files = Array.from(e.target.files);
    const newPhotos = files.map((file) => URL.createObjectURL(file));
    const updatedRooms = rooms.map((room, i) =>
      i === index ? { ...room, photos: [...(room.photos || []), ...newPhotos] } : room
    );
    setRooms(updatedRooms);
  };

  const handleImageDelete = (roomIndex, photoIndex) => {
    const updatedRooms = rooms.map((room, i) => {
      if (i === roomIndex) {
        const updatedPhotos = room.photos.filter((_, j) => j !== photoIndex);
        return { ...room, photos: updatedPhotos };
      }
      return room;
    });
    setRooms(updatedRooms);
  };

  const addRoom = () => {
    setRooms([...rooms, { roomNumber: '', availabilityStatus: 'yes', roomType: '', roomPrice: '', roomOccupancy: '', photos: [] }]);
  };

  const handleNext = () => {
    if (rooms.every(room => room.roomNumber && room.roomType && room.roomPrice && room.roomOccupancy && room.photos.length >= 3)) {
      setFormData({ ...formData, roomDetails: rooms });
      next();
    } else {
      alert('Please fill in all fields for each room and upload at least three photos.');
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Room Details</h2>
      {rooms.map((room, index) => (
        <div key={index} className="mb-4 border p-4">
          <div className="mb-2">
            <label className="block mb-1">Room Number</label>
            <input
              type="text"
              name="roomNumber"
              value={room.roomNumber}
              onChange={(e) => handleRoomChange(index, e)}
              className="border p-2 w-full"
            />
          </div>
          <div className="mb-2">
            <label className="block mb-1">Availability Status</label>
            <select
              name="availabilityStatus"
              value={room.availabilityStatus}
              onChange={(e) => handleRoomChange(index, e)}
              className="border p-2 w-full"
            >
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </div>
          <div className="mb-2">
            <label className="block mb-1">Room Type</label>
            <select
              name="roomType"
              value={room.roomType}
              onChange={(e) => handleRoomChange(index, e)}
              className="border p-2 w-full"
            >
              <option value="">Select Room Type</option>
              <option value="standard rooms">Standard Rooms</option>
              <option value="deluxe rooms">Deluxe Rooms</option>
              <option value="suites">Suites</option>
              <option value="executive rooms">Executive Rooms</option>
              <option value="single rooms">Single Rooms</option>
            </select>
          </div>
          <div className="mb-2">
            <label className="block mb-1">Room Price</label>
            <input
              type="text"
              name="roomPrice"
              value={room.roomPrice}
              onChange={(e) => handleRoomChange(index, e)}
              className="border p-2 w-full"
            />
          </div>
          <div className="mb-2">
            <label className="block mb-1">Room Occupancy</label>
            <input
              type="text"
              name="roomOccupancy"
              value={room.roomOccupancy}
              onChange={(e) => handleRoomChange(index, e)}
              className="border p-2 w-full"
            />
          </div>
          <div className="mb-2">
            <label className="block mb-1">Room Photos</label>
            <input
              type="file"
              multiple
              onChange={(e) => handleImageSelect(index, e)}
              className="border p-2 w-full"
            />
            <div className="mt-2 flex">
              {room.photos && room.photos.map((photo, photoIndex) => (
                <div key={photoIndex} className="relative mr-2">
                  <img src={photo} alt="Room" className="w-32 h-32 object-cover" />
                  <button
                    onClick={() => handleImageDelete(index, photoIndex)}
                    className="absolute top-0 right-0 bg-red-500 text-white p-1"
                  >
                    X
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
      <button onClick={addRoom} className="bg-green-500 text-white p-2 mb-4">
        Add Room
      </button>
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

export default Section4;