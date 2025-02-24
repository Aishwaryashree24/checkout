import { useState } from "react";
import { useNavigate } from "react-router-dom";

const popularLocations = [
  { name: "New Delhi / NCR", img: "https://plus.unsplash.com/premium_photo-1661919589683-f11880119fb7?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", accommodations: 12786 },
  { name: "Goa", img: "https://plus.unsplash.com/premium_photo-1697729701846-e34563b06d47?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8MHx8fA%3D%3D", accommodations: 9254 },
  { name: "Mumbai", img: "https://images.unsplash.com/photo-1562979314-bee7453e911c?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8MHx8fA%3D%3D", accommodations: 4177 },
  { name: "Bangalore", img: "https://images.unsplash.com/photo-1596176530529-78163a4f7af2?q=80&w=2127&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8MHx8fA%3D%3D", accommodations: 5372 },
  { name: "Chennai", img: "https://images.unsplash.com/photo-1585999322539-fee6e6321a39?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8MHx8fA%3D%3D", accommodations: 2000 },
  { name: "Hyderabad", img: "https://images.unsplash.com/photo-1551161242-b5af797b7233?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aHlkZXJhYmFkfGVufDB8fDB8fHww", accommodations: 100050 },
  { name: "Kolkata", img: "https://images.unsplash.com/photo-1571679654681-ba01b9e1e117?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8a29sa2F0YXxlbnwwfHwwfHx8MA%3D%3D", accommodations: 1800 },
];

function HomePage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [guests, setGuests] = useState("");
  const [filteredLocations, setFilteredLocations] = useState([]);
  const navigate = useNavigate();

  const handleSearch = () => {
    // Ensure that all fields are filled before proceeding
    if (searchTerm && fromDate && toDate && guests) {
      navigate(
        `/search-results?query=${searchTerm}&from=${fromDate}&to=${toDate}&guests=${guests}`
      );
    } else {
      alert("Please fill in all fields before searching.");
    }
  };

  const handleSearchInput = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    // Filter the popular locations as the user types
    if (value) {
      const filtered = popularLocations.filter((loc) =>
        loc.name.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredLocations(filtered);
    } else {
      setFilteredLocations([]);
    }
  };

  const handleDestinationClick = (location) => {
    // When a location is clicked, populate the search input and clear filtered locations
    setSearchTerm(location.name);
    setFilteredLocations([]);
  };

  // Sorting top destinations based on the number of accommodations
  const topDestinations = popularLocations
    .sort((a, b) => b.accommodations - a.accommodations)
    .slice(0, 5);

  return (
    <div className="flex flex-col items-center p-6 w-screen">
      <div className="bg-white shadow-lg p-6 rounded-lg w-full max-w-4xl flex flex-col gap-4 border border-gray-300 relative">
        {/* Search Input */}
        <div className="relative w-full">
          <input
            type="text"
            placeholder="Enter a destination or property"
            value={searchTerm}
            onChange={handleSearchInput}
            className="border border-gray-400 p-2 rounded w-full placeholder-gray-500 text-black"
          />

          {/* Filtered suggestions based on user input */}
          {filteredLocations.length > 0 && (
            <ul className="bg-white border border-gray-300 rounded shadow-md w-full text-black absolute top-full left-0 z-50">
              {filteredLocations.map((loc, index) => (
                <li
                  key={index}
                  onClick={() => handleDestinationClick(loc)}
                  className="p-2 hover:bg-gray-200 cursor-pointer"
                >
                  {loc.name}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Date Inputs */}
        <div className="flex gap-4">
          <input
            type="date"
            placeholder="From Date"
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
            className="border border-gray-400 p-2 rounded w-full placeholder-gray-500 text-black"
          />
          <input
            type="date"
            placeholder="To Date"
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
            className="border border-gray-400 p-2 rounded w-full placeholder-gray-500 text-black"
          />
        </div>

        {/* Guest Number Select */}
        <select
          value={guests}
          onChange={(e) => setGuests(e.target.value)}
          className="border border-gray-400 p-2 rounded w-full placeholder-gray-500 text-black"
        >
          <option value="" disabled className="text-black">Number of Guests</option>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((num) => (
            <option key={num} value={num} className="text-black">
              {`${num} ${num > 1 ? "adults" : "adult"}`}
            </option>
          ))}
        </select>

        {/* Search Button */}
        <button onClick={handleSearch} className="bg-blue-500 text-white p-2 rounded w-full hover:bg-blue-600 border border-gray-400">
          Search
        </button>
      </div>

      {/* Top Destinations Section */}
      <h2 className="text-xl font-bold mt-8">Top destinations in India</h2>
      <div className="flex flex-wrap gap-12 mt-4 overflow-x-auto">
        {topDestinations.map((loc, index) => (
          <div
            key={index}
            className="bg-white shadow-lg rounded-lg p-4 w-48 border border-gray-300 cursor-pointer"
            onClick={() => handleDestinationClick(loc)}
          >
            <img src={loc.img} alt={loc.name} className="w-full h-32 object-cover rounded-md" />
            <p className="font-semibold mt-2 text-black">{loc.name}</p>
            <span className="text-gray-600 text-sm text-black">{loc.accommodations} accommodations</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HomePage;
