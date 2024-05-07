import React, { useState, useRef } from "react";
import "./emailVerification.css";

const EmailVerification = () => {
  const [error, setError] = useState(true); // State to handle errors
  const [success, setSuccess] = useState(false);
  const [otp, setOtp] = useState(["", "", "", ""]); // State to store OTP inputs
  const inputRefs = useRef([]);

  const handleSubmit = () => {
    const otpCheck = otp.join(""); // Concatenate OTP inputs
    if (otpCheck === "1234") {
      // Replace "1234" with your correct OTP
      console.log("OTP is correct. Proceed with verification.");
      // You can add further actions here, such as navigating to the next step
    } else {
      console.log("OTP is incorrect. Please try again.");
      setError(true); // Set error state to true
    }
    setOtp(["", "", "", ""]);
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
