import { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

const Checkout = () => {
  const [hotelDetails, setHotelDetails] = useState(null);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [numberOfNights, setNumberOfNights] = useState(1);
  const [timeLeft, setTimeLeft] = useState(600);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [wallet, setWallet] = useState(1000);
  const [showModal, setShowModal] = useState(false); // State to control modal visibility
  const [modalMessage, setModalMessage] = useState(""); // State to store modal message

  useEffect(() => {
    const dummyData = {
      name: "Grand Hotel",
      rating: 4.5,
      reviews: "Excellent service and amenities.",
      location: "123 Main St, New York, NY",
      photo: "https://th.bing.com/th/id/OIP.eUmRjpZOz3-yqS_-wEwRPQHaE8?rs=1&pid=ImgDetMain",
      roomType: "Deluxe Room",
      originalPrice: 790,
      discount: 20,
      bookingFees: 15,
      maxPeople: 2,
      roomCount: 2,
      wallet: 10000,
      cancellationPolicy: "Free cancellation within 24 hours of booking.",
      roomImages: [
        "https://th.bing.com/th/id/OIP.eUmRjpZOz3-yqS_-wEwRPQHaE8?rs=1&pid=ImgDetMain",
        "https://th.bing.com/th/id/OIP.ETQpUS3wKll91XlggYSEJQHaE8?rs=1&pid=ImgDetMain",
        "https://th.bing.com/th/id/OIP.EHkOkOQcMloWfrd2qDWn9wHaE8?rs=1&pid=ImgDetMain",
      ],
    };

    setTimeout(() => {
      setHotelDetails(dummyData);
    }, 1000);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timer);
          setModalMessage("Session timed out!");
          setShowModal(true);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };

  const calculateTotalPrice = (originalPrice, discount, bookingFees, numberOfNights) => {
    const discountedPrice = originalPrice - originalPrice * (discount / 100);
    const totalPrice = (discountedPrice + bookingFees) * numberOfNights;
    const totalPriceWithGST = totalPrice * 1.18; // Adding GST of 18%
    return totalPriceWithGST.toFixed(2);
  };

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 !== 0;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

    return (
      <>
        {Array.from({ length: fullStars }, (_, index) => (
          <FaStar key={`full-${index}`} color="#ffc107" />
        ))}
        {halfStar && <FaStarHalfAlt color="#ffc107" />}
        {Array.from({ length: emptyStars }, (_, index) => (
          <FaRegStar key={`empty-${index}`} color="#e4e5e9" />
        ))}
      </>
    );
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % hotelDetails.roomImages.length);
  };

  const handlePrevImage = () => {
    setCurrentImageIndex(
      (prevIndex) => (prevIndex - 1 + hotelDetails.roomImages.length) % hotelDetails.roomImages.length
    );
  };

  const handleBookNow = () => {
    const totalPrice = parseFloat(
      calculateTotalPrice(hotelDetails.originalPrice, hotelDetails.discount, hotelDetails.bookingFees, numberOfNights)
    );

    if (wallet >= totalPrice) {
      setWallet(wallet - totalPrice);
      setModalMessage(`Booking successful! Your new wallet balance is ₹${wallet - totalPrice}`);
      setShowModal(true);
    } else {
      setModalMessage("Insufficient funds in your wallet.");
      setShowModal(true);
    }
  };

  if (!hotelDetails) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  const totalPrice = calculateTotalPrice(
    hotelDetails.originalPrice,
    hotelDetails.discount,
    hotelDetails.bookingFees,
    numberOfNights
  );

  return (
    <div className="container mx-auto p-6 bg-blue-300 min-h-screen relative">
      {/* Blurred Background when Modal is Open */}
      {showModal && (
        <div className="fixed inset-0 bg-opacity-50 backdrop-blur-sm z-40"></div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <p className="text-lg mb-4">{modalMessage}</p>
            <button
              onClick={() => setShowModal(false)}
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300">
          {'<'}
        </button>
        <h1 className="text-3xl font-bold text-center flex-grow">Checkout</h1>
      </div>

      {/* Booking and Hotel Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Booking Details Card */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Booking Details</h2>
          <div className="mb-4">
            <p className="text-lg">Session Time Left: {formatTime(timeLeft)}</p>
          </div>
          <div className="mb-4">
            <p className="text-lg">Select Onboarding Date:</p>
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              className="border p-2 rounded w-full"
            />
          </div>
          <div className="mb-4">
            <p className="text-lg">Select Off-boarding Date:</p>
            <DatePicker
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              className="border p-2 rounded w-full"
            />
          </div>
          <div className="mb-4">
            <p className="text-lg">Enter Number of Nights:</p>
            <input
              type="number"
              value={numberOfNights}
              onChange={(e) => setNumberOfNights(Number(e.target.value))}
              className="border p-2 rounded w-full"
              min="1"
            />
          </div>
        </div>

        {/* Hotel Details Card */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center justify-center mb-4">
            <button
              onClick={handlePrevImage}
              className="bg-gray-200 p-2 rounded-l-lg hover:bg-gray-300 transition duration-300"
            >
              &lt;
            </button>
            <div className="w-96 h-64 mx-2 overflow-hidden rounded-lg">
              <img
                src={hotelDetails.roomImages[currentImageIndex]}
                alt="Room"
                className="w-full h-full object-cover"
              />
            </div>
            <button
              onClick={handleNextImage}
              className="bg-gray-200 p-2 rounded-r-lg hover:bg-gray-300 transition duration-300"
            >
              &gt;
            </button>
          </div>
          <p className="text-xl font-semibold">{hotelDetails.name}</p>
          <p className="flex items-center">{renderStars(hotelDetails.rating)}</p>
          <p className="text-gray-600">{hotelDetails.location}</p>
          <div className="mt-4">
            <p className="text-lg">
              {hotelDetails.roomCount} X {hotelDetails.roomType}
            </p>
            <p className="text-lg">Max: {hotelDetails.maxPeople} Adults</p>
          </div>
          <div className="mt-4">
            <a
              href="#"
              onClick={() => {
                setModalMessage(hotelDetails.cancellationPolicy);
                setShowModal(true);
              }}
              className="text-gray-500 hover:text-gray-700 underline"
            >
              Cancellation Policy
            </a>
          </div>
        </div>
      </div>

      {/* Cost Details Card */}
      <div className="bg-white rounded-lg shadow-lg p-6 mt-6">
        <h2 className="text-xl font-semibold mb-4">Cost Details</h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <tbody>
              <tr className="border-b border-gray-300">
                <td className="text-lg font-semibold pr-4 py-2">Original Price:</td>
                <td className="text-lg py-2 text-right">₹{hotelDetails.originalPrice}</td>
              </tr>
              <tr className="border-b border-gray-300">
                <td className="text-lg font-semibold pr-4 py-2">Discounted Price:</td>
                <td className="text-lg py-2 text-right">
                  ₹{(hotelDetails.originalPrice - hotelDetails.originalPrice * (hotelDetails.discount / 100)).toFixed(2)}
                </td>
              </tr>
              <tr className="border-b border-gray-300">
                <td className="text-lg font-semibold pr-4 py-2">Booking Fees:</td>
                <td className="text-lg py-2 text-right">₹{hotelDetails.bookingFees}</td>
              </tr>
              <tr>
                <td className="text-lg font-semibold pr-4 py-2">Total Price (incl. 18% GST):</td>
                <td className="text-lg py-2 font-bold text-right text-green-600">₹{totalPrice}</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Book Now Button */}
        <div className="mt-6 text-right">
          <button
            className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition duration-300"
            onClick={handleBookNow}
          >
            Book Now
          </button>
        </div>
      </div>

      {/* Wallet Balance */}
      <div className="bg-white rounded-lg shadow-lg p-6 mt-6">
        <p className="text-lg">Wallet Balance: ₹{wallet}</p>
      </div>
    </div>
  );
};

export default Checkout;