import React, { useState, useEffect, useRef } from "react";
import StoreMenu from "../../components/StoreMenu";
import { Link } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import { useGetBooksQuery } from "../../redux/services/booksApi";
import { useSelector } from "react-redux";
import { Html5QrcodeScanner } from "html5-qrcode";
import QrCodeScanner from "./QrCodeScanner";

const Store = () => {
  const items = ["", "", "", ""];
  const [menu, setMenu] = useState(false);
  const [books, setBooks] = useState();

  const [result, setResult] = useState(null);

  const role =
    useSelector((state) => state.user.role) || localStorage.getItem("role");

  const handleMenu = () => {
    setMenu(!menu);
  };

  const { data: booksData } = useGetBooksQuery();
  console.log(books);

  // useEffect(() => {
  //   const scanner = new Html5QrcodeScanner("reader", {
  //     qrbox: {
  //       width: 250,
  //       height: 250,
  //     },
  //     fps: 5,
  //   });

  //   scanner.render(success, error);

  //   function success(result) {
  //     scanner.clear();
  //     setResult(result);
  //   }
  //   function error(err) {
  //     console.warn(err);
  //   }
  // }, []);

  useEffect(() => {
    setBooks(booksData);
  }, [booksData]);
  return (
    <div className="bg-gray-200 min-h-screen p-3 flex justify-center">
      <div className="bg-white w-full md:w-[60%] flex flex-col border border-gray-300  shadow-2xl shadow-black/50 items-center p-2 rounded-md min-h-[calc(100vh-24px)]">
        <div className=" flex  justify-between items-center w-full mb-5 ">
          <div className="font-medium sedan-sc-regular text-4xl">STORE</div>
          <div className="flex gap-x-2 items-center">
            <StoreMenu menu={menu} handleMenu={handleMenu} />
          </div>
        </div>
        <div className="flex  justify-between  w-full my-2">
          {/* <Link to="/update">
            <button className="text-lg bg-[rgb(58,36,74)] text-white p-1 rounded-md hover:bg-[rgb(58,36,114)]">
              Update Item
            </button>
          </Link> */}
          {role === "admin" && (
            <Link to="/addItem">
              <button className="text-lg bg-[rgb(58,36,74)] text-white p-1 rounded-md hover:bg-[rgb(58,36,114)]">
                Add Kit
              </button>
            </Link>
          )}
          {role === "admin" && (
            <Link to="/addItem">
              <button className="text-lg bg-[rgb(58,36,74)] text-white p-1 rounded-md hover:bg-[rgb(58,36,114)]">
                Add Book
              </button>
            </Link>
          )}
          {role === "admin" && (
            <Link to="/addItem">
              <button className="text-lg bg-[rgb(58,36,74)] text-white p-1 rounded-md hover:bg-[rgb(58,36,114)]">
                Add Item
              </button>
            </Link>
          )}
        </div>

        <div className="w-full relative p-0 h-60 border border-black justify-center items-center flex rounded-md">
          {/* <Link to="/scanner">Scanner </Link> */}
          <QrCodeScanner />
        </div>

        <hr className="border-gray-400 border w-full mt-5" />

        <table className=" table-auto min-w-full ">
          <thead>
            <tr className="border-b-2 border-gray-400 h-9 hover:bg-gray-300 ">
              <td className="font-medium p-2"> Items</td>
              <td className="font-medium">Quantity</td>
              <td className="font-medium">College</td>
              {/* <td>
                <StoreMenu menu={menu} handleMenu={handleMenu} />
              </td> */}
            </tr>
          </thead>

          <tbody>
            {books?.map((item) => (
              <tr className="border-b-2 border-gray-400 h-9 hover:bg-gray-300">
                <td className="p-2">{item.title}</td>
                <td>{item.stock_quantity}</td>
                <td>{item.collegeId}</td>

                {/* <td>
                  <Link to="/update" state={{ id: item?.book_id }}>
                    <FaEdit />
                  </Link>
                </td> */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Store;
