import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Image from "../../assets/book.jpg";
import { FaRupeeSign } from "react-icons/fa";
import { useAddToCartMutation } from "../../redux/services/cartApi";
import { useGetStudentQuery } from "../../redux/services/authApi";
import Menu from "../../components/Menu";
import axios from "axios";
import NotificationComponent from "../../components/Notification";

const Book = () => {
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

  const handleBuyNow = async () => {
    try {
      window.location.replace(
        `http://localhost:9000/pay.php?bookId=${item.id}&studentId=${savedEmail}&amount=${item.price}&name=${student.full_name}&book=${item?.title}`
      );

      console.log(response);
    } catch (error) {
      console.log("err", error);
    }
  };

  useEffect(() => {
    if (studentData) {
      setStudent(studentData[0]);
    }
  }, [studentData]);
  return (
    <div className="min-h-[100vh] p-5 bg-gray-200 flex justify-center    ">
      {notification.message && <NotificationComponent {...notification} />}
      <div className="bg-white p-5 w-full sm:w-[50%] h-fit md:w-[30%] rounded-md ">
        <div className="flex  items-center justify-between">
          <div className="sm:text-3xl text-2xl font-medium">
            Student Book Store
          </div>
          <Menu menu={menu} handleMenu={handleMenu} />
        </div>
        <hr className="border border-black/20 my-3" />

        {/* mapping of items in cart is start from here */}

        <div
          id="items-list"
          className=" h-[30rem] w-full  rounded-md  p-3 border flex-col border-black/10 shadow-sm shadow-gray-400"
        >
          <img src={Image} className="w-[100%] h-[60%]" />

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
            <span>{item?.collegeId}</span> | <span>{item?.courseYear}</span> |{" "}
            <span>{item?.academicYear}</span>
          </div>

          <div
            onClick={addToCart}
            className="text-center cursor-pointer bg-[rgb(58,36,74)] p-1 my-2 text-white rounded-md"
          >
            Add to Cart
          </div>

          <div
            className="text-center cursor-pointer bg-[rgb(58,36,74)] p-1 text-white rounded-md"
            onClick={handleBuyNow}
          >
            Buy Now
          </div>
        </div>

        {/* mapping of items in cart end here */}
      </div>
    </div>
  );
};

export default Book;
