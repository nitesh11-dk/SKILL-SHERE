import { useEffect, useState } from "react";
import AppContext from "./AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import { BASE_URL } from "../constants/config.js";
// Ensure useNavigate is imported

const Appstate = (props) => {
  const [token, setToken] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [reload, setReload] = useState(false);
  const [reload1, setReload1] = useState(false);

  useEffect(() => {
    // userProfile();
  }, [token, reload]);

  useEffect(() => {}, [token, reload1]);

  // reload karne par logout nahi loga
  useEffect(() => {
    let lstoken = localStorage.getItem("token");
    if (lstoken) {
      setToken(lstoken);
      setIsLoggedIn(true);
    }
  }, []);

  //  User
  const logoutUser = () => {
    setToken(null);
    setIsLoggedIn(false);
    setReload1(!reload1);
    localStorage.removeItem("token");
    toast.success("You have been logged out successfully."); // Use navigate instead of history
  };

  const loginUser = async (email, password) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/user/login`,
        { email, password },
        { headers: { "Content-Type": "application/json" } }
      );

      // Check if the login was successful
      if (response.data.success) {
        const { token } = response.data;
        // Set the token and login status
        setToken(token);
        setIsLoggedIn(true);
        setReload1(!reload1);
        // Save the token in localStorage
        localStorage.setItem("token", token);
        toast.success(response.data.message);
        return true;
        // Show success message
      }
    } catch (error) {
      // Handle different error scenarios
      if (error.response) {
        // Server responded with a status other than 200
        const { message } = error.response.data;
        toast.error(message || "Server error. Please try again.");
      } else if (error.request) {
        // Request was made but no response received
        toast.error("No response from server. Please check your network.");
      } else {
        // Something else happened
        toast.error(`Login failed: ${error.message}`);
      }
    }
  };

  const registerUser = async (formData) => {
    try {
      const response = await axios.post(`${BASE_URL}/user/register`, formData, {
        headers: { "Content-Type": "application/json" },
      });

      if (response.data.success) {
        toast.success(response.data.message);
        return true;
      } else {
        throw new Error(response.data.message);
        return false;
      }
    } catch (error) {
      console.error("Login error:", error.message);
      return false;
    }
  };

  // const userProfile = async () => {
  //   try {
  //     if (localStorage.getItem("token")) {
  //       const token = localStorage.getItem("token");
  //       let response = await axios.get(`${BASE_URL}/user/profile`, {
  //         headers: {
  //           "Content-Type": "application/json",
  //           Auth: token,
  //         },
  //         withCredentials: true,
  //       });
  //       setUser(response.data.user);
  //     }
  //   } catch (err) {
  //     console.log("Error in feteching the user profile data", err);
  //   }
  // };

  const updateProfile = async (formdata) => {
    try {
      if (localStorage.getItem("token")) {
        const token = localStorage.getItem("token");
        let response = await axios.post(`${BASE_URL}/user/editUser`, formdata, {
          headers: {
            "Content-Type": "application/json",
            Auth: token,
          },
          withCredentials: true,
        });
        setUser(response.data.user);
        toast.success(response.data.message);
      }
    } catch (err) {
      console.log("Error in feteching the user profile data", err);
    }
  };

  const handleDeleteUser = async (userId) => {
    try {
      if (localStorage.getItem("token")) {
        const token = localStorage.getItem("token");
        const response = await axios.delete(`${BASE_URL}/user/${userId}`, {
          headers: {
            "Content-Type": "application/json",
            Auth: token,
          },
          withCredentials: true,
        });

        if (response.data.success) {
          toast.success(response.data.message);
        } else {
          toast.error(response.data.message);
        }
      }
    } catch (error) {
      console.error("Error deleting user: ", error);
      toast.error("An error occurred while deleting the user.");
    }
  };

  const handleAddSkills = async (formData) => {
    console.log(formData);
    try {
      if (localStorage.getItem("token")) {
        const token = localStorage.getItem("token");
        const response = await axios.post(`${BASE_URL}/skills/add`, formData, {
          headers: {
            "Content-Type": "application/json",
            Auth: token,
          },
          withCredentials: true,
        });

        console.log("Response from adding skills:", response.data); // Added console log
        if (response.data.success) {
          toast.success(response.data.message);
        } else {
          toast.error(response.data.message);
        }
      }
    } catch (error) {
      console.error("Error adding skills: ", error);
      toast.error("An error occurred while adding the skills.");
    }
  };

  const getAllUsers = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/user/`, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });

      if (response.data.success) {
        toast.success(response.data.message);
        return response.data;
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Error fetching users: ", error); // Updated error message
      toast.error("An error occurred while fetching the users."); // Updated error message
    }
  };

  const getUserById = async (id) => {
    try {
      const response = await axios.get(`${BASE_URL}/user/${id}`, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      console.log(response);
      if (response.data.success) {
        toast.success(response.data.message);
        return response.data;
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Error fetching users: ", error); // Updated error message
      toast.error("An error occurred while fetching the user ."); // Updated error message
    }
  };

  const addReview = async (formData) => {
    console.log(formData);
    try {
      if (localStorage.getItem("token")) {
        const token = localStorage.getItem("token");
        const response = await axios.post(`${BASE_URL}/review/add`, formData, {
          headers: {
            "Content-Type": "application/json",
            Auth: token,
          },
          withCredentials: true,
        });

        console.log("Response from adding skills:", response.data); // Added console log
        if (response.data.success) {
          toast.success(response.data.message);
        } else {
          toast.error(response.data.message);
        }
      }
    } catch (error) {
      console.error("Error adding skills: ", error);
      toast.error("An error occurred while adding the skills.");
    }
  };

  const creatBooking = async (formData) => {
    // console.log(formData);
    try {
      if (localStorage.getItem("token")) {
        const token = localStorage.getItem("token");
        const response = await axios.post(
          `${BASE_URL}/bookings/create`,
          formData,
          {
            headers: {
              "Content-Type": "application/json",
              Auth: token,
            },
            withCredentials: true,
          }
        );

        console.log("Response from adding skills:", response.data); // Added console log
        if (response.data.success) {
          toast.success(response.data.message);
        } else {
          toast.error(response.data.message);
        }
      }
    } catch (error) {
      console.error("Error adding skills: ", error);
      toast.error("An error occurred while adding the skills.");
    }
  };

  const reqestedBookings = async () => {
    try {
      if (localStorage.getItem("token")) {
        const token = localStorage.getItem("token");
        const response = await axios.get(`${BASE_URL}/bookings/requested`, {
          headers: {
            "Content-Type": "application/json",
            Auth: token,
          },
          withCredentials: true,
        });

        console.log("Response from adding skills:", response.data); // Added console log
        if (response.data.success) {
          toast.success(response.data.message);
        } else {
          toast.error(response.data.message);
        }
      }
    } catch (error) {
      console.error("Error adding skills: ", error);
      toast.error("An error occurre feteching the requeste bookings.");
    }
  };

  const offeringBookings = async () => {
    try {
      if (localStorage.getItem("token")) {
        const token = localStorage.getItem("token");
        const response = await axios.get(`${BASE_URL}/bookings/offering`, {
          headers: {
            "Content-Type": "application/json",
            Auth: token,
          },
          withCredentials: true,
        });

        // console.log("Response from adding skills:", response.data); // Added console log
        if (response.data.success) {
          return response.data;
          toast.success(response.data.message);
        } else {
          toast.error(response.data.message);
        }
      }
    } catch (error) {
      console.error("Error adding skills: ", error);
      toast.error("An error occurre feteching the requeste bookings.");
    }
  };

  const setBookingStatus = async (formData) => {
    try {
      if (localStorage.getItem("token")) {
        const token = localStorage.getItem("token");
        const response = await axios.post(
          `${BASE_URL}/bookings/respond`,
          formData,
          {
            headers: {
              "Content-Type": "application/json",
              Auth: token,
            },
            withCredentials: true,
          }
        );

        // console.log("Response from adding skills:", response.data); // Added console log
        if (response.data.success) {
          toast.success(response.data.message);
          return response.data;
        } else {
          toast.error(response.data.message);
        }
      }
    } catch (error) {
      console.error("Error adding skills: ", error);
      toast.error("An error occurre feteching the requeste bookings.");
    }
  };

  // const scheduleBookingDate = async (formData) => {
  //   try {
  //     if (localStorage.getItem("token")) {
  //       const token = localStorage.getItem("token");
  //       const response = await axios.post(
  //         `${BASE_URL}/bookings/scheduleBookingDate`,
  //         formData,
  //         {
  //           headers: {
  //             "Content-Type": "application/json",
  //             Auth: token,
  //           },
  //           withCredentials: true,
  //         }
  //       );

  //       // console.log("Response from adding skills:", response.data); // Added console log
  //       if (response.data.success) {
  //         toast.success(response.data.message);
  //         return response.data;
  //       } else {
  //         toast.error(response.data.message);
  //       }
  //     }
  //   } catch (error) {
  //     console.error("Error adding skills: ", error);
  //     toast.error("An error occurre feteching the requeste bookings.");
  //   }
  // };
  return (
    <AppContext.Provider
      value={{
        token,
        isLoggedIn,
        loginUser,
        registerUser,
        logoutUser,
        user,
        // userProfile,
        handleAddSkills,
        getAllUsers,
        getUserById,
        addReview,
        creatBooking,
        reqestedBookings,
        offeringBookings,
        logoutUser,
        setBookingStatus,
        // scheduleBookingDate,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};

export default Appstate;
