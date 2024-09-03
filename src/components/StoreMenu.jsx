import React from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
const StoreMenu = ({ menu, handleMenu }) => {
  const path = useLocation().pathname;
  const role =
    useSelector((state) => state.user.role) || localStorage.getItem("role");

  console.log(path);
  // const css = path === "/book" ? "" : "md:hidden";
  return (
    <div className={` relative z-20`} onClick={handleMenu}>
      <GiHamburgerMenu className="w-7 h-7 text-black" />
      {menu && (
        <div
          className="min-w-36 h-fit rounded-md flex flex-col items-center  p-2 py-5 bg-white border border-gray-300 shadow-md shadow-black/50 absolute top-50 right-0"
          style={{ zIndex: 1 }}
        >
          {path !== "/store" && (
            <Link to="/store" className="link">
              Store
            </Link>
          )}
          {path !== "/itemsList" && (
            <Link to="/itemsList" className="link">
              <span className=" text-nowrap">Book List</span>
            </Link>
          )}
          {path !== "/itemList" && (
            <Link to="/itemList" className="link">
              <span className=" text-nowrap">Item List</span>
            </Link>
          )}
          {path !== "/addbook" && role === "admin" && (
            <Link to="/addbook" className="link">
              <span className=" text-nowrap">Add Book</span>
            </Link>
          )}
          {path !== "/addItem" && role === "admin" && (
            <Link to="/addItem" className="link">
              <span className=" text-nowrap">Add Item</span>
            </Link>
          )}
          {path !== "/addStoreKeeper" && role === "admin" && (
            <Link to="/addStoreKeeper" className="link">
              <span className=" text-nowrap">Add User</span>
            </Link>
          )}

          {path !== "/storeOrders" && (
            <Link to="/storeOrders" className="link">
              Orders
            </Link>
          )}
          {path !== "/OrdersIssued" && (
            <Link to="/OrdersIssued" className="link">
              Issued
            </Link>
          )}
          {path !== "/addKit" && role === "admin" && (
            <Link to="/addKit" className="link">
              Add Kit
            </Link>
          )}
          {path !== "/addcollege" && role === "admin" && (
            <Link to="/addcollege" className="link">
              Add College
            </Link>
          )}
          {/* {path !== "/UpdateOrder" && (
            <Link to="/UpdateOrder?id=1" className="link">
              Update Order
            </Link>
          )} */}
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
