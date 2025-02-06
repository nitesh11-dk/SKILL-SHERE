import React, { useContext, useEffect, useState } from "react";
import AppContext from "../../context/AppContext";
import { FaCheckCircle } from "react-icons/fa"; // Importing the check icon

const RequestedBookings = () => {
  const { reqestedBookings } = useContext(AppContext);
  const [bookings, setBookings] = useState([]);

  const fetchUser = async () => {
    let res = await reqestedBookings();
    if (res && res.success) {
      setBookings(res.data);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {bookings.map((booking) => (
        <div
          key={booking._id}
          className="bg-gray-800 text-white shadow-md rounded-lg p-4"
        >
          <h2 className="text-xl font-semibold">
            Booking Type: {booking.type}
          </h2>
          <p className="text-gray-300">
            Status: {booking.status}{" "}
            {booking.status === "accepted" && (
              <FaCheckCircle className="inline text-green-500 ml-2" />
            )}{" "}
            {/* Green tick for accepted status */}
          </p>
          <p className="text-gray-300">Provider: {booking.provider.fullName}</p>
          <p className="text-gray-300">
            Requester: {booking.requester.fullName}
          </p>
          <p className="text-gray-300">
            Is Barter Exchange: {booking.isBarterExchange ? "Yes" : "No"}
          </p>
          <p className="text-gray-300">
            Skills to Learn: {booking.skillsToLearn.join(", ")}
          </p>
        </div>
      ))}
    </div>
  );
};

export default RequestedBookings;
