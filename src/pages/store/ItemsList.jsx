import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import { useGetBooksQuery } from "../../redux/services/booksApi";
import StoreMenu from "../../components/StoreMenu";

const ItemsList = () => {
  const items = ["", "", "", ""];
  const [books, setBooks] = useState();
  const [menu, setMenu] = useState(false);

  const handleMenu = () => {
    setMenu(!menu);
  };
  const { data: booksData } = useGetBooksQuery();
  console.log(books);
  useEffect(() => {
    setBooks(booksData);
  }, [booksData]);
  return (
    <div className="bg-gray-200 p-3">
      <div className="bg-white p-2 min-h-[calc(100vh-24px)]">
        <table className=" table-auto min-w-full ">
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
        </table>
      </div>
    </div>
  );
};

export default ItemsList;
