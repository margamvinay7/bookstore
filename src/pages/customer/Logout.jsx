import React from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    console.log("out");
    localStorage.removeItem("auth");
    localStorage.removeItem("email");
    localStorage.removeItem("username");
    localStorage.removeItem("role");

    navigate("/signIn");
  };

  return (
    <div
      className={` w-[100vw] min-h-[100vh]   bg-slate-700/40 flex justify-center items-center `}
    >
      <div className="w-80 h-52 rounded-2xl bg-white flex flex-col items-start ps-14  ">
        <div className="font-medium text-black mt-7 mb-5">Log Out?</div>
        <div className="text-sm text-black">Are you sure want to log out?</div>
        <div className="flex gap-x-2 mt-8 ">
          <button
            className="text-sm text-black w-20 h-8 p-1 bg-gray-300 rounded-sm "
            onClick={() => navigate("/signIn")}
          >
            Cancel
          </button>
          <button
            className="text-sm text-white w-20 h-8 p-1 bg-amber-700 rounded-sm"
            onClick={handleLogout}
          >
            Log out
          </button>
        </div>
      </div>
    </div>
  );
};

export default Logout;
