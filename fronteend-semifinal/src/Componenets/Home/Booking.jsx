import React, { useContext } from "react";
import { useForm, Controller } from "react-hook-form";
import AppContext from "../../context/AppContext";

const Booking = ({ user_skills, provider, onClose }) => {
  const { creatBooking } = useContext(AppContext);
  const skills = user_skills.map((s) => s.title);

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm({
    defaultValues: {
      provider,
      type: "requesting",
      skillsToLearn: [],
      isBarterExchange: true,
      barterSkill: [],
    }
  });

  const onSubmit = async (data) => {
    const response = await creatBooking(data);
    if (response?.success) {
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-gray-900 p-6 rounded-lg shadow-md w-full max-w-2xl relative">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors duration-200"
        >
          <span className="text-2xl">&times;</span>
        </button>

        <h2 className="text-white text-2xl font-bold mb-6">Create Booking</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label className="block text-gray-300 text-lg mb-2">Type:</label>
            <p className="block w-full text-lg p-2 bg-gray-700 text-white rounded-md">
              Requesting
            </p>
          </div>

          <div>
            <label className="block text-gray-300 text-lg mb-2">
              Skills to Learn:
            </label>
            <Controller
              name="skillsToLearn"
              control={control}
              rules={{ 
                required: "Please select at least one skill",
                validate: value => value.length > 0 || "At least one skill is required"
              }}
              render={({ field: { onChange, value } }) => (
                <div className="space-y-2">
                  {skills.map((skill) => (
                    <label key={skill} className="flex items-center text-lg text-white">
                      <input
                        type="checkbox"
                        checked={value.includes(skill)}
                        onChange={(e) => {
                          const newValue = e.target.checked
                            ? [...value, skill]
                            : value.filter(s => s !== skill);
                          onChange(newValue);
                        }}
                        className="mr-3 h-5 w-5 rounded border-gray-300 text-blue-500 focus:ring-blue-500"
                      />
                      {skill}
                    </label>
                  ))}
                </div>
              )}
            />
            {errors.skillsToLearn && (
              <p className="mt-2 text-sm text-red-500">
                {errors.skillsToLearn.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white text-lg py-2 px-4 rounded-md
              transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Creating..." : "Create Booking"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Booking;
