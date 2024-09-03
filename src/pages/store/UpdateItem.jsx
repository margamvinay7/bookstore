import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import StoreMenu from "../../components/StoreMenu";
import { useSelector } from "react-redux";
import {
  useUpdateItemMutation,
  useGetItemByIdQuery,
} from "../../redux/services/itemsApi";
import NotificationComponent from "../../components/Notification";

const UpdateItem = () => {
  // const [item, setitem] = useState([]);
  const [notification, setNotification] = useState({ message: "", type: "" });
  const path = useLocation();
  const { id } = path.state;
  const { data: itemData } = useGetItemByIdQuery(id);
  console.log(itemData);
  const userRole =
    useSelector((state) => state.user.role) || localStorage.getItem("role");

  const [item, setItem] = useState({
    item_id: "",
    title: "",
    college: "",
    stock_quantity: "",
    price: "",
    year: "",
    academicyear: "",
  });
  const handleChange = (event) => {
    setItem({
      ...item,
      [event.target.name]: event.target.value,
    });
  };

  const [updateItem] = useUpdateItemMutation();

  const [menu, setMenu] = useState(false);

  const handleMenu = () => {
    setMenu(!menu);
  };
  const addToStore = async () => {
    try {
      const response = await updateItem(item);
      console.log("fromdata", item);
      setNotification({
        message: "item Updated Successfully!",
        type: "success",
      });
      setTimeout(() => {
        setNotification({
          message: "",
          type: "",
        });
      }, 3000);
    } catch (error) {
      console.log("err", error);
      setNotification({
        message: "Failed to Update item",
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

  const css =
    userRole === "admin" ? "border rounded-sm w-full border-gray-400 p-1" : "";

  useEffect(() => {
    if (itemData) {
      setItem(itemData[0]);
    }
  }, [itemData]);
  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-200">
      {notification.message && <NotificationComponent {...notification} />}
      <div className="bg-white shadow-md rounded-lg p-6 flex flex-col items-center w-[90vw] ">
        <div className="flex justify-between w-full items-center">
          <h2 className="text-2xl font-bold mb-4">Update Item</h2>
          <StoreMenu menu={menu} handleMenu={handleMenu} />
        </div>
        <div className="w-full">
          <div className="mb-4 flex flex-col w-full; ">
            <label htmlFor="title">Title</label>
            <input
              autoFocus={userRole === "admin"}
              onChange={(e) => handleChange(e)}
              disabled={userRole !== "admin"}
              value={item.title}
              id="title"
              placeholder="Enter item Title"
              name="title"
              type="text"
              className={`${css}`}
            />
          </div>
          <div className="mb-4 flex flex-col ">
            <label htmlFor="college">College</label>
            <input
              onChange={(e) => handleChange(e)}
              disabled={userRole !== "admin"}
              value={item.collegeId}
              id="college"
              name="college"
              placeholder="Enter item College"
              type="text"
              className={`${css}`}
            />
          </div>
          <div className="mb-4 flex flex-col ">
            <label htmlFor="year">Year</label>
            <input
              value={item.year}
              disabled={userRole !== "admin"}
              onChange={(e) => handleChange(e)}
              id="year"
              name="year"
              placeholder="Enter item Year"
              type="text"
              className={`${css}`}
            />
          </div>
          <div className="mb-4 flex flex-col ">
            <label htmlFor="academicyear">Academic Year</label>
            <input
              value={item.academicyear}
              disabled={userRole !== "admin"}
              onChange={(e) => handleChange(e)}
              id="academicyear"
              name="academicyear"
              placeholder="Enter item Academice Year"
              type="text"
              className={`${css}`}
            />
          </div>
          <div className="mb-4 flex flex-col ">
            <label htmlFor="price">Price</label>
            <input
              value={item.price}
              disabled={userRole !== "admin"}
              onChange={(e) => handleChange(e)}
              id="price"
              placeholder="Enter item Price"
              name="price"
              type="text"
              className={`${css}`}
            />
          </div>

          <div className="mb-4 flex flex-col">
            <label htmlFor="stock_quantity">Quantity</label>
            <input
              value={item.stock_quantity}
              autoFocus={userRole === "store"}
              onChange={(e) => handleChange(e)}
              id="stock_quantity"
              placeholder="Enter item Quantity"
              name="stock_quantity"
              type="text"
              className="border  rounded-sm border-gray-400 p-1"
            />
          </div>

          <button
            className="w-full bg-[rgb(58,36,74)] text-white p-2 rounded-md"
            onClick={() => addToStore()}
          >
            Update Inventory
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateItem;
