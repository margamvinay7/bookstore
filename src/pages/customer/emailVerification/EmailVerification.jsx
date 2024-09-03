import React, { useState, useRef, useEffect } from "react";
import "./emailVerification.css";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { useSignUpMutation } from "../../../redux/services/authApi";
import { jwtDecode } from "jwt-decode";
import { userActions } from "../../../redux/features/authSlice";
import { useDispatch } from "react-redux";

const EmailVerification = () => {
  const [error, setError] = useState(false); // State to handle errors
  const [success, setSuccess] = useState(false);
  const [otp, setOtp] = useState(["", "", "", ""]); // State to store OTP inputs
  const inputRefs = useRef([]);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const [signUp] = useSignUpMutation();
  const { data: formData } = location.state;
  console.log(formData);
  const handleSubmit = async () => {
    const otpCheck = otp.join("");
    console.log(otpCheck);
    try {
      const response = await axios.post(
        "http://localhost:9000/api/email/verifyEmail",
        {
          otp: otpCheck,
        },
        {
          withCredentials: true, // Include credentials (cookies) in the request
        }
      );
      console.log(response);
      if (response.status === 200) {
        // Replace "1234" with your correct OTP
        console.log("OTP is correct. Proceed with verification.");
        setSuccess(true);
        handleSignUp();

        // You can add further actions here, such as navigating to the next step
      }
      setOtp(["", "", "", ""]);
    } catch (error) {
      console.log(error);

      console.log("OTP is incorrect. Please try again.");
      setError(true); // Set error state to true
    }
  };

  const handleSignUp = async () => {
    try {
      const response = await signUp(formData).unwrap();
      console.log(response);
      let userRole = "";

      localStorage.setItem("auth", response?.accessToken);
      const token = response?.accessToken;
      if (token) {
        const decoded = jwtDecode(token);
        const { user, roles } = decoded.UserInfo;
        localStorage.setItem("role", roles);
        userRole = localStorage.getItem("role");
        console.log(userRole);
        dispatch(userActions.user(user));
        dispatch(userActions.role(roles));
        localStorage.setItem("email", user);
        localStorage.setItem("username", user);
      }
      if (userRole === "admin") {
        navigate("/store");
      }
      if (userRole === "store") {
        navigate("/store");
      }
      if (userRole === "student") {
        navigate("/");
      }
      if (!userRole) {
        navigate("/signIn");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (index, value) => {
    if (value.length <= 1) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      setError(false); // Reset error state on input change
      if (value.length === 1 && index < 3) {
        inputRefs.current[index + 1].focus();
      }
    }

    //   let submitBtn = document.getElementById("submit");
    // if (otp.join("")?.length < 4) {
    //   submitBtn?.style?.opacity = 0.2;
    // } else {
    //   submitBtn?.style?.opacity = 1;
    // }
  };

  const handleKeyDown = (index, event) => {
    if (event.key === "Backspace" && index > 0 && !otp[index]) {
      // Move focus to the previous input on Backspace press
      inputRefs.current[index - 1].focus();
    }
  };

  const sendOtp = async () => {
    try {
      const response = await axios.post(
        "http://localhost:9000/api/email/generateEmail",
        {
          name: formData?.fullName,
          email: formData?.email,
        },
        {
          withCredentials: true, // Include credentials (cookies) in the request
        }
      );
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    let didSendOtp = false;
    if (!didSendOtp) {
      sendOtp();
      didSendOtp = true;
    }
  }, []);

  return (
    <div className="min-h-[100vh] flex justify-center items-center flex-col ">
      <div className="p-10 flex  flex-col border border-gray-400 rounded-md shadow-md shadow-gray-500">
        <div className=" font-medium text-lg">Email Verification</div>
        <div className="text-xs text-gray-500 ">
          Please enter the 4 digit code sent to your email
          <br />
          Don't forget to check your spam
        </div>
        <div className="text-xs text-gray-500 mt-8 ">
          Didn't receive the code ?{" "}
          <span className="text-[#D72638]">resend</span>
        </div>
        <div className="flex gap-x-5 my-1">
          {otp.map((_, index) => (
            <input
              key={index}
              ref={(el) => (inputRefs.current[index] = el)}
              type="number"
              className={`otp_num otp_num_${index + 1}`}
              maxLength="1"
              value={otp[index]}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
            />
          ))}
          {success && <span>/</span>}
        </div>
        {error && (
          <div className="text-xs text-[#D72638] ">
            Sorry, the code is wrong. Please try again
          </div>
        )}
        <button
          id="submit"
          className="  bg-[rgb(58,36,74)] mt-10 p-2 rounded-md text-white"
          onClick={handleSubmit}
        >
          Verify Code
        </button>
      </div>
    </div>
  );
};

export default EmailVerification;
