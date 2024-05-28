import React, { useState, useEffect } from "react";
import { useGetBooksQuery } from "../../redux/services/booksApi";
import Image from "../../assets/book.jpg";
import { FiSearch } from "react-icons/fi";
import { Link } from "react-router-dom";
import Menu from "../../components/Menu";
import { FiShoppingCart } from "react-icons/fi";
import axios from "axios";
import { MdArrowForwardIos } from "react-icons/md";

const College = () => {
  const [searchList, setSearchList] = useState([]);
  const [books, setBooks] = useState([]);
  const [menu, setMenu] = useState(false);
  const [colleges, setColleges] = useState([]);
  const [branchList, setBranchList] = useState([]);
  //   const { data: booksData } = useGetBooksQuery();
  //   console.log(booksData);
  const handleMenu = () => {
    setMenu(!menu);
  };

  const handleBranch = () => {};

  const getKits = async () => {
    const response = await axios.get(
      "http://localhost:9000/api/kit/getAllKits"
    );
    console.log(response.data);
    setColleges(response?.data);
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
    getKits();
  }, []);
  return (
    <div className="min-h-[100vh] flex justify-center  p-5 bg-gray-200">
      <div className="bg-white  w-full p-5 rounded-md ">
        <div className="flex  items-center justify-between">
          <div className="sm:text-3xl text-2xl font-medium">Books</div>
          <div className="sm:flex hidden flex-row gap-x-5">
            <div className="flex items-center bg-white pe-2 gap-x-1 rounded-md">
              <input
                onChange={handleSearch}
                className="w-[25vw] bg-gray-200 outline-none rounded-md text-black ps-2 p-1  placeholder-slate-600"
                placeholder="Search Student"
              />
              <FiSearch
                style={{
                  color: "black",

                  height: 25,
                  width: 25,
                }}
              />
            </div>
            <div className="hover:bg-blue-100 hidden md:block p-1 px-2 rounded-md">
              <Link to="/cart">
                <FiShoppingCart className="w-6 h-6" />
              </Link>
            </div>
            <div className="hover:bg-blue-100 hidden md:block p-1 px-2 rounded-md">
              <Link to="/orders">Orders</Link>
            </div>
            <div className="hover:bg-blue-100 hidden md:block p-1 px-2 rounded-md">
              <Link to="/logout">Logout</Link>
            </div>
          </div>
          <div className="flex md:hidden gap-x-4">
            <div className="hover:bg-blue-100 p-1 px-2 rounded-md">
              <Link to="/cart">
                <FiShoppingCart className="w-6 h-6" />
              </Link>
            </div>
            <Menu menu={menu} handleMenu={handleMenu} />
          </div>
        </div>
        <hr className="border border-black/20 my-3" />
        <div className="flex mb-3 sm:hidden items-center bg-white w-full  gap-x-2 rounded-md">
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
        </div>
        {/* mapping of items in cart is start from here */}

        <div className="flex justify-between sm:justify-center gap-x-5 my-5">
          <select className="border border-black drop-shadow-2xl p-1 rounded-md ">
            <option>Select Branch</option>
            {branchList?.map((branch) => (
              <option value={branch}>{branch}</option>
            ))}
          </select>
          <select className="border border-black drop-shadow-2xl p-1 rounded-md ">
            <option>Select Course Year</option>
            {branchList?.map((branch) => (
              <option value={branch}>{branch}</option>
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
            <Link to="/book" state={{ item: item }}>
              <div
                id="items-list"
                className="h-[30rem]  rounded-md  p-3 border flex-col border-black/10 shadow-sm shadow-gray-400 items-center"
              >
                {/* <div className="w-24  h-24 mx-1 sm:w-48 sm:h-48  flex items-center">
                  <img
                    src={`data:image/jpg;charset=utf8;base64,${item.image}`}
                    className="w-[100%] h-[100%] rounded-full"
                  />
                </div> */}

                <img src={Image} className="w-[100%] h-[75%]" />

                <div className="ms-4 flex flex-col ">
                  <div className="font-medium text-wrap flex ">
                    <div className="w-16">Title</div> : {item.title}
                  </div>
                  <div className="font-medium text-wrap flex ">
                    <div className="w-16">College</div> : {item.collegeId}
                  </div>
                  <div className="font-medium text-wrap flex ">
                    <div className="w-16">Course</div> : {item.courseYear}
                  </div>
                  <div className="font-medium text-wrap flex ">
                    <div className="w-16">Price</div> : {item.price}
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

export default College;
