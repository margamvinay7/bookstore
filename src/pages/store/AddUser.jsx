import React, { useState } from "react";
import { useAddUserMutation } from "../../redux/services/authApi";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { userActions } from "../../redux/features/authSlice";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import StoreMenu from "../../components/StoreMenu";
import NotificationComponent from "../../components/Notification";

const AddUser = () => {
  // const [formData, setFormData] = useState({
  //   fullName: "",
  //   registrationNumber: "",
  //   email: "",
  //   phoneNumber: "",
  //   password: "",
  //   confirmPassword: "",
  // });
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    phoneNumber: "",
    employeeId: "",

    college: "",
    fullName: "",
  });
  const [notification, setNotification] = useState({ message: "", type: "" });
  const dispatch = useDispatch();
  const [addUser] = useAddUserMutation();
  const navigate = useNavigate();
  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const [menu, setMenu] = useState(false);

  const handleMenu = () => {
    setMenu(!menu);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);

    try {
      const response = await addUser({
        username: formData.email,
        password: formData.password,
        phone: formData.phoneNumber,
        employeeId: formData.employeeId,
        fullName: formData.fullName,
        college: formData.college,
      }).unwrap();
      setNotification({
        message: "User Added Successfully!",
        type: "success",
      });
      setTimeout(() => {
        setNotification({
          message: "",
          type: "",
        });
      }, 3000);

      console.log(response);
    } catch (error) {
      console.log(error);
      if (error?.originalStatus === 401 || error?.status === 401) {
        console.log("User Already Exists");
        setNotification({
          message: "User Already Exists",
          type: "error",
        });
        setTimeout(() => {
          setNotification({
            message: "",
            type: "",
          });
        }, 3000);
      }
    }
  };

  return (
    <div className="min-h-[100vh] flex justify-center items-center flex-col ">
      {notification.message && <NotificationComponent {...notification} />}
      {/* <div className="mb-5 text-3xl font-bold text-[rgb(58,36,74)]">
        Sign <span className="text-[#D72638]">Up</span>
      </div> */}
      <div className="border border-gray-400 p-8 shadow-slate-400 shadow-md rounded-md w-[95vw] sm:w-[50vw] md:w-[25vw]">
        <div className="flex justify-between items-center mb-5">
          {/* <div className="text-[rgb(58,36,74)] font-extrabold text-3xl">
            Let us know <span className="text-[#D72638]">!</span>
          </div>
         
          <div className=" font-medium underline text-[rgb(58,36,74)]">
            Sign <span className="text-[#D72638] underline">In</span>
          </div> */}
          <div className="mb-5 text-3xl font-bold text-[rgb(58,36,74)]">
            Add <span className="text-[#D72638]">User</span>
          </div>
          <StoreMenu menu={menu} handleMenu={handleMenu} />
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-y-4">
          <input
            type="text"
            required
            placeholder="Full Name"
            name="fullName"
            className="outline-none border-b-[1px] border-gray-400 p-2"
            value={formData.fullName}
            onChange={handleChange}
          />
          <input
            type="text"
            required
            placeholder="Employee Id"
            name="employeeId"
            className="outline-none border-b-[1px] border-gray-400 p-2"
            value={formData.employeeId}
            onChange={handleChange}
          />
          <input
            type="text"
            required
            placeholder="Email or Username"
            className="outline-none border-b-[1px] border-gray-400 p-2"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          <input
            type="text"
            required
            placeholder="Phone Number"
            name="phoneNumber"
            className="outline-none border-b-[1px] border-gray-400 p-2"
            value={formData.phoneNumber}
            onChange={handleChange}
          />
          <input
            type="text"
            required
            placeholder="college"
            name="college"
            className="outline-none border-b-[1px] border-gray-400 p-2"
            value={formData.college}
            onChange={handleChange}
          />
          <input
            type="password"
            required
            placeholder="Enter password"
            name="password"
            className="outline-none border-b-[1px] border-gray-400 p-2"
            value={formData.password}
            onChange={handleChange}
          />

          <button
            name="Add User"
            type="submit"
            className="bg-[rgb(58,36,74)] p-2 mt-4 rounded-md text-white"
          >
            Add User
          </button>
        </form>
        {/* <div className="flex justify-center gap-x-1 mt-3">
          <span>Don't have an account?</span>
          <Link to="/signUp">
            <span className="font-medium underline text-[rgb(58,36,74)]">
              Sign&nbsp;
              <span className="text-[#D72638] underline">Up</span>
            </span>
          </Link>
        </div> */}
      </div>
    </div>
  );
};

export default AddUser;
