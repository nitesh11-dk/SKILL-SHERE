import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import AppContext from "../../context/AppContext";
import Booking from "./Booking";

const ReviewForm = ({ onSubmit, onClose }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm({
    defaultValues: {
      rating: "",
      comment: ""
    }
  });

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <form 
        className="bg-gray-700 p-6 rounded-md w-96"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h4 className="text-white text-xl font-bold mb-4">Add Review</h4>
        <div className="space-y-4">
          <div>
            <input
              {...register("rating", {
                required: "Rating is required",
                min: { value: 1, message: "Rating must be at least 1" },
                max: { value: 5, message: "Rating must not exceed 5" }
              })}
              type="number"
              placeholder="Rating (1-5)"
              className="w-full p-2 rounded-md bg-gray-600 text-white"
            />
            {errors.rating && (
              <p className="mt-1 text-sm text-red-500">{errors.rating.message}</p>
            )}
          </div>

          <div>
            <textarea
              {...register("comment", {
                required: "Comment is required",
                minLength: { value: 10, message: "Comment must be at least 10 characters" }
              })}
              placeholder="Comment"
              className="w-full p-2 rounded-md bg-gray-600 text-white h-20"
            />
            {errors.comment && (
              <p className="mt-1 text-sm text-red-500">{errors.comment.message}</p>
            )}
          </div>

          <div className="flex justify-end gap-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 
                transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Submitting..." : "Submit"}
            </button>
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 
                transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Cancel
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

const UserDetails = () => {
  const { id } = useParams();
  const { getUserById, addReview } = useContext(AppContext);
  const [user, setUser] = useState(null);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [showBookingForm, setShowBookingForm] = useState(false);

  const fetchUser = async () => {
    const response = await getUserById(id);
    if (response?.success) {
      setUser(response.data);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const renderRating = (rating) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 !== 0;
    return (
      <div className="flex">
        {[...Array(fullStars)].map((_, index) => (
          <span key={index} className="text-yellow-400">★</span>
        ))}
        {halfStar && <span className="text-yellow-400">☆</span>}
      </div>
    );
  };

  const handleAddReview = async (data) => {
    const response = await addReview({ ...data, userId: id });
    if (response?.success) {
      setShowReviewForm(false);
      fetchUser();
    }
  };

  if (!user) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-800">
        <p className="text-gray-400 text-xl">Loading user details...</p>
      </div>
    );
  }

  const averageRating = user.reviews.length > 0
    ? user.reviews.reduce((acc, review) => acc + review.rating, 0) / user.reviews.length
    : 0;

  return (
    <div className="bg-gray-800 p-6 rounded-lg">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* User Information Section */}
        <div className="p-4 bg-gray-700 rounded-md">
          <div className="flex items-center mb-4">
            <div className="w-16 h-16 bg-blue-500 text-white flex items-center justify-center rounded-full font-bold text-5xl">
              {user.fullName.charAt(0).toUpperCase()}
            </div>
            <div className="ml-4">
              <p className="text-white uppercase text-lg font-bold">{user.fullName}</p>
              <p className="text-gray-300 text-md">{user.username}</p>
              <p className="text-gray-300">{user.email}</p>
            </div>
          </div>
          <button
            className="w-full bg-blue-500 text-white text-lg py-2 px-4 rounded-md 
              hover:bg-blue-600 transition-colors duration-200"
            onClick={() => setShowBookingForm(true)}
          >
            Learn
          </button>
        </div>

        {/* Skills and Rating Card */}
        <div className="bg-gray-700 p-4 rounded-md">
          <h3 className="text-white text-xl font-bold mb-4">Skills</h3>
          {user.skills.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {user.skills.map((skill) => (
                <span
                  key={skill._id}
                  className="bg-zinc-600 px-3 py-1 rounded-md text-yellow-400"
                >
                  {skill.title}
                </span>
              ))}
            </div>
          ) : (
            <p className="text-gray-400">No skills available.</p>
          )}

          <h3 className="text-white text-xl font-bold mt-6 mb-2">Overall Rating</h3>
          <div className="text-yellow-400 text-xl">
            {renderRating(averageRating)}
          </div>
        </div>

        {/* Reviews Section */}
        <div className="col-span-2">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-white text-xl font-bold">Reviews</h3>
            <button
              className="bg-green-500 text-white px-4 py-2 rounded-md 
                hover:bg-green-600 transition-colors duration-200"
              onClick={() => setShowReviewForm(true)}
            >
              Add Review
            </button>
          </div>

          <div className="space-y-4">
            {user.reviews.length > 0 ? (
              user.reviews.map((review) => (
                <div
                  key={review._id}
                  className="bg-gray-700 p-4 rounded-md flex items-start"
                >
                  <div className="w-10 h-10 bg-green-500 text-white flex items-center justify-center rounded-full font-bold text-lg mr-4">
                    {review.reviewer.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <p className="text-gray-300 font-bold">{review.reviewer}</p>
                    <div className="my-1">{renderRating(review.rating)}</div>
                    <p className="text-gray-300">{review.comment}</p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-400">No reviews available.</p>
            )}
          </div>
        </div>
      </div>

      {showReviewForm && (
        <ReviewForm
          onSubmit={handleAddReview}
          onClose={() => setShowReviewForm(false)}
        />
      )}

      {showBookingForm && (
        <Booking
          user_skills={user.skills}
          provider={id}
          onClose={() => setShowBookingForm(false)}
        />
      )}
    </div>
  );
};

export default UserDetails;
