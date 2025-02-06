import React, { useContext, useEffect } from "react";
import AppContext from "../../context/AppContext";

const RequestedBookings = () => {
  const { reqestedBookings } = useContext(AppContext);

  const fetchUser = async () => {
    await reqestedBookings();
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return <div></div>;
};

export default RequestedBookings;
