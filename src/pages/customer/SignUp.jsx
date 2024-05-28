import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSignUpMutation } from "../../redux/services/authApi";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { userActions } from "../../redux/features/authSlice";
import { useDispatch } from "react-redux";
import NotificationComponent from "../../components/Notification";

const SignUp = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    registrationNumber: "",
    college: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
  });
  const [notification, setNotification] = useState({ message: "", type: "" });
  const dispatch = useDispatch();
  const [signUp] = useSignUpMutation();
  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form Data:", formData); // Log complete form data object
    try {
      const response = await axios.post(
        " http://localhost:9000/api/auth/checkUser",
        formData
      );
      if (response.status === 200) {
        navigate("/studentDetails", { state: { data: formData } });
        setNotification({
          message: "Success!",
          type: "success",
        });
        setTimeout(() => {
          setNotification({
            message: "",
            type: "",
          });
        }, 3000);
      } else if (response.status === 400) {
        console.log("user already exists");
        setNotification({
          message: "Username or Email Already Exists",
          type: "error",
        });
        setTimeout(() => {
          setNotification({
            message: "",
            type: "",
          });
        }, 3000);
      }
      console.log(response);
    } catch (error) {
      console.log(error?.response?.data?.res);
      setNotification({
        message: "Username or Email Already Exists",
        type: "error",
      });
      setTimeout(() => {
        setNotification({
          message: "",
          type: "",
        });
      }, 3000);
    }
    // try {
    //   const response = await signUp(formData);
    //   console.log(response);
    //   let userRole = "";

    //   localStorage.setItem("auth", response?.data?.accessToken);
    //   const token = response?.data?.accessToken;
    //   if (token) {
    //     const decoded = jwtDecode(token);
    //     const { user, roles } = decoded.UserInfo;
    //     localStorage.setItem("role", roles);
    //     userRole = localStorage.getItem("role");
    //     console.log(userRole);
    //     dispatch(userActions.user(user));
    //     dispatch(userActions.role(roles));
    //     localStorage.setItem("email", user);
    //     localStorage.setItem("username", user);
    //   }
    //   if (userRole === "admin") {
    //     navigate("/store");
    //   }
    //   if (userRole === "store") {
    //     navigate("/store");
    //   }
    //   if (userRole === "student") {
    //     navigate("/emailVerification");
    //   }
    //   if (!userRole) {
    //     navigate("/signIn");
    //   }
    // } catch (error) {
    //   console.log(error);
    // }
  };

  return (
    <div className="min-h-[100vh] flex justify-center items-center flex-col ">
      {/* <div className="mb-5 text-3xl font-bold text-[rgb(58,36,74)]">
        Sign <span className="text-[#D72638]">Up</span>
      </div> */}
      {notification.message && <NotificationComponent {...notification} />}
      <div className="border border-gray-400 p-8 shadow-slate-400 shadow-md  rounded-md w-[95vw] sm:w-[50vw] md:w-[25vw]">
        <div className="flex justify-center mb-2">
          {/* <div className="text-[rgb(58,36,74)] font-extrabold text-3xl">
            Let us know <span className="text-[#D72638]">!</span>
          </div>
         
          <div className=" font-medium underline text-[rgb(58,36,74)]">
            Sign <span className="text-[#D72638] underline">In</span>
          </div> */}
          <div className="mb-5 text-3xl font-bold text-[rgb(58,36,74)]">
            Sign <span className="text-[#D72638]">Up</span>
          </div>
        </div>
        <form
          onSubmit={(e) => handleSubmit(e)}
          className="flex flex-col gap-y-4"
        >
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
            type="email"
            required
            placeholder="Email"
            className="outline-none border-b-[1px] border-gray-400 p-2"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          <input
            type="text"
            required
            placeholder="Registration Number"
            name="registrationNumber"
            className="outline-none border-b-[1px] border-gray-400 p-2"
            value={formData.registrationNumber}
            onChange={handleChange}
          />
          <input
            type="text"
            required
            placeholder="College Name"
            name="college"
            className="outline-none border-b-[1px] border-gray-400 p-2"
            value={formData.college}
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
            type="password"
            required
            placeholder="Set password"
            name="password"
            className="outline-none border-b-[1px] border-gray-400 p-2"
            value={formData.password}
            onChange={handleChange}
          />
          <input
            type="password"
            required
            placeholder="Retype password"
            name="confirmPassword"
            className="outline-none border-b-[1px] border-gray-400 p-2"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
          <button
            name="Sign Up"
            type="submit"
            className="bg-[rgb(58,36,74)] p-2 rounded-md text-white"
          >
            Submit
          </button>
        </form>
        <div className="flex justify-center gap-x-1 mt-2">
          <span>Already have an account?</span>
          <Link to="/signIn">
            <span className="font-medium underline text-[rgb(58,36,74)]">
              Sign&nbsp;
              <span className="text-[#D72638] underline">In</span>
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
