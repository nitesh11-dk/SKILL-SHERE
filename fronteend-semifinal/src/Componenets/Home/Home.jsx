import {
  FaChalkboardTeacher,
  FaUsers,
  // CgProfile,
  FaHome,
  FaHandHoldingHeart,
} from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { NavLink, Outlet } from "react-router-dom";
import { motion } from "framer-motion";

const Home = () => {
  return (
    <div className="flex h-screen bg-gray-900 overflow-hidden text-white">
      {/* Sidebar */}
      <nav className="w-1/4 md:w-1/3 lg:w-1/4 bg-gray-800 p-6 flex flex-col justify-between">
        <div>
          <h2 className="text-2xl font-bold text-blue-400 mb-8">
            SkillShareHub
          </h2>
          <ul className="space-y-6">
            <li>
              <NavLink
                to="/home"
                className={({ isActive }) =>
                  isActive ? "text-blue-400" : "text-gray-400 hover:text-white"
                }
              >
                <FaHome className="inline mr-2" /> Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/home/requested-bookings"
                className={({ isActive }) =>
                  isActive ? "text-green-400" : "text-gray-400 hover:text-white"
                }
              >
                <FaUsers className="inline mr-2" /> Requests Bookings
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/home/offered-bookings"
                className={({ isActive }) =>
                  isActive
                    ? "text-purple-400"
                    : "text-gray-400 hover:text-white"
                }
              >
                <FaHandHoldingHeart className="inline mr-2" /> Offerening
                Bookings
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/home/schedule-booking"
                className={({ isActive }) =>
                  isActive ? "text-blue-400" : "text-gray-400 hover:text-white"
                }
              >
                <FaChalkboardTeacher className="inline mr-2" /> Calender Booking
              </NavLink>
            </li>
            <li>
              {/* <NavLink
                to="/profile"
                className={({ isActive }) =>
                  isActive ? "text-blue-400" : "text-gray-400 hover:text-white"
                }
              >
                <CgProfile className="inline mr-2" /> Profile
              </NavLink> */}
            </li>
          </ul>
        </div>

        <footer className="text-gray-400 mt-auto">
          <p>&copy; 2025 SkillShareHub. All rights reserved.</p>
        </footer>
      </nav>

      {/* Main Content */}
      <div className="flex-1 bg-gray-900 p-8 overflow-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default Home;
