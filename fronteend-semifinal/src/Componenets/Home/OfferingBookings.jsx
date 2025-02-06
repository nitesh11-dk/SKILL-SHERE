import React, { useContext, useEffect } from "react";
import AppContext from "../../context/AppContext";

const OfferingBookings = () => {
  const { offeringBookings } = useContext(AppContext);

  const fetchUser = async () => {
    await offeringBookings();
  };
  useEffect(() => {
    fetchUser();
  }, []);

  return <div></div>;
};

export default OfferingBookings;
