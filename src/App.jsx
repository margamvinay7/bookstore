import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import SignUp from "./pages/customer/SignUp";
import SignIn from "./pages/customer/SignIn";
import EmailVerification from "./pages/customer/emailVerification/EmailVerification";
import QRCodeGenerator from "./pages/customer/QRCodeGenerator";
import Cart from "./pages/customer/Cart";
import Home from "./pages/customer/Home";
import Profile from "./pages/customer/Profile";
import Logout from "./pages/customer/Logout";
import Book from "./pages/customer/Book";
import Order from "./pages/customer/Order";
import Store from "./pages/store/Store";
import Orders from "./pages/store/Orders";
import OrderDetails from "./pages/customer/OrderDetails";
import AddBook from "./pages/store/AddBook";

import ItemsList from "./pages/store/ItemsList";
import { useSelector } from "react-redux";
import AddUser from "./pages/store/AddUser";
import UpdateOrder from "./pages/store/UpdateOrder";
import QrCodeScanner from "./pages/store/QrCodeScanner";
import StudentDetails from "./pages/customer/StudentDetails";
import AddKit from "./pages/store/AddKit";
import UpdateKit from "./pages/store/UpdateKit";
import AddCollege from "./pages/store/AddCollege";
import College from "./pages/customer/College";
import UpdateBook from "./pages/store/UpdateBook";
import AddItem from "./pages/store/AddItem";
import UpdateItem from "./pages/store/UpdateItem";

const App = () => {
  const location = useLocation();
  console.log(location);
  const auth = localStorage.getItem("auth");
  const role =
    useSelector((state) => state.user.role) || localStorage.getItem("role");
  const navigate = useNavigate();
  console.log(auth);

  useEffect(() => {
    if (auth === null || auth === "" || auth === undefined || !role) {
      navigate("/signIn");
    }
    // else if (role === "admin") {
    //   // navigate("/store");
    // } else if (role === "store") {
    //   // navigate("/store");
    // } else if (role === "student") {
    //   // navigate("/");
    // }
  }, [auth, role]);
  return (
    <>
      <Routes>
        {auth !== undefined && auth ? (
          <>
            <Route path="/Logout" element={<Logout />} />
            {role === "admin" && (
              <>
                <Route path="/addbook" element={<AddBook />} />
                <Route path="/addItem" element={<AddItem />} />
                <Route path="/addStoreKeeper" element={<AddUser />} />
              </>
            )}
            {(role === "admin" || role === "store") && (
              <>
                <Route path="/store" element={<Store />} />
                <Route path="/storeOrders" element={<Orders />} />
                <Route path="/update" element={<UpdateBook />} />
                <Route path="/updateItem" element={<UpdateItem />} />
                <Route path="/itemsList" element={<ItemsList />} />
                <Route path="/updateOrder" element={<UpdateOrder />} />
                <Route path="/addkit" element={<AddKit />} />
                <Route path="/updateKit" element={<UpdateKit />} />
                <Route path="/addcollege" element={<AddCollege />} />
                <Route path="/scanner" element={<QrCodeScanner />} />
              </>
            )}
            {role === "student" && (
              <>
                <Route path="/profile" element={<Profile />} />
                <Route path="/book" element={<Book />} />
                <Route path="/orders" element={<Order />} />
                <Route path="/" element={<Home />} />
                <Route path="/orderDetails" element={<OrderDetails />} />
                <Route path="/college" element={<College />} />

                <Route path="/cart" element={<Cart />} />
              </>
            )}
          </>
        ) : (
          <>
            <Route path="/signIn" element={<SignIn />} />
            <Route path="/signUp" element={<SignUp />} />
            <Route path="/studentDetails" element={<StudentDetails />} />
            <Route path="/emailVerification" element={<EmailVerification />} />
          </>
        )}
      </Routes>
    </>
  );
};

export default App;
