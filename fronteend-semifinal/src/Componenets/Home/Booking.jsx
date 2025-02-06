import React, { useContext, useState } from "react";
import AppContext from "../../context/AppContext";

const Booking = ({ user_skills, provider, onClose }) => {
  // Added onClose prop
  const [bookingData, setBookingData] = useState({
    provider,
    type: "requesting",
    skillsToLearn: [],
    isBarterExchange: true,
    barterSkill: [],
  });
  const { creatBooking } = useContext(AppContext);

  const [error, setError] = useState(""); // State to hold error message

  const skills = user_skills.map((s) => s.title);

  const handleSkillChange = (skill) => {
    setBookingData((prev) => ({
      ...prev,
      skillsToLearn: prev.skillsToLearn.includes(skill)
        ? prev.skillsToLearn.filter((s) => s !== skill)
        : [...prev.skillsToLearn, skill],
    }));
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setBookingData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (bookingData.skillsToLearn.length === 0) {
      setError("At least one skill to learn is required."); // Set error message
      return;
    }
    setError(""); // Clear error message
    creatBooking(bookingData);
    onClose();
  };

  return (
    <div className="absolute w-1/2 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 backdrop-blur-md">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-900 p-6 rounded-lg shadow-md w-full relative" // Added relative for positioning
      >
        <button
          type="button"
          onClick={onClose} // Close form on click
          className="absolute top-2 text-5xl right-5 text-gray-400 hover:text-white" // Close button styling
        >
          &times; {/* Close icon */}
        </button>
        <h2 className="text-white text-3xl mb-4">Create Booking</h2>
        {error && <p className="text-red-500">{error}</p>}{" "}
        {/* Display error message */}
        <div className="mb-4">
          <label className="text-gray-300 text-lg">Type:</label>
          <p className="mt-1 block w-full text-xl p-2 bg-gray-700 text-white rounded-md">
            Requesting
          </p>
        </div>
        <div className="mb-4">
          <label className="text-gray-300 text-lg">Skills to Learn:</label>
          <div className="flex flex-col mt-1">
            {skills.map((skill) => (
              <label key={skill} className="flex items-center text-xl">
                <input
                  type="checkbox"
                  value={skill}
                  onChange={() => handleSkillChange(skill)}
                  className="mr-2"
                />
                {skill}
              </label>
            ))}
          </div>
        </div>
        <div className="mb-4"></div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-xl p-2 rounded-md text-white"
        >
          Create Booking
        </button>
      </form>
    </div>
  );
};

export default Booking;
