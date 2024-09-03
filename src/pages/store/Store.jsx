import React, { useState, useEffect, useRef } from "react";
import StoreMenu from "../../components/StoreMenu";
import { Link } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import { useGetBooksQuery } from "../../redux/services/booksApi";
import { useSelector } from "react-redux";
import { Html5QrcodeScanner } from "html5-qrcode";
import QrCodeScanner from "./QrCodeScanner";
import axios from "axios";
import { MdArrowForwardIos } from "react-icons/md";

const Store = () => {
  const items = ["", "", "", ""];
  const [menu, setMenu] = useState(false);
  const [books, setBooks] = useState();
  const [colleges, setColleges] = useState([]);
  const [result, setResult] = useState(null);
  const [storeUser, setStoreUser] = useState();
  const role =
    useSelector((state) => state.user.role) || localStorage.getItem("role");
  const storeUsername = localStorage.getItem("username");
  const handleMenu = () => {
    setMenu(!menu);
  };

  // const { data: booksData } = useGetBooksQuery();
  // console.log(books);

  // useEffect(() => {
  //   const scanner = new Html5QrcodeScanner("reader", {
  //     qrbox: {
  //       width: 250,
  //       height: 250,
  //     },
  //     fps: 5,
  //   });

  //   scanner.render(success, error);

  //   function success(result) {
  //     scanner.clear();
  //     setResult(result);
  //   }
  //   function error(err) {
  //     console.warn(err);
  //   }
  // }, []);

  const getColleges = async () => {
    try {
      console.log("getcolleges called");
      const response = await axios.get(
        "http://localhost:9000/api/college/getColleges"
      );
      console.log(response.data);
      setColleges(response?.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getStore = async () => {
    const response = await axios.get(
      `http://localhost:9000/api/auth/getStore?username=${storeUsername}`
    );
    console.log(response.data);
    setStoreUser(response?.data[0]);
  };
  const getCollegeById = async () => {
    const response = await axios.get(
      `http://localhost:9000/api/college/getCollegeById?collegeId=${storeUser?.collegeId}`
    );
    console.log(response.data);
    setColleges(response?.data);
  };

  useEffect(() => {
    if (role === "admin") {
      getColleges();
    } else {
      getStore();
    }
    console.log("role", role);
  }, [role]);

  useEffect(() => {
    if (storeUser?.collegeId) {
      getCollegeById();
    }
  }, [storeUser]);
  return (
    <div
      className="bg-gray-200 min-h-screen p-3 
     flex justify-center"
    >
      <div className="bg-white w-full  md:w-[60%] flex flex-col border border-gray-300  shadow-2xl shadow-black/50 items-center p-2 rounded-md min-h-[calc(100vh-24px)]">
        <div className=" flex  justify-between items-center w-full mb-5 ">
          <div className="font-medium sedan-sc-regular text-4xl">STORE</div>
          <div className="flex gap-x-2 items-center">
            <StoreMenu menu={menu} handleMenu={handleMenu} />
          </div>
        </div>
        <div className="flex  justify-between  w-full my-2">
          {/* <Link to="/update">
            <button className="text-lg bg-[rgb(58,36,74)] text-white p-1 rounded-md hover:bg-[rgb(58,36,114)]">
              Update Item
            </button>
          </Link> */}
          {role === "admin" && (
            <Link to="/addKit">
              <button className="text-lg bg-[rgb(58,36,74)] text-white p-1 rounded-md hover:bg-[rgb(58,36,114)]">
                Add Kit
              </button>
            </Link>
          )}
          {role === "admin" && (
            <Link to="/addbook">
              <button className="text-lg bg-[rgb(58,36,74)] text-white p-1 rounded-md hover:bg-[rgb(58,36,114)]">
                Add Book
              </button>
            </Link>
          )}
          {role === "admin" && (
            <Link to="/addItem">
              <button className="text-lg bg-[rgb(58,36,74)] text-white p-1 rounded-md hover:bg-[rgb(58,36,114)]">
                Add Item
              </button>
            </Link>
          )}
        </div>

        <div className="w-full flex  p-0 h-60 border border-black  rounded-md">
          {/* <Link to="/scanner">Scanner </Link> */}
          <QrCodeScanner />
        </div>

        <hr className="border-gray-400 border w-full my-5" />

        <div className="grid w-full grid-cols-1  gap-3">
          {colleges?.map((item) => (
            <Link to="/kits" state={{ item: item }}>
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
      </div>
    </div>
  );
};

export default Store;
