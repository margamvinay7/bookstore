import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import { useGetItemsBycollegeAndCourseQuery } from "../../redux/services/itemsApi";
import StoreMenu from "../../components/StoreMenu";
import Image from "../../assets/book.jpg";
import { useSelector } from "react-redux";
import NotificationComponent from "../../components/Notification";
import axios from "axios";

const ItemList = () => {
  const items = ["", "", "", ""];
  const [collegeList, setCollegeList] = useState([]);
  const [collegeValue, setCollegeValue] = useState();
  const [courseyearList, setCourseYearList] = useState([]);
  const [courseyearValue, setCourseYearValue] = useState();
  const [books, setBooks] = useState();

  const [notification, setNotification] = useState({ message: "", type: "" });
  const [menu, setMenu] = useState(false);

  const handleMenu = () => {
    setMenu(!menu);
  };

  const handleCollege = async (e) => {
    setCollegeValue(e.target.value);
    // const courseyear = e.target.value;
    // const branch = selectedBranch;
    // if (branch !== null && courseyear !== null) {
    //   const response = await axios.get(
    //     `http://localhost:9000/api/kit/getAllKitsByBranchAndCourseYear?branch=${branch}&courseyear=${courseyear}&college=${collegeId}`
    //   );
    //   console.log(response);
    //   setCollegeList(response?.data?.data);
    // }
  };

  const handleCourseyear = async (e) => {
    setCourseYearValue(e.target.value);
    // const courseyear = selectedCourseyear;
    // const branch = e.target.value;
    // if (branch !== null && courseyear !== null) {
    //   const response = await axios.get(
    //     `http://localhost:9000/api/kit/getAllKitsByBranchAndCourseYear?branch=${branch}&courseyear=${courseyear}&college=${collegeId}`
    //   );
    //   console.log(response);
    //   setColleges(response?.data?.data);
    // }
  };

  const getBranchAndCourseyear = async () => {
    const response = await axios.get(
      `http://localhost:9000/api/item/getCollegesAndYear`
    );
    console.log(response.data);
    setCollegeList(response?.data?.branch);
    setCourseYearList(response?.data?.courseyear);
  };

  const userRole =
    useSelector((state) => state.user.role) || localStorage.getItem("role");
  const { data: booksData } = useGetItemsBycollegeAndCourseQuery({
    college: collegeValue,
    course: courseyearValue,
  });
  console.log(books);
  useEffect(() => {
    setBooks(booksData);
  }, [booksData]);

  useEffect(() => {
    getBranchAndCourseyear();
  }, []);
  return (
    <div className="bg-gray-200 p-3">
      <div className="bg-white p-2 min-h-[calc(100vh-24px)]">
        <div className="flex justify-between">
          <div className="text-2xl">Items List</div>
          <StoreMenu menu={menu} handleMenu={handleMenu} />
        </div>
        <hr className="border border-gray-300 mb-4" />
        <div className="flex justify-between sm:justify-center gap-x-5 my-5">
          <select
            onChange={handleCollege}
            className="border border-black drop-shadow-2xl p-1 rounded-md "
          >
            <option>Select College</option>
            {collegeList?.map((college) => (
              <option value={college?.collegeId}>{college?.collegeId}</option>
            ))}
          </select>
          <select
            onChange={handleCourseyear}
            className="border border-black drop-shadow-2xl p-1 rounded-md "
          >
            <option>Select Course Year</option>
            {courseyearList?.map((item) => (
              <option value={item?.year}>{item?.year}</option>
            ))}
          </select>

          {/* <select className="border border-black">
            <option>Select Academic Year</option>
            {branchList?.map((branch) => (
              <option value={branch}>{branch}</option>
            ))}
          </select> */}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
          {books?.map((item) => (
            <div
              id="items-list"
              className=" h-[30rem] w-full relative rounded-md  p-3 border flex-col border-black/10 shadow-sm shadow-gray-400"
            >
              {userRole === "admin" && (
                <Link to="/updateItem" state={{ id: item.item_id }}>
                  <div className="flex justify-end z-10  absolute right-4 top-4 ">
                    <div className="bg-gray-200 p-2 rounded-full ">
                      <FaEdit className="w-5 h-5   " />
                    </div>
                  </div>
                </Link>
              )}
              <img src={Image} className="w-[100%] h-[75%]" />

              <div className="ms-4">
                <div className="font-medium">Title : {item.title}</div>
                <div className="font-medium">Price : {item.price}</div>
                <div className="font-medium">
                  Quantity : {item.stock_quantity}
                </div>

                <div>College : {item.collegeId}</div>
                <div>Course : {item.year}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ItemList;
