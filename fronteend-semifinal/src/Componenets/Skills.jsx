import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import AppContext from "../context/AppContext";

const CATEGORIES = [
  { value: "frontend", label: "Frontend" },
  { value: "backend", label: "Backend" },
  { value: "fullstack", label: "Fullstack" },
  { value: "devops", label: "DevOps" },
];

const Skills = () => {
  const navigate = useNavigate();
  const { handleAddSkills } = useContext(AppContext);
  
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting }
  } = useForm({
    defaultValues: {
      title: "",
      category: "frontend"
    }
  });

  const onSubmit = async (data) => {
    const response = await handleAddSkills(data);
    if (response?.success) {
      reset();
    }
  };

  return (
    <div className="w-full h-screen flex items-center justify-center">
      <div className="w-full max-w-md mx-auto p-6 bg-gray-800 text-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center mb-6">Add Your Skills</h2>
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-2">
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-300"
            >
              Skill Title
            </label>
            <input
              {...register("title", { 
                required: "Skill title is required",
                minLength: {
                  value: 2,
                  message: "Skill title must be at least 2 characters"
                }
              })}
              type="text"
              id="title"
              placeholder="Enter your skill"
              className="mt-1 block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md shadow-sm 
                focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 
                disabled:opacity-50 disabled:cursor-not-allowed
                sm:text-sm
                ${errors.title ? 'border-red-500' : ''}"
            />
            {errors.title && (
              <p className="mt-1 text-sm text-red-500">
                {errors.title.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <label
              htmlFor="category"
              className="block text-sm font-medium text-gray-300"
            >
              Category
            </label>
            <select
              {...register("category")}
              id="category"
              className="mt-1 block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md shadow-sm 
                focus:outline-none focus:ring-indigo-500 focus:border-indigo-500
                disabled:opacity-50 disabled:cursor-not-allowed
                sm:text-sm"
            >
              {CATEGORIES.map(({ value, label }) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
          </div>

          <div className="flex justify-center gap-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-md
                disabled:opacity-50 disabled:cursor-not-allowed
                transition-colors duration-200"
            >
              {isSubmitting ? "Adding..." : "Add Skills"}
            </button>
            <button
              onClick={() => navigate("/home/dashboard")}
              type="button"
              disabled={isSubmitting}
              className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white font-medium rounded-md
                disabled:opacity-50 disabled:cursor-not-allowed
                transition-colors duration-200"
            >
              Back to Dashboard
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Skills;
