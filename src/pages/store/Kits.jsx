import React, { useState, useEffect } from "react";
import { useGetBooksQuery } from "../../redux/services/booksApi";
import Image from "../../assets/book.jpg";
import { FiSearch } from "react-icons/fi";
import { Link } from "react-router-dom";
import Menu from "../../components/Menu";
import { FiShoppingCart } from "react-icons/fi";
import axios from "axios";
import { MdArrowForwardIos } from "react-icons/md";
import { useLocation } from "react-router-dom";
import StoreMenu from "../../components/StoreMenu";

const Kits = () => {
  const location = useLocation();
  console.log(location);
  const { name: collegeId } = location.state?.item;
  const [searchList, setSearchList] = useState([]);
  const [books, setBooks] = useState([]);
  const [menu, setMenu] = useState(false);
  const [colleges, setColleges] = useState([]);
  const [branchList, setBranchList] = useState([]);
  const [CourseYearList, setCourseYearList] = useState([]);
  const [selectedBranch, setSelectedBranch] = useState(null);
  const [selectedCourseyear, setSelectedCourseyear] = useState(null);
  //   const { data: booksData } = useGetBooksQuery();
  //   console.log(booksData);
  const handleMenu = () => {
    setMenu(!menu);
  };

  const handleCourseyearChange = async (e) => {
    setSelectedCourseyear(e.target.value);
    const courseyear = e.target.value;
    const branch = selectedBranch;
    if (branch !== null && courseyear !== null) {
      const response = await axios.get(
        `http://localhost:9000/api/kit/getAllKitsByBranchAndCourseYear?branch=${branch}&courseyear=${courseyear}&college=${collegeId}`
      );
      console.log(response);
      setColleges(response?.data?.data);
    }
  };

  const handleBranchChange = async (e) => {
    setSelectedBranch(e.target.value);
    const courseyear = selectedCourseyear;
    const branch = e.target.value;
    if (branch !== null && courseyear !== null) {
      const response = await axios.get(
        `http://localhost:9000/api/kit/getAllKitsByBranchAndCourseYear?branch=${branch}&courseyear=${courseyear}&college=${collegeId}`
      );
      console.log(response);
      setColleges(response?.data?.data);
    }
  };

  // const getKits = async () => {
  //   const response = await axios.get(
  //     "http://localhost:9000/api/kit/getAllKits"
  //   );
  //   console.log("kitshere", response.data?.data);
  //   // setColleges(response?.data?.data);
  // };

  const getBranchAndCourseyear = async () => {
    const response = await axios.get(
      `http://localhost:9000/api/kit/getBranchAndCourseYear?college=${collegeId}`
    );
    console.log(response.data?.courseyear);
    setBranchList(response?.data?.branch);
    setCourseYearList(response?.data?.courseyear);
  };

  const handleSearch = (e) => {
    console.log("in serach");
    const serachResults = books.filter((item) => {
      return (
        item.title.toLowerCase().includes(e.target.value) ||
        item.college.toLowerCase().includes(e.target.value.toLowerCase()) ||
        item.price.toLowerCase().includes(e.target.value.toLowerCase()) ||
        item.academicyear.includes(e.target.value) ||
        item.year.toLowerCase().includes(e.target.value.toLowerCase())
      );
    });
    setSearchList(serachResults);
  };
  useEffect(() => {
    // setBooks(booksData);
    // setSearchList(booksData);
    // getKits();
    getBranchAndCourseyear();
  }, []);
  return (
    <div className="min-h-[100vh] flex justify-center  p-5 bg-gray-200">
      <div className="bg-white  w-full p-5 rounded-md ">
        <div className="flex  items-center justify-between">
          <div className="sm:text-3xl text-2xl font-medium">Kits</div>
          <div className="sm:flex  flex-row gap-x-5">
            <StoreMenu menu={menu} handleMenu={handleMenu} />
          </div>
        </div>
        <hr className="border border-black/20 my-3" />
        {/* <div className="flex mb-3 sm:hidden items-center bg-white w-full  gap-x-2 rounded-md">
          <input
            onChange={handleSearch}
            className="w-[90%] bg-gray-200 outline-none rounded-md text-black ps-2 p-1  placeholder-slate-600"
            placeholder="Search Student"
          />
          <FiSearch
            style={{
              color: "black",

              height: 25,
              width: 25,
            }}
          />
        </div> */}
        {/* mapping of items in cart is start from here */}

        <div className="flex justify-between sm:justify-center gap-x-5 my-5">
          <select
            onChange={handleBranchChange}
            className="border border-black drop-shadow-2xl p-1 rounded-md "
          >
            <option>Select Branch</option>
            {branchList?.map((branch) => (
              <option value={branch?.branch}>{branch?.branch}</option>
            ))}
          </select>
          <select
            onChange={handleCourseyearChange}
            className="border border-black drop-shadow-2xl p-1 rounded-md "
          >
            <option>Select Course Year</option>
            {CourseYearList?.map((item) => (
              <option value={item?.courseyear}>{item?.courseyear}</option>
            ))}
          </select>

          {/* <select className="border border-black">
            <option>Select Academic Year</option>
            {branchList?.map((branch) => (
              <option value={branch}>{branch}</option>
            ))}
          </select> */}
        </div>

        {/* grid style for below sm:grid-cols-2 md:grid-cols-4 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4   gap-3">
          {colleges?.map((item) => (
            <Link to="/kit" state={{ item: item }}>
              <div
                id="items-list"
                className="h-[35rem]  rounded-md  p-3 border flex-col border-black/10 shadow-sm shadow-gray-400 items-center"
              >
                {/* <div className="w-24  h-24 mx-1 sm:w-48 sm:h-48  flex items-center">
                  <img
                    src={`data:image/jpg;charset=utf8;base64,${item.image}`}
                    className="w-[100%] h-[100%] rounded-full"
                  />
                </div> */}

                <img
                  src={`data:image/jpg;charset=utf8;base64,${item.image}`}
                  className="w-[100%] h-[75%]"
                />

                <div className="ms-4 flex flex-col ">
                  <div className="font-medium text-wrap flex ">
                    <div className="w-28">Title</div> : {item.title}
                  </div>
                  <div className="font-medium text-wrap flex ">
                    <div className="w-28">College</div> : {item.collegeId}
                  </div>
                  <div className="font-medium text-wrap flex ">
                    <div className="w-28">Course</div> : {item.courseyear}
                  </div>
                  <div className="font-medium text-wrap flex ">
                    <div className="w-28">Branch</div> : {item.branch}
                  </div>
                  <div className="font-medium text-wrap flex ">
                    <div className="w-28">Price</div> : {item.price}
                  </div>
                  <div className="font-medium text-wrap flex ">
                    <div className="w-28">Stock Quantity</div> :{" "}
                    {item?.stock_quantity}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* mapping of items in cart end here */}
      </div>
    </div>
  );
};

export default Kits;
