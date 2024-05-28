import React, { useState, useEffect } from "react";
import {
  Link,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import Image from "../../assets/book.jpg";
import {
  useGetOrderByIdQuery,
  useDeliveryStatusMutation,
} from "../../redux/services/ordersApi";
import { FaRupeeSign } from "react-icons/fa";
import StoreMenu from "../../components/StoreMenu";
import NotificationComponent from "../../components/Notification";

const UpdateOrder = () => {
  const [searchParams] = useSearchParams();
  const [order, setOrder] = useState("");
  const [notification, setNotification] = useState({ message: "", type: "" });
  console.log(location?.state?.id);
  const id = location?.state?.id || searchParams.get("id") || 1;
  const {
    data: orderData,
    isSuccess,
    isError,
    isFetching,
    isLoading,
    isUninitialized,
    error,
  } = useGetOrderByIdQuery(id);
  // console.log(
  //   orderData,
  //   isSuccess,
  //   isError,
  //   isFetching,
  //   isLoading,
  //   isUninitialized
  // );
  const [menu, setMenu] = useState(false);
  const handleMenu = () => {
    setMenu(!menu);
  };

  const [statusUpdate] = useDeliveryStatusMutation();

  const handleUpdate = async () => {
    try {
      const response = await statusUpdate({
        orderId: id,
        status: "Delivered",
      })?.unwrap();
      setNotification({
        message: "Delivery Status Updated Successfully!",
        type: "success",
      });
      setTimeout(() => {
        setNotification({
          message: "",
          type: "",
        });
      }, 3000);
    } catch (error) {
      console.log(error);
      setNotification({
        message: "Failed to Update Delivery Status",
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
    if (orderData) {
      setOrder(orderData);
    }
  }, [orderData]);

  return (
    <div className="min-h-[100vh] p-5 bg-gray-200 flex justify-center    ">
      <div className="bg-white p-5 w-full sm:w-[50%] h-fit md:w-[30%] rounded-md ">
        <div className="flex  items-center justify-between">
          <div className="sm:text-3xl text-2xl font-medium">
            Student Book Store
          </div>
          <StoreMenu menu={menu} handleMenu={handleMenu} />
        </div>
        <hr className="border border-black/20 my-3" />
        {notification.message && <NotificationComponent {...notification} />}
        {/* mapping of items in cart is start from here */}

        <div
          id="receipt"
          className=" h-[30rem] w-full  rounded-md  p-3 border flex-col border-black/10 shadow-sm shadow-gray-400"
        >
          <img src={Image} className="w-[100%] h-[60%]" />

          <div className="ms-4">
            <div className="font-medium">{order?.book_details?.title}</div>
            <div className="font-medium flex flex-row items-center">
              {" "}
              <FaRupeeSign
                style={{
                  width: 12,
                  height: 12,
                }}
              />{" "}
              {order?.book_details?.price}
            </div>
            <span>{order?.book_details?.college}</span> |{" "}
            <span>{order?.book_details?.year}</span> |{" "}
            <span>{order?.book_details?.academicyear}</span>
            <div className="font-medium">{order?.status}</div>
          </div>
          <div
            onClick={() => handleUpdate()}
            className="text-center cursor-pointer bg-[rgb(58,36,74)] p-1 text-white rounded-md"
          >
            Deliver Order
          </div>
        </div>

        {/* mapping of items in cart end here */}
      </div>
    </div>
  );
};

export default UpdateOrder;
