import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const hotelsData = [
  { id: 1, name: "Hotel Marigold", location: "New Delhi / NCR", price: 902, image: "https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=600&auto=format&fit=crop&q=60", rating: 4.5, reviews: 120 },
  { id: 2, name: "Sunrise Ecostay", location: "Goa", price: 1197, image: "https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=600&auto=format&fit=crop&q=60", rating: 4.7, reviews: 95 },
  { id: 2, name: "Sunrise Ecostay", location: "Goa", price: 1197, image: "https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=600&auto=format&fit=crop&q=60", rating: 4.7, reviews: 95 },
  { id: 2, name: "Sunrise Ecostay", location: "Goa", price: 1197, image: "https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=600&auto=format&fit=crop&q=60", rating: 4.7, reviews: 95 },
  { id: 2, name: "Sunrise Ecostay", location: "Goa", price: 1197, image: "https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=600&auto=format&fit=crop&q=60", rating: 4.7, reviews: 95 },
  { id: 2, name: "Sunrise Ecostay", location: "Goa", price: 1197, image: "https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=600&auto=format&fit=crop&q=60", rating: 4.7, reviews: 95 },
  { id: 2, name: "Sunrise Ecostay", location: "Goa", price: 1197, image: "https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=600&auto=format&fit=crop&q=60", rating: 4.7, reviews: 95 },
  { id: 3, name: "Grand Imperial", location: "Mumbai", price: 539, image: "https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=600&auto=format&fit=crop&q=60", rating: 4.3, reviews: 80 },
  { id: 4, name: "Bangalore Palace Hotel", location: "Bangalore", price: 899, image: "https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=600&auto=format&fit=crop&q=60", rating: 4.6, reviews: 110 },
  { id: 5, name: "Sea View Resort", location: "Chennai", price: 765, image: "https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=600&auto=format&fit=crop&q=60", rating: 4.4, reviews: 70 }
];

function SearchResults() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const searchQuery = params.get("query");

  const [filteredHotels, setFilteredHotels] = useState([]);
  const navigate = useNavigate();  // Using useNavigate to programmatically navigate

  useEffect(() => {
    const results = hotelsData.filter((hotel) => hotel.location.toLowerCase() === searchQuery.toLowerCase());
    setFilteredHotels(results);
  }, [searchQuery]);

  const handleHotelClick = (hotelId) => {
    const newParams = new URLSearchParams(location.search); // Get the current query parameters
    newParams.set('hotelId', hotelId); // Add the 'hotelId' query parameter (optional)
  
    // Use navigate to route to the hotel detail page
    navigate(`/hotel/${hotelId}?${newParams.toString()}`); // Update the URL with the query params
  };

  return (
    <div className="p-6 w-300 mx-auto">
      <h1 className="text-xl font-bold mb-4">Search Results for: {searchQuery}</h1>

    {filteredHotels.length > 0 ? (
      filteredHotels.map((hotel) => (
        <div 
          key={hotel.id} 
          className="bg-white p-4 shadow-lg rounded-lg border border-gray-300 flex mb-4 cursor-pointer" 
          onClick={() => handleHotelClick(hotel.id)} // Passing hotel.id
        >
          <img src={hotel.image} alt={hotel.name} className="w-48 h-32 object-cover text-gray-600 rounded-md" />
          <div className="ml-4">
            <h2 className="text-lg text-gray-600 font-semibold">{hotel.name}</h2>
            <p className="text-gray-600">{hotel.location}</p>
            <p className="text-lg text-gray-600 font-bold">Rs. {hotel.price}</p>
            <p className="text-yellow-500 font-semibold">⭐ {hotel.rating} ({hotel.reviews} reviews)</p>
          </div>
        </div>
      ))
    ) : (
      <p>No hotels found in {searchQuery}.</p>
    )}

    </div>
  );
}

export default SearchResults;
