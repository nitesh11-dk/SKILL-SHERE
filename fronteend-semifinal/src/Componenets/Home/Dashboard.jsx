import React, { useContext, useEffect, useState } from "react";
import AppContext from "../../context/AppContext";
import { Link } from "react-router-dom";

const DashBoard = () => {
  const [users, setUsers] = useState([]);
  const { getAllUsers } = useContext(AppContext);

  const fetchUsers = async () => {
    const res = await getAllUsers();
    // console.log(res);
    if (res && res.data) {
      setUsers(res.data);
    }
  };
  useEffect(() => {
    fetchUsers();
  }, []);

  const getColor = (index) => {
    const colors = ["#FF5733", "#33FF57", "#3357FF", "#F3FF33"];
    return colors[index % colors.length];
  };

  return (
    <div className="bg-gray-800 p-8 rounded-lg">
      <h2 className="text-white text-2xl font-bold mb-6">User Requests</h2>
      {users.map((user, index) => (
        <Link to={`/home/user/${user._id}`} key={user._id}>
          <div className="flex items-center justify-between bg-gray-700 p-6 mb-4 rounded-md">
            <div className="flex items-center">
              <div
                className="w-14 h-14 rounded-full flex items-center justify-center"
                style={{ backgroundColor: getColor(index) }}
              >
                <span className="text-white text-xl font-bold">
                  {user.fullName.charAt(0)}
                </span>
              </div>
              <div className="ml-4">
                <h3 className="text-white text-xl">{user.fullName}</h3>
                <p className="text-gray-400">Email: {user.email}</p>
              </div>
            </div>
            {/* <div className="text-yellow-400 text-xl font-bold">
              {user.rating} ★
            </div> */}
          </div>
        </Link>
      ))}
    </div>
  );
};

export default DashBoard;
