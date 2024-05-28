import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import StoreMenu from "../../components/StoreMenu";
import { useSelector } from "react-redux";
import {
  useUpdateBookMutation,
  useGetBookQuery,
} from "../../redux/services/booksApi";
import NotificationComponent from "../../components/Notification";

const UpdateBook = () => {
  // const [book, setBook] = useState([]);
  const [notification, setNotification] = useState({ message: "", type: "" });
  const path = useLocation();
  const { id } = path.state;
  const { data: bookData } = useGetBookQuery(id);
  const userRole =
    useSelector((state) => state.user.role) || localStorage.getItem("role");
  console.log(id);
  const [book, setBook] = useState({
    book_id: "",
    title: "",
    college: "",
    stock_quantity: "",
    price: "",
    year: "",
    academicyear: "",
  });
  const handleChange = (event) => {
    setBook({
      ...book,
      [event.target.name]: event.target.value,
    });
  };

  const [updateBook] = useUpdateBookMutation();

  const [menu, setMenu] = useState(false);

  const handleMenu = () => {
    setMenu(!menu);
  };
  const addToStore = async () => {
    try {
      const response = await updateBook(book);
      console.log("fromdata", book);
      setNotification({
        message: "Book Updated Successfully!",
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
        message: "Failed to Update Book",
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
    if (bookData) {
      setBook(bookData[0]);
    }
  }, [bookData]);
  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-200">
      {notification.message && <NotificationComponent {...notification} />}
      <div className="bg-white shadow-md rounded-lg p-6 flex flex-col items-center w-[90vw] ">
        <div className="flex justify-between w-full items-center">
          <h2 className="text-2xl font-bold mb-4">Update Book</h2>
          <StoreMenu menu={menu} handleMenu={handleMenu} />
        </div>
        <div className="w-full">
          <div className="mb-4 flex flex-col w-full; ">
            <label htmlFor="title">Title</label>
            <input
              autoFocus={userRole === "admin"}
              onChange={(e) => handleChange(e)}
              disabled={userRole !== "admin"}
              value={book.title}
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
              value={book.college}
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
              value={book.year}
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
              value={book.academicyear}
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
              value={book.price}
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
              value={book.stock_quantity}
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

export default UpdateBook;
