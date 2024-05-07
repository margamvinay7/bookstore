import React from "react";
import Book from "../../assets/book.jpg";

const Profile = () => {
  return (
    <div className="bg-gray-200 min-h-[100vh] flex justify-center">
      <div className="bg-white w-[100vw]  md:w-[60vw] rounded-md p-2">
        <div className="h-64  bg-gray-500 rounded-t-md flex items-center">
          <div className="w-36 h-36 ">
            <img src={Book} className="h-[100%] w-[100%] ms-10 rounded-full" />
          </div>
          <div className="ms-32 text-3xl">Name of Student</div>
        </div>
        <div className="p-5 bg-gray-500">
          <div className="text-xl">Registration Number</div>
          <div>College Name of Student</div>
          <div>Orders</div>
          <div>Logout</div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
