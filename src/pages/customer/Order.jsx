import React, { useState, useEffect } from "react";
import Image from "../../assets/book.jpg";
import { FaRupeeSign } from "react-icons/fa";
import { useGetOrdersByStudentIdQuery } from "../../redux/services/ordersApi";
import { Link } from "react-router-dom";
import Menu from "../../components/Menu";

const Order = () => {
  // const [searchList, setSearchList] = useState([]);
  const [order, setOrder] = useState([]);
  const [menu, setMenu] = useState(false);

  const savedEmail = localStorage.getItem("email");

  const { data: orderData } = useGetOrdersByStudentIdQuery(savedEmail);
  console.log(orderData);

  const getTotalAmount = () => {
    let totalAmount = 0;
    cart.map((item) => {
      totalAmount += Number(item?.book_details?.price);
    });
    return totalAmount;
  };

  const handleMenu = () => {
    setMenu(!menu);
  };
  // const handleSearch = (e) => {
  //   console.log("in serach");
  //   const serachResults = cart?.filter((item) => {
  //     return (
  //       item.title.toLowerCase().includes(e.target.value) ||
  //       item.college.toLowerCase().includes(e.target.value.toLowerCase()) ||
  //       item.price.toLowerCase().includes(e.target.value.toLowerCase()) ||
  //       item.academicyear.includes(e.target.value) ||
  //       item.year.toLowerCase().includes(e.target.value.toLowerCase())
  //     );
  //   });
  //   setSearchList(serachResults);
  // };
  useEffect(() => {
    if (orderData) {
      setOrder(orderData);
      // setSearchList(orderData);
    }
  }, [orderData]);
  const arrayItems = [1, 2, 3, 4, 5];
  return (
    <div className="min-h-[100vh] sm:p-5 p-2 bg-gray-200 flex flex-col-reverse justify-end  sm:justify-center  sm:flex-row  ">
      <div className="bg-white sm:p-5 rounded-md  p-3 sm:w-[75%] md:w-[60%] ">
        <div className="flex flex-row items-center justify-between">
          <div className="text-3xl font-medium">Student Book Store</div>
          <div className="sm:flex hidden flex-row gap-x-5">
            <div className="hover:bg-blue-100 hidden md:block p-1 px-2 rounded-md">
              <Link to="/">Home</Link>
            </div>
            <div className="hover:bg-blue-100 hidden md:block p-1 px-2 rounded-md">
              <Link to="/cart">Cart</Link>
            </div>
            <div className="hover:bg-blue-100 hidden md:block p-1 px-2 rounded-md">
              <Link to="/logout">Logout</Link>
            </div>
          </div>
          <Menu menu={menu} handleMenu={handleMenu} />
        </div>
        <hr className="border border-black/20 my-3" />
        {/* mapping of items in cart is start from here */}
        {order?.map((item) => (
          <>
            <div
              id="items-list"
              className=" h-56 md:h-64 flex  p-3 border border-black/10 shadow-sm shadow-gray-400"
            >
              <img
                src={Image}
                className="min-w-[50%] max-w-[50%] md:min-w-[40%] md:max-w-[40%] h-[100%]"
              />

              <div className="ms-4">
                <div className="font-medium text-sm sm:text-base ">
                  {item?.book_details?.title}
                </div>

                <div className="text-sm">{item?.book_details?.college}</div>

                <div className="text-sm">{item?.book_details?.year}</div>

                <div className="text-sm">{item?.payment_method}</div>
                <div className="text-sm">{item?.status}</div>

                <div className="font-medium text-lg flex items-center">
                  <FaRupeeSign
                    style={{
                      width: 12,
                      height: 12,
                    }}
                  />
                  {item?.total_amount}
                </div>
              </div>
            </div>
            <hr className="border border-black/20 my-3" />
          </>
        ))}

        {/* mapping of items in cart end here */}
      </div>
    </div>
  );
};

export default Order;
