import { useParams, useLocation } from "react-router-dom";

function HotelDetail() {
  const location = useLocation();
  const params = new URLSearchParams(location.search); // Get query parameters from the URL
  const searchQuery = params.get("query");
  const fromDate = params.get("from");
  const toDate = params.get("to");
  const guests = params.get("guests");

  return (
    <div className="p-6">
      <ul>
        <li><strong>Location:</strong> {searchQuery}</li>
        <li><strong>From:</strong> {fromDate}</li>
        <li><strong>To:</strong> {toDate}</li>
        <li><strong>Guests:</strong> {guests}</li>
      </ul>
    </div>
  );
}

export default HotelDetail;
