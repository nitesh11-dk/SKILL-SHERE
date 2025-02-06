import React from "react";

export const Header = ({ category, title }) => (
  <div className=" mb-6">
    {/* <p className="text-lg text-gray-300">{category}</p> */}
    <p className="text-3xl text-black font-extrabold tracking-tight text-slate-900">
      {title}
    </p>
  </div>
);

// export default Header;
