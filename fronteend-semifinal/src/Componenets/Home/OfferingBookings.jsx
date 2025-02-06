import React, { useContext, useEffect, useState } from "react";
import AppContext from "../../context/AppContext";

const OfferingBookings = () => {
  const [bookings, setBookings] = useState([]);
  const { offeringBookings, setBookingStatus, scheduleBookingDate } =
    useContext(AppContext);

  const fetchUser = async () => {
    const response = await offeringBookings();
    if (response && response.data) {
      setBookings(response.data);
    }
  };

  const handleStatusChange = async (bookingId, action) => {
    const booking = bookings.find((b) => b._id === bookingId);
    if (booking.status === "accept" || booking.status === "reject") {
      alert("Once accepted or rejected, the status cannot be changed.");
      return;
    }

    let res = await setBookingStatus({ bookingId, action });
    if (res.success) {
      // Update the booking status in the local state
      setBookings((prevBookings) =>
        prevBookings.map((booking) =>
          booking._id === bookingId
            ? {
                ...booking,
                status: action,
                date: action === "accept" ? "" : booking.date,
              }
            : booking
        )
      );
    } else {
      // Handle error case if needed
    }
  };

  const handleDateChange = async (bookingId, date) => {
    // Function to handle date change
    // console.log(`Date changed for booking ${bookingId}: ${newDate}`);
    // await scheduleBookingDate({ bookingId, date });
    // Additional logic for handling the date change can be added here
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {bookings.map((booking) => (
        <div key={booking._id} className="bg-white shadow-md rounded-lg p-4">
          <h2 className="text-xl font-semibold">
            Booking Type: {booking.type}
          </h2>
          <p className="text-gray-700">Status: {booking.status}</p>
          <select
            value={booking.status}
            onChange={(e) => handleStatusChange(booking._id, e.target.value)}
            className="mt-2 p-2 border rounded"
            disabled={
              booking.status === "accept" || booking.status === "reject"
            }
          >
            <option value="pending">Pending</option>
            <option value="accept">Accept</option>
            <option value="reject">Reject</option>
          </select>
          {booking.status === "accept" && (
            <input
              type="date"
              onChange={(e) => handleDateChange(booking._id, e.target.value)}
              className="mt-2 p-2 border rounded"
            />
          )}
          <p className="text-gray-700">Provider: {booking.provider.fullName}</p>
          <p className="text-gray-700">
            Requester: {booking.requester.fullName}
          </p>
          <p className="text-gray-700">
            Is Barter Exchange: {booking.isBarterExchange ? "Yes" : "No"}
          </p>
          <p className="text-gray-700">
            Barter Skills: {booking.barterSkill.join(", ") || "None"}
          </p>
        </div>
      ))}
    </div>
  );
};

export default OfferingBookings;
