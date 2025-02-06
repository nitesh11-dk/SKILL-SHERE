import {
  FaChalkboardTeacher,
  FaUsers,
  // CgProfile,
  FaHome,
  FaHandHoldingHeart,
} from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useContext } from "react";
import AppContext from "../../context/AppContext";

const Home = () => {
  const navigate = useNavigate();
  const { logoutUser } = useContext(AppContext);
  return (
    <div className="flex h-screen bg-gray-900 overflow-hidden text-white">
      {/* Sidebar */}
      <nav className="w-1/4 md:w-1/3 lg:w-1/5 bg-gray-800 p-6 flex flex-col justify-between">
        <div>
          <h2 className="text-2xl  font-bold text-blue-400 mb-8 flex items-center justif-between">
            Skill-Sync{" "}
            <button
              onClick={() => {
                logoutUser();
                navigate("/");
              }}
              className="text-red-800 bg-red-300 relative -right-16  px-1 mx-2 rounded hover:text-red-700"
            >
              Logout
            </button>
          </h2>
          <ul className="space-y-6">
            <li>
              <NavLink
                to="/home/dashboard"
                className={({ isActive }) =>
                  isActive ? "text-blue-400" : "text-gray-400 hover:text-white"
                }
              >
                <FaHome className="inline text-2xl mr-2" />{" "}
                <span className="text-2xl relative top-1">Home</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/home/requested-bookings"
                className={({ isActive }) =>
                  isActive ? "text-green-400" : "text-gray-400 hover:text-white"
                }
              >
                <FaUsers className="inline text-2xl mr-2" />{" "}
                <span className="text-2xl relative top-1">
                  Requests Bookings
                </span>
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
                <FaHandHoldingHeart className="inline text-2xl mr-2" />{" "}
                <span className="text-2xl relative top-1">
                  Offerening Bookings
                </span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/home/schedule-booking"
                className={({ isActive }) =>
                  isActive ? "text-blue-400" : "text-gray-400 hover:text-white"
                }
              >
                <FaChalkboardTeacher className="inline text-2xl mr-2" />{" "}
                <span className="text-2xl relative top-1">
                  Calender Booking
                </span>
              </NavLink>
            </li>
            <li>
              {/* <NavLink
                to="/profile"
                className={({ isActive }) =>
                  isActive ? "text-blue-400" : "text-gray-400 hover:text-white"
                }
              >
                <CgProfile className="inline text-2xl mr-2" /> Profile
              </NavLink> */}
            </li>
          </ul>
        </div>

        <footer className="text-gray-400 mt-auto">
          <p>&copy; 2025 Skill-Sync Avinya </p>
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
