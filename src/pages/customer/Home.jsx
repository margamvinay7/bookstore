import React, { useState, useEffect } from "react";
import { useGetBooksQuery } from "../../redux/services/booksApi";
import Image from "../../assets/book.jpg";
import { FiSearch } from "react-icons/fi";
import { Link } from "react-router-dom";
import Menu from "../../components/Menu";
import { FiShoppingCart } from "react-icons/fi";
import axios from "axios";
import { MdArrowForwardIos } from "react-icons/md";

const Home = () => {
  const [searchList, setSearchList] = useState([]);
  const [books, setBooks] = useState([]);
  const [menu, setMenu] = useState(false);
  const [colleges, setColleges] = useState([]);
  const [student, setStudent] = useState();
  // const { data: booksData } = useGetBooksQuery();
  // console.log(booksData);
  const studentId = localStorage.getItem("username");
  const handleMenu = () => {
    setMenu(!menu);
  };

  // const getColleges = async () => {
  //   const response = await axios.get(
  //     "http://localhost:9000/api/college/getColleges"
  //   );
  //   console.log(response.data);
  //   setColleges(response?.data);
  // };
  const getStudent = async () => {
    const response = await axios.get(
      `http://localhost:9000/api/auth/getStudent?id=${studentId}`
    );
    console.log(response.data);
    setStudent(response?.data[0]);
  };
  const getCollegeById = async () => {
    const response = await axios.get(
      `http://localhost:9000/api/college/getCollegeById?collegeId=${student?.college}`
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
    getStudent();
  }, []);

  useEffect(() => {
    getCollegeById();
  }, [student]);
  return (
    <div className="min-h-[100vh] flex justify-center  p-5 bg-gray-200">
      <div className="bg-white w-full md:w-[60vw] p-5 rounded-md ">
        <div className="flex  items-center justify-between">
          <div className="sm:text-3xl text-2xl font-medium">Book Store</div>
          <div className="sm:flex hidden flex-row gap-x-5">
            {/* <div className="flex items-center bg-white pe-2 gap-x-1 rounded-md">
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
            </div> */}
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

        {/* grid style for below sm:grid-cols-2 md:grid-cols-4 */}
        <div className="grid grid-cols-1  gap-3">
          {colleges?.map((item) => (
            <Link to="/college" state={{ item: item }}>
              <div
                id="items-list"
                className="min-h-[10rem]  rounded-md  p-3 border flex border-black/10 shadow-sm shadow-gray-400 items-center"
              >
                <div className="w-24  h-24 mx-1 sm:w-48 sm:h-48  flex items-center">
                  <img
                    src={`data:image/jpg;charset=utf8;base64,${item.image}`}
                    className="w-[100%] h-[100%] rounded-full"
                  />
                </div>
                <div className="  w-[60%] h-[100%] ms-4 flex items-center justify-between">
                  <div className="font-medium text-wrap">{item.name}</div>
                  <div className="min-w-7 h-7 flex justify-center items-center bg-gray-400 rounded-full">
                    <MdArrowForwardIos className="w-5 h-5 " />
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

export default Home;
