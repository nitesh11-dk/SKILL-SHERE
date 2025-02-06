import React, { useContext, useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom"; // Import Link for navigation
import AppContext from "../../context/AppContext";
import Booking from "./Booking"; // Import Booking component

const UserDetails = () => {
  const { id } = useParams();
  const { getUserById, addReview } = useContext(AppContext);
  const [user, setUser] = useState(null);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [reviewData, setReviewData] = useState({ rating: 0, comment: "" }); // Object to hold rating and comment
  const [showBookingForm, setShowBookingForm] = useState(false); // State to control booking form visibility

  const fetchUser = async () => {
    const res = await getUserById(id); // Fetch user details by ID
    if (res && res.data) {
      setUser(res.data);
    }
  };

  useEffect(() => {
    fetchUser();
  }, [ ]);

  const renderRating = (rating) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 !== 0;
    return (
      <div className="flex">
        {[...Array(fullStars)].map((_, index) => (
          <span key={index} className="text-yellow-400">
            ★
          </span>
        ))}
        {halfStar && <span className="text-yellow-400">☆</span>}
      </div>
    );
  };

  const handleAddReview = async (e) => {
    e.preventDefault(); // Prevent default form submission
    const { rating, comment } = reviewData; // Destructure rating and comment from the object
    await addReview({ rating, comment, userId: id });
    setShowReviewForm(false);
    setReviewData({ rating: 0, comment: "" }); // Reset review data
    fetchUser(); // Refresh user data to show new review
  };

  return (
    <div className="bg-gray-800 p-6 rounded-lg">
      {user ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* User Information Section */}
          <div className="p-4 bg-gray-700 rounded-md">
            <div className="flex items-center mb-4">
              {/* Logo with First Letter */}
              <div className="w-16 h-16 bg-blue-500 text-white flex items-center justify-center rounded-full font-bold text-5xl">
                {user.fullName.charAt(0).toUpperCase()}
              </div>
              <div className="ml-4">
                <p className="text-white uppercase text-lg font-bold">
                  {user.fullName}
                </p>
                <p className="text-gray-300 text-md">{user.username}</p>
                <p className="text-gray-300">{user.email}</p>
              </div>
            </div>
            <button
              className="bg-blue-500 text-white text-lg mt-4 inline-block py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300 w-full"
              onClick={() => setShowBookingForm(true)} // Show booking form on click
            >
              Learn
            </button>
          </div>

          {/* Overall Rating Card */}
          <div className="bg-gray-700 p-4 rounded-md">
            <h3 className="text-white text-xl font-bold mt-4">Skills</h3>
            {user.skills.length > 0 ? (
              <div className="flex flex-wrap">
                {user.skills.map((skill) => (
                  <button
                    key={skill._id}
                    className="bg-zinc-600 p-2 mb-2 mt-2 mr-2 rounded-md flex items-center"
                  >
                    <h4 className="text-yellow-400">{skill.title}</h4>
                  </button>
                ))}
              </div>
            ) : (
              <p className="text-gray-400">No skills available.</p>
            )}

            <h3 className="text-white text-xl mt-3 font-bold mb-2">
              Overall Rating
            </h3>
            <div className="text-yellow-400 mb-4">
              {renderRating(
                user.reviews.length > 0
                  ? user.reviews.reduce(
                      (acc, review) => acc + review.rating,
                      0
                    ) / user.reviews.length
                  : 0
              )}
            </div>
          </div>

          {/* Reviews Section */}
          <div className="col-span-2">
            <h3 className="text-white text-xl font-bold mt-4">Reviews</h3>
            {user.reviews.length > 0 ? (
              user.reviews.map((review) => (
                <div
                  key={review._id}
                  className="bg-gray-700 p-4 mb-4 rounded-md flex items-start"
                >
                  {/* Reviewer Logo */}
                  <div className="w-10 h-10 bg-green-500 text-white flex items-center justify-center rounded-full font-bold text-lg mr-4">
                    {review.reviewer.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <p className="text-gray-300 font-bold">{review.reviewer}</p>
                    <p className="text-gray-300">
                      <strong>Rating:</strong> {renderRating(review.rating)}
                    </p>
                    <p className="text-gray-300">
                      <strong>Comment:</strong> {review.comment}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-400">No reviews available.</p>
            )}

            {/* Add Review Button */}
            <button
              className="bg-green-500 text-white text-lg mb-4 inline-block py-2 px-4 rounded-md hover:bg-green-600 transition duration-300 w-full mt-4"
              onClick={() => setShowReviewForm(true)} // Show review form on click
            >
              Add Review
            </button>
          </div>

          {/* Review Form */}
          {showReviewForm && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
              <form
                className="bg-gray-700 p-6 rounded-md w-96"
                onSubmit={handleAddReview}
              >
                <h4 className="text-white text-xl font-bold mb-4">
                  Add Review
                </h4>
                <div className="flex flex-col">
                  <input
                    type="number"
                    value={reviewData.rating}
                    onChange={(e) =>
                      setReviewData({ ...reviewData, rating: e.target.value })
                    }
                    placeholder="Rating (1-5)"
                    className="mt-2 p-2 rounded-md bg-gray-600 text-white"
                    min="1"
                    max="5"
                  />
                  <textarea
                    value={reviewData.comment}
                    onChange={(e) =>
                      setReviewData({ ...reviewData, comment: e.target.value })
                    }
                    placeholder="Comment"
                    className="mt-2 p-2 rounded-md bg-gray-600 text-white h-20"
                  />
                  <div className="flex justify-end mt-4">
                    <button
                      className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300"
                      type="submit"
                    >
                      Submit
                    </button>
                    <button
                      className="bg-red-500 text-white px-4 py-2 rounded-md ml-2 hover:bg-red-600 transition duration-300"
                      type="button"
                      onClick={() => setShowReviewForm(false)}
                    >
                      Close
                    </button>
                  </div>
                </div>
              </form>
            </div>
          )}

          {/* Booking Form */}
          {showBookingForm && (
            <Booking
              user_skills={user.skills}
              provider={id}
              onClose={() => setShowBookingForm(false)}
            />
          )}
        </div>
      ) : (
        <p className="text-gray-400">Loading user details...</p>
      )}
    </div>
  );
};

export default UserDetails;
