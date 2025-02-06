import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import AppContext from "../context/AppContext";

const Skills = () => {
  const [formData, setFormData] = useState({
    title: "",
    category: "frontend",
  });
  const navigate = useNavigate();
  const { handleAddSkills } = useContext(AppContext);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleAddSkills(formData);
    console.log("Submitting data:", formData);
    setFormData({ title: "", category: "frontend" });
  };

  return (
    <div className="w-full h-screen flex items-center justify-center">
      <div className="w-1/3 mx-auto p-6 bg-gray-800 text-white rounded-lg shadow-md">
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="skill"
              className="block text-sm font-medium text-gray-300"
            >
              Skill
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="category"
              className="block text-sm font-medium text-gray-300"
            >
              Category
            </label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              <option value="frontend">Frontend</option>
              <option value="backend">Backend</option>
              <option value="fullstack">Fullstack</option>
              <option value="devops">DevOps</option>
            </select>
          </div>
          <div className="flex justify-center gap-4">
            <button
              type="submit"
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-md"
            >
              Add Skills
            </button>
            <button
              onClick={() => navigate("/home/dashboard")}
              type="button"
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-md"
            >
              Next
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Skills;
