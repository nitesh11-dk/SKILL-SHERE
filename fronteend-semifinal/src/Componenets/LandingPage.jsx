import { FaChalkboardTeacher, FaUsers, FaLaptopCode } from "react-icons/fa";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";

const LandingPage = () => {
  return (
    <div className="bg-gray-900 text-white min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 flex flex-col items-center justify-center px-16">
        {/* Hero Content */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-5xl font-bold text-blue-400">
            Learn. Share. Grow.
          </h2>
          <p className="mt-4 text-lg text-gray-400">
            Join a community of learners and experts. Teach, learn, and
            collaborate in real time.
          </p>
          <Link to="/register">
            <button className="mt-6 px-6 py-3 text-lg bg-blue-500 hover:bg-blue-600 rounded-xl font-semibold shadow-lg">
              Get Started
            </button>
          </Link>
        </motion.div>

        {/* Features Section */}
        <div className="mt-16 grid grid-cols-3 gap-12">
          <motion.div
            className="bg-gray-800 p-6 rounded-xl text-center shadow-md hover:shadow-lg"
            whileHover={{ scale: 1.05 }}
          >
            <FaChalkboardTeacher className="text-4xl text-blue-400 mx-auto" />
            <h3 className="text-xl font-semibold mt-4">Teach Your Skills</h3>
            <p className="text-gray-400 mt-2">
              Share your expertise and mentor others.
            </p>
          </motion.div>

          <motion.div
            className="bg-gray-800 p-6 rounded-xl text-center shadow-md hover:shadow-lg"
            whileHover={{ scale: 1.05 }}
          >
            <FaUsers className="text-4xl text-green-400 mx-auto" />
            <h3 className="text-xl font-semibold mt-4">Join a Community</h3>
            <p className="text-gray-400 mt-2">
              Connect with like-minded individuals.
            </p>
          </motion.div>

          <motion.div
            className="bg-gray-800 p-6 rounded-xl text-center shadow-md hover:shadow-lg"
            whileHover={{ scale: 1.05 }}
          >
            <FaLaptopCode className="text-4xl text-purple-400 mx-auto" />
            <h3 className="text-xl font-semibold mt-4">Learn New Skills</h3>
            <p className="text-gray-400 mt-2">
              Gain knowledge from industry experts.
            </p>
          </motion.div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-6 text-center border-t border-gray-700">
        <p className="text-gray-400">
          &copy; 2025 SkillShareHub. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default LandingPage;
