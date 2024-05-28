import React, { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { useDispatch } from "react-redux";

const StudentDetails = () => {
  const location = useLocation();
  const { data } = location.state;
  const [formData, setFormData] = useState({
    courseYear: "",
    branch: "",
    semester: "",
  });

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  useEffect(() => {
    setFormData({
      ...formData,
      ...data,
    });
    console.log({ ...formData, ...data });
  }, [data]);
  return (
    <div className="min-h-[100vh] flex justify-center items-center flex-col ">
      {/* <div className="mb-5 text-3xl font-bold text-[rgb(58,36,74)]">
    Sign <span className="text-[#D72638]">Up</span>
  </div> */}
      <div className="border border-gray-400 p-8 shadow-slate-400 shadow-md  rounded-md w-[95vw] sm:w-[50vw] md:w-[25vw]">
        <div className="flex justify-center mb-2">
          {/* <div className="text-[rgb(58,36,74)] font-extrabold text-3xl">
        Let us know <span className="text-[#D72638]">!</span>
      </div>
     
      <div className=" font-medium underline text-[rgb(58,36,74)]">
        Sign <span className="text-[#D72638] underline">In</span>
      </div> */}
          <div className="mb-5 text-3xl font-bold text-[rgb(58,36,74)]">
            Student Details
          </div>
        </div>
        <form className="flex flex-col gap-y-4">
          {/* <input
            type="text"
            required
            placeholder="Course Year"
            name="courseYear"
            className="outline-none border-b-[1px] border-gray-400 p-2"
            value={formData.courseYear}
            onChange={handleChange}
          /> */}
          <input
            type="text"
            required
            placeholder="Branch"
            name="branch"
            className="outline-none border-b-[1px] border-gray-400 p-2"
            value={formData.branch}
            onChange={handleChange}
          />
          {/* <input
            type="text"
            required
            placeholder="Semester"
            className="outline-none border-b-[1px] border-gray-400 p-2"
            name="semester"
            value={formData.semester}
            onChange={handleChange}
          /> */}

          <button
            name="Sign Up"
            className="bg-[rgb(58,36,74)] p-2 rounded-md text-white"
          >
            <Link to="/emailVerification" state={{ data: formData }}>
              {" "}
              Submit
            </Link>
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

export default StudentDetails;
