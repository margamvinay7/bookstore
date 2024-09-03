import React, { useState, useEffect } from "react";
import Image from "../../assets/book.jpg";
import { FaRupeeSign } from "react-icons/fa";
import { useGetOrdersByStudentIdQuery } from "../../redux/services/ordersApi";
import { Link } from "react-router-dom";
import Menu from "../../components/Menu";
import { FiShoppingCart } from "react-icons/fi";
import axios from "axios";

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

  // const getKit = async (id) => {
  //   const response = await axios.get(
  //     `http://localhost:9000/api/kit/getKit?id=${id}`
  //   );
  //   console.log("kitshere", response.data?.data);
  // };

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
      <div className="bg-white sm:p-5 rounded-md  p-3 w-full md:w-[60%] ">
        <div className="flex flex-row items-center justify-between">
          <div className="text-3xl font-medium">Your Orders</div>
          <div className="sm:flex hidden flex-row gap-x-5">
            <div className="hover:bg-blue-100 hidden md:block p-1 px-2 rounded-md">
              <Link to="/">Home</Link>
            </div>
            <div className="hover:bg-blue-100 hidden md:block p-1 px-2 rounded-md">
              <Link to="/cart">
                <FiShoppingCart className="w-6 h-6" />
              </Link>
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
        {/* mapping of items in cart is start from here */}
        {order?.map((item) => (
          <>
            <Link to="/orderDetails" state={{ id: item?.order_id }}>
              <div
                id="items-list"
                className=" min-h-56 sm:h-64 flex flex-col  p-3 border border-black/10 shadow-sm shadow-gray-400"
              >
                <div className="border  border-gray-300 flex justify-between  text-xs sm:text-sm p-2 rounded-md">
                  <div>
                    <div className="font-medium">{item?.status}</div>
                    <div>{item?.updated_at?.split(" ")[0]}</div>
                  </div>
                  <div>
                    <div>Total</div>
                    <div>{item?.total_amount}</div>
                  </div>
                  <div className="">
                    <div>ORDER PLACED</div>
                    <div>{item?.order_date?.split(" ")[0]}</div>
                  </div>
                </div>
                <div className="flex w-full">
                  <img
                    src={`data:image/jpg;charset=utf8;base64,${item?.kit_details?.image}`}
                    className="min-w-[50%] max-w-[50%] sm:min-w-[30%] sm:max-w-[30%] h-[50%]"
                  />

                  <div className="ms-4">
                    <div className=" text-sm sm:text-base ">
                      {item?.kit_details?.title}
                    </div>

                    <div className="text-sm">
                      {item?.kit_details?.collegeId}
                    </div>

                    <div className="text-sm">
                      {item?.kit_details?.courseyear}
                    </div>

                    <div className="text-sm">{item?.payment_method}</div>
                    <Link to="/orderDetails" state={{ id: item?.order_id }}>
                      <div className="border border-gray-300 rounded-md text-xs sm:text-sm p-2 text-white bg-[rgb(58,36,74)]">
                        View Order Receipt
                      </div>
                    </Link>
                    {/* <div className="text-sm">{item?.transactionId}</div> */}
                    {/* <div className="text-sm">{item?.status}</div> */}

                    {/* <div className="font-medium text-lg flex items-center">
                      <FaRupeeSign
                        style={{
                          width: 12,
                          height: 12,
                        }}
                      />
                      {item?.total_amount}
                    </div> */}
                  </div>
                </div>
              </div>
            </Link>
            <hr className="border border-black/20 my-3" />
          </>
        ))}

        {/* mapping of items in cart end here */}
      </div>
    </div>
  );
};

export default Order;
