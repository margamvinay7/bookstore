import React, { useState, useEffect } from "react";
import StoreMenu from "../../components/StoreMenu";
import { Link } from "react-router-dom";

const Store = () => {
  const items = ["", "", "", ""];
  const [menu, setMenu] = useState(false);

  const handleMenu = () => {
    setMenu(!menu);
  };
  return (
    <div className="bg-gray-200 min-h-screen p-3">
      <div className="bg-white  flex flex-col  items-center p-2 rounded-md min-h-[calc(100vh-24px)]">
        <div className=" flex  justify-between items-center w-full mb-5 ">
          <div className="font-medium sedan-sc-regular text-4xl">STORE</div>
          <div className="flex gap-x-2 items-center">
            <StoreMenu menu={menu} handleMenu={handleMenu} />
          </div>
        </div>
        <div className="flex justify-end  w-full my-2">
          {/* <Link to="/update">
            <button className="text-lg bg-[rgb(58,36,74)] text-white p-1 rounded-md hover:bg-[rgb(58,36,114)]">
              Update Item
            </button>
          </Link> */}
          <Link to="/addItem">
            <button className="text-lg bg-[rgb(58,36,74)] text-white p-1 rounded-md hover:bg-[rgb(58,36,114)]">
              Add Item
            </button>
          </Link>
        </div>
        <div className="w-full h-56 border border-black justify-center items-center flex rounded-md">
          QR code scanner
        </div>
        <hr className="border-gray-400 border w-full mt-5" />
        {/* <table className=" table-auto min-w-full ">
          <thead>
            <tr className="border-b-2 border-gray-400 h-9 hover:bg-gray-300 ">
              <td className="font-medium p-2"> Items</td>
              <td className="font-medium">Quantity</td>
              <td className="font-medium">College</td>
            </tr>
          </thead>

          <tbody>
            {items?.map((item) => (
              <tr className="border-b-2 border-gray-400 h-9 hover:bg-gray-300">
                <td className="p-2">Name of the Item</td>
                <td>Quantity</td>
                <td>College</td>
              </tr>
            ))}
          </tbody>
        </table> */}
      </div>
    </div>
  );
};

export default Store;
