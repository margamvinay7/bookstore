import React from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { Link, useLocation } from "react-router-dom";

const Menu = ({ menu, handleMenu }) => {
  const path = useLocation().pathname;
  console.log(path);
  const css = path === "/book" ? "" : "md:hidden";
  return (
    <div className={`${css}  relative`} onClick={handleMenu}>
      <GiHamburgerMenu className="w-7 h-7 text-black" />
      {menu && (
        <div
          className="w-28 h-fit rounded-md flex flex-col items-center  p-2 py-5 bg-white border border-gray-300 shadow-md shadow-black/50 absolute top-50 right-0"
          style={{ zIndex: 1 }}
        >
          {path !== "/" && (
            <div className="link">
              <Link to="/"> Home</Link>
            </div>
          )}
          {path !== "/cart" && (
            <Link to="/cart" className="link">
              Cart
            </Link>
          )}

          {path !== "/orders" && (
            <Link to="/orders" className="link">
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

export default Menu;
