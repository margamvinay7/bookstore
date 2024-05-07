import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import StoreMenu from "../../components/StoreMenu";
import {
  useUpdateBookMutation,
  useGetBookQuery,
} from "../../redux/services/booksApi";

const UpdateItem = () => {
  // const [book, setBook] = useState([]);

  const path = useLocation();
  const { id } = path.state;
  const { data: bookData } = useGetBookQuery(id);
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
    } catch (error) {
      console.log("err", error);
    }
  };

  useEffect(() => {
    if (bookData) {
      setBook(bookData[0]);
    }
  }, [bookData]);
  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-200">
      <div className="bg-white shadow-md rounded-lg p-6 flex flex-col items-center w-[90vw] ">
        <div className="flex justify-between w-full items-center">
          <h2 className="text-2xl font-bold mb-4">Update Item</h2>
          <StoreMenu menu={menu} handleMenu={handleMenu} />
        </div>
        <div className="w-full">
          <div className="mb-4 flex flex-col w-full; ">
            <label htmlFor="title">Title</label>
            <input
              onChange={(e) => handleChange(e)}
              value={book.title}
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
              value={book.college}
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
              value={book.year}
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
              value={book.academicyear}
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
              value={book.price}
              onChange={(e) => handleChange(e)}
              id="price"
              placeholder="Enter item Price"
              name="price"
              type="text"
              className="border rounded-sm border-gray-400 p-1"
            />
          </div>

          <div className="mb-4 flex flex-col">
            <label htmlFor="stock_quantity">Quantity</label>
            <input
              value={book.stock_quantity}
              onChange={(e) => handleChange(e)}
              id="stock_quantity"
              placeholder="Enter item Quantity"
              name="stock_quantity"
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

export default UpdateItem;
