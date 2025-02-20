import React, { useContext, useEffect, useState } from "react";
import { FaUser, FaExchangeAlt, FaBookReader, FaClock } from "react-icons/fa";
import AppContext from "../../context/AppContext";

const StatusBadge = ({ status }) => {
  const colors = {
    pending: "bg-yellow-500",
    accept: "bg-green-500",
    reject: "bg-red-500"
  };

  return (
    <span className={`${colors[status]} text-white px-3 py-1 rounded-full text-sm font-medium`}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
};

const BookingCard = ({ booking, onStatusChange }) => {
  const isStatusLocked = booking.status === "accept" || booking.status === "reject";

  return (
    <div className="bg-gray-800 border border-gray-700 rounded-lg overflow-hidden hover:border-gray-600 transition-colors duration-200">
      <div className="p-5 space-y-4">
        {/* Header */}
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-semibold text-white capitalize">
            {booking.type} Session
          </h3>
          <StatusBadge status={booking.status} />
        </div>

        {/* Status Control */}
        {!isStatusLocked && (
          <div className="flex items-center space-x-2">
            <select
              value={booking.status}
              onChange={(e) => onStatusChange(booking._id, e.target.value)}
              className="flex-1 bg-gray-700 text-white border border-gray-600 rounded-md px-3 py-2 
                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="pending">Pending</option>
              <option value="accept">Accept</option>
              <option value="reject">Reject</option>
            </select>
          </div>
        )}

        {/* Details */}
        <div className="space-y-3">
          <div className="flex items-center text-gray-300">
            <FaUser className="w-5 h-5 mr-2" />
            <div>
              <p className="text-sm text-gray-400">Provider</p>
              <p className="text-white">{booking.provider.fullName}</p>
            </div>
          </div>

          <div className="flex items-center text-gray-300">
            <FaBookReader className="w-5 h-5 mr-2" />
            <div>
              <p className="text-sm text-gray-400">Requester</p>
              <p className="text-white">{booking.requester.fullName}</p>
            </div>
          </div>

          <div className="flex items-center text-gray-300">
            <FaExchangeAlt className="w-5 h-5 mr-2" />
            <div>
              <p className="text-sm text-gray-400">Barter Exchange</p>
              <p className="text-white">{booking.isBarterExchange ? "Yes" : "No"}</p>
            </div>
          </div>

          {booking.barterSkill?.length > 0 && (
            <div className="flex items-start text-gray-300">
              <FaClock className="w-5 h-5 mr-2 mt-1" />
              <div>
                <p className="text-sm text-gray-400">Barter Skills</p>
                <div className="flex flex-wrap gap-2 mt-1">
                  {booking.barterSkill.map((skill, index) => (
                    <span 
                      key={index}
                      className="bg-gray-700 text-blue-400 px-2 py-1 rounded text-sm"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const OfferingBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { offeringBookings, setBookingStatus } = useContext(AppContext);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        setIsLoading(true);
        const response = await offeringBookings();
        if (response?.data) {
          setBookings(response.data);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchBookings();
  }, [offeringBookings]);

  const handleStatusChange = async (bookingId, action) => {
    const booking = bookings.find((b) => b._id === bookingId);
    if (booking.status === "accept" || booking.status === "reject") {
      return;
    }

    const response = await setBookingStatus({ bookingId, action });
    if (response?.success) {
      setBookings(prevBookings =>
        prevBookings.map(booking =>
          booking._id === bookingId
            ? { ...booking, status: action }
            : booking
        )
      );
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <p className="text-gray-400 text-xl">Loading bookings...</p>
      </div>
    );
  }

  if (!bookings.length) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <p className="text-gray-400 text-xl">No bookings found</p>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-900">
      <h1 className="text-2xl font-bold text-white mb-6">Offering Bookings</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {bookings.map((booking) => (
          <BookingCard
            key={booking._id}
            booking={booking}
            onStatusChange={handleStatusChange}
          />
        ))}
      </div>
    </div>
  );
};

export default OfferingBookings;
