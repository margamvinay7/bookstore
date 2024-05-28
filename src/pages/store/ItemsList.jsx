import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import { useGetBooksQuery } from "../../redux/services/booksApi";
import StoreMenu from "../../components/StoreMenu";
import Image from "../../assets/book.jpg";
import { useSelector } from "react-redux";
import NotificationComponent from "../../components/Notification";

const ItemsList = () => {
  const items = ["", "", "", ""];
  const [books, setBooks] = useState();
  const [notification, setNotification] = useState({ message: "", type: "" });
  const [menu, setMenu] = useState(false);

  const handleMenu = () => {
    setMenu(!menu);
  };
  const userRole =
    useSelector((state) => state.user.role) || localStorage.getItem("role");
  const { data: booksData } = useGetBooksQuery();
  console.log(books);
  useEffect(() => {
    setBooks(booksData);
  }, [booksData]);
  return (
    <div className="bg-gray-200 p-3">
      <div className="bg-white p-2 min-h-[calc(100vh-24px)]">
        <div className="flex justify-between">
          <div className="text-2xl">Items List</div>
          <StoreMenu menu={menu} handleMenu={handleMenu} />
        </div>
        <hr className="border border-gray-300 mb-4" />
        {/* <table className=" table-auto min-w-full ">
          <thead>
            <tr className="border-b-2 border-gray-400 h-9 hover:bg-gray-300 ">
              <td className="font-medium p-2"> Items</td>
              <td className="font-medium">Quantity</td>
              <td className="font-medium">College</td>
              <td>
                <StoreMenu menu={menu} handleMenu={handleMenu} />
              </td>
            </tr>
          </thead>

          <tbody>
            {books?.map((item) => (
              <tr className="border-b-2 border-gray-400 h-9 hover:bg-gray-300">
                <td className="p-2">{item.title}</td>
                <td>{item.stock_quantity}</td>
                <td>{item.college}</td>

                <td>
                  <Link to="/update" state={{ id: item?.book_id }}>
                    <FaEdit />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table> */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
          {books?.map((item) => (
            <div
              id="items-list"
              className=" h-[30rem] w-full relative rounded-md  p-3 border flex-col border-black/10 shadow-sm shadow-gray-400"
            >
              {userRole === "admin" && (
                <Link to="/update" state={{ id: item.book_id }}>
                  <div className="flex justify-end z-10  absolute right-4 top-4 ">
                    <div className="bg-gray-200 p-2 rounded-full ">
                      <FaEdit className="w-5 h-5   " />
                    </div>
                  </div>
                </Link>
              )}
              <img src={Image} className="w-[100%] h-[75%]" />

              <div className="ms-4">
                <div className="font-medium">Title : {item.title}</div>
                <div className="font-medium">Price : {item.price}</div>
                <div className="font-medium">
                  Quantity : {item.stock_quantity}
                </div>

                <div>College : {item.collegeId}</div>
                <div>Course : {item.year}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ItemsList;
