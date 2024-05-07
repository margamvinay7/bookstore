import React, { useState, useEffect } from "react";
import StoreMenu from "../../components/StoreMenu";
import { useAddBookMutation } from "../../redux/services/booksApi";

const AddItem = () => {
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
  const addToStore = async () => {
    try {
      const response = await addBook(form);
      console.log("fromdata", form);
    } catch (error) {
      console.log("err", error);
    }
  };
  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-200">
      <div className="bg-white shadow-md rounded-lg p-6 flex flex-col items-center w-[90vw] ">
        <div className="flex justify-between w-full items-center">
          <h2 className="text-2xl font-bold mb-4">Add Item</h2>
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
            <label htmlFor="year">Year</label>
            <input
              onChange={(e) => handleChange(e)}
              id="year"
              name="year"
              placeholder="Enter item Year"
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

export default AddItem;
