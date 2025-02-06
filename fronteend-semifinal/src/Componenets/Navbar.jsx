import { FaChalkboardTeacher, FaUsers, FaLaptopCode } from "react-icons/fa";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";


const Navbar = () => {

  return (
    <div className="bg-gray-900">
      <header className="py-6 px-12 flex justify-between items-center border-b border-gray-700">
        <h1 className="text-3xl font-bold">SkillShareHub</h1>
        <nav>
          <ul className="flex gap-8 text-lg">
            <Link to={'/register'}> <li className="hover:text-blue-400 cursor-pointer">Signup</li></Link>
            <Link to={'/login'}> <li className="hover:text-blue-400 cursor-pointer">Login</li></Link>
          </ul>
        </nav>
      </header>

    </div>
  );
};

export default Navbar;
