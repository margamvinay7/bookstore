import React from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { Link, useLocation } from "react-router-dom";

const StoreMenu = ({ menu, handleMenu }) => {
  const path = useLocation().pathname;
  console.log(path);
  const css = path === "/book" ? "" : "md:hidden";
  return (
    <div className={`${css}  relative`} onClick={handleMenu}>
      <GiHamburgerMenu className="w-7 h-7 text-black" />
      {menu && (
        <div
          className="min-w-28 h-fit rounded-md flex flex-col items-center  p-2 py-5 bg-white border border-gray-300 shadow-md shadow-black/50 absolute top-50 right-0"
          style={{ zIndex: 1 }}
        >
          {path !== "/store" && (
            <Link to="/store" className="link">
              Store
            </Link>
          )}
          {path !== "/itemsList" && (
            <Link to="/itemsList" className="link">
              <span className=" text-nowrap">Item List</span>
            </Link>
          )}
          {path !== "/addItem" && (
            <Link to="/addItem" className="link">
              <span className=" text-nowrap">Add Item</span>
            </Link>
          )}

          {path !== "/storeOrders" && (
            <Link to="/storeOrders" className="link">
              Orders
            </Link>
          )}
          {path !== "/logout" && (
            <Link to="/Logout" className="link">
              Logout
            </Link>
          )}
        </div>
      )}
    </div>
  );
};

export default StoreMenu;
