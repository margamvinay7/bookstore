import React, { useState, useEffect } from "react";
import StoreMenu from "../../components/StoreMenu";
import { useAddBookMutation } from "../../redux/services/booksApi";
import NotificationComponent from "../../components/Notification";

const AddBook = () => {
  const [notification, setNotification] = useState({ message: "", type: "" });
  const [form, setForm] = useState({
    title: "",
    college: "",
    stockQuantity: "",
    price: "",
    year: "",
    academicyear: "",
  });
  const handleChange = (event) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  };

  const [addBook] = useAddBookMutation();
  const [menu, setMenu] = useState(false);

  const handleMenu = () => {
    setMenu(!menu);
  };
  console.log(form.title);
  const addToStore = async () => {
    console.log(form.title);
    if (
      form.title !== null &&
      form.academicyear !== null &&
      form.college !== null &&
      form.price !== null &&
      form.stockQuantity !== null &&
      form.year !== null &&
      form.title !== "" &&
      form.academicyear !== "" &&
      form.college !== "" &&
      form.price !== "" &&
      form.stockQuantity !== "" &&
      form.year !== ""
    ) {
      try {
        const response = await addBook(form);
        console.log("fromdata", form.title);
        setNotification({
          message: "Book Added Successfully!",
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
          message: "Failed to Add Book",
          type: "error",
        });
        setTimeout(() => {
          setNotification({
            message: "",
            type: "",
          });
        }, 3000);
      }
    }
  };
  return (
    <div className="min-h-screen  flex justify-center items-center bg-gray-200">
      {notification.message && <NotificationComponent {...notification} />}
      <div className="bg-white  shadow-md rounded-lg p-6 flex flex-col items-center w-[90vw] ">
        <div className="flex justify-between w-full items-center">
          <h2 className="text-2xl font-bold mb-4">Add Book</h2>
          <StoreMenu menu={menu} handleMenu={handleMenu} />
        </div>
        <div className="w-full">
          <div className="mb-4 flex flex-col w-full; ">
            <label htmlFor="title">Title</label>
            <input
              onChange={(e) => handleChange(e)}
              id="title"
              placeholder="Enter item Title"
              name="title"
              type="text"
              className="border rounded-sm w-full border-gray-400 p-1"
            />
          </div>
          <div className="mb-4 flex flex-col ">
            <label htmlFor="college">College</label>
            <input
              onChange={(e) => handleChange(e)}
              id="college"
              name="college"
              placeholder="Enter item College"
              type="text"
              className="border rounded-sm border-gray-400 p-1"
            />
          </div>
          <div className="mb-4 flex flex-col ">
            <label htmlFor="year">Course Year</label>
            <input
              onChange={(e) => handleChange(e)}
              id="year"
              name="year"
              placeholder="Enter item Course Year"
              type="text"
              className="border rounded-sm border-gray-400 p-1"
            />
          </div>
          <div className="mb-4 flex flex-col ">
            <label htmlFor="academicyear">Academic Year</label>
            <input
              onChange={(e) => handleChange(e)}
              id="academicyear"
              name="academicyear"
              placeholder="Enter item Academice Year"
              type="text"
              className="border rounded-sm border-gray-400 p-1"
            />
          </div>
          <div className="mb-4 flex flex-col ">
            <label htmlFor="price">Price</label>
            <input
              onChange={(e) => handleChange(e)}
              id="price"
              placeholder="Enter item Price"
              name="price"
              type="text"
              className="border rounded-sm border-gray-400 p-1"
            />
          </div>

          <div className="mb-4 flex flex-col">
            <label htmlFor="quantity">Quantity</label>
            <input
              onChange={(e) => handleChange(e)}
              id="quantity"
              placeholder="Enter item Quantity"
              name="stockQuantity"
              type="text"
              className="border rounded-sm border-gray-400 p-1"
            />
          </div>

          <button
            className="w-full bg-[rgb(58,36,74)] text-white p-2 rounded-md"
            onClick={() => addToStore()}
          >
            Add to Inventory
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddBook;
