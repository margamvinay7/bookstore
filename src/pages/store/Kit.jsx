import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Image from "../../assets/book.jpg";
import { FaRupeeSign } from "react-icons/fa";
import { useAddToCartMutation } from "../../redux/services/cartApi";
import { useGetStudentQuery } from "../../redux/services/authApi";
import Menu from "../../components/Menu";
import axios from "axios";
import NotificationComponent from "../../components/Notification";
import StoreMenu from "../../components/StoreMenu";

const Kit = () => {
  const navigate = useNavigate();
  const [menu, setMenu] = useState(false);
  const location = useLocation();
  const [notification, setNotification] = useState({ message: "", type: "" });
  const [student, setStudent] = useState();
  const { item } = location.state;
  console.log(item);
  const savedEmail = localStorage.getItem("email");
  const handleMenu = () => {
    setMenu(!menu);
  };
  const { data: studentData } = useGetStudentQuery(savedEmail);
  console.log(studentData);
  const [cart] = useAddToCartMutation();
  const role = localStorage.getItem("role");

  const addToCart = async () => {
    try {
      const response = await cart({
        bookId: item.book_id,
        studentId: savedEmail,
        quantity: 1,
      });
      setNotification({
        message: "Book Added To Cart!",
        type: "success",
      });
      setTimeout(() => {
        setNotification({
          message: "",
          type: "",
        });
      }, 3000);
      // .then(() => {
      //   navigate("/cart");
      // });
    } catch (error) {
      console.log("err", error);
      setNotification({
        message: "Failed to Add Book To The Cart",
        type: "error",
      });
      setTimeout(() => {
        setNotification({
          message: "",
          type: "",
        });
      }, 3000);
    }
  };

  useEffect(() => {
    if (studentData) {
      setStudent(studentData[0]);
    }
  }, [studentData]);
  return (
    <div className="min-h-[100vh] p-5 bg-gray-200 flex justify-center   ">
      {notification.message && <NotificationComponent {...notification} />}
      <div className="bg-white p-5 w-full sm:w-[80%]  h-fit md:w-[40%] rounded-md ">
        <div className="flex  items-center justify-between">
          <div className="sm:text-3xl text-2xl font-medium">Kit</div>
          <StoreMenu menu={menu} handleMenu={handleMenu} />
        </div>
        <hr className="border border-black/20 my-3" />

        {/* mapping of items in cart is start from here */}

        <div
          id="items-list"
          className=" min-h-[30rem] w-full  rounded-md  p-3 border flex-col border-black/10 shadow-sm shadow-gray-400"
        >
          <img
            src={`data:image/jpg;charset=utf8;base64,${item.image}`}
            className="w-[100%] h-[60%]"
          />

          <div className="ms-4">
            <div className="font-medium">{item?.title}</div>
            <div className="font-medium flex flex-row items-center">
              {" "}
              <FaRupeeSign
                style={{
                  width: 12,
                  height: 12,
                }}
              />{" "}
              {item?.price}
            </div>
            <span>{item?.collegeId}</span> | <span>{item?.courseyear}</span> |{" "}
            <span>{item?.academicyear}</span>
            <div className="font-medium">
              Stock Quantity : {item?.stock_quantity}
            </div>
            <div>
              <div className="font-medium">Books :</div>
              {item.books.map((book) => (
                <div>{book?.title}</div>
              ))}
            </div>
            <div>
              <div className="font-medium">Items :</div>
              {item.items.map((item) => (
                <div>{item?.name}</div>
              ))}
            </div>
          </div>

          {role !== "store" && (
            <Link to="/updateKit" state={{ id: item?.kitId }}>
              <div className="text-center cursor-pointer bg-[rgb(58,36,74)] p-1 my-2 text-white rounded-md">
                Update Kit
              </div>
            </Link>
          )}

          {/* <div
            className="text-center cursor-pointer bg-[rgb(58,36,74)] p-1 text-white rounded-md"
            onClick={handleBuyNow}
          >
            Buy Now
          </div> */}
        </div>

        {/* mapping of items in cart end here */}
      </div>
    </div>
  );
};

export default Kit;
