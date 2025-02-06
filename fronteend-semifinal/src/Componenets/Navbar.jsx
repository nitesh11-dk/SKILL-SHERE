import { FaChalkboardTeacher, FaUsers, FaLaptopCode } from "react-icons/fa";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useContext } from "react";
import AppContext from "../context/AppContext";

const Navbar = () => {
  const { logoutUser, isLoggedIn } = useContext(AppContext);

  return (
    <div className="bg-gray-900">
      <header className="py-6 px-12 flex justify-between items-center border-b border-gray-700">
        <h1 className="text-3xl font-bold">SkillShareHub</h1>
        <nav>
          <ul className="flex gap-8 text-lg">
            {isLoggedIn ? (
              <>
                <li
                  className="hover:text-blue-400 cursor-pointer"
                  onClick={logoutUser}
                >
                  Logout
                </li>
              </>
            ) : (
              <>
                <Link to={"/register"}>
                  <li className="hover:text-blue-400 cursor-pointer">Signup</li>
                </Link>
                <Link to={"/login"}>
                  <li className="hover:text-blue-400 cursor-pointer">Login</li>
                </Link>
              </>
            )}
          </ul>
        </nav>
      </header>
    </div>
  );
};

export default Navbar;
