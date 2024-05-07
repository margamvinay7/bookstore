import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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

import AddItem from "./pages/store/AddItem";
import UpdateItem from "./pages/store/UpdateItem";
import ItemsList from "./pages/store/ItemsList";

const App = () => {
  const auth = localStorage.getItem("auth");
  const navigate = useNavigate();
  console.log(auth);

  useEffect(() => {
    if (auth === null || auth === "") {
      navigate("/signIn");
    }
  }, [auth]);
  return (
    <>
      <Routes>
        {auth ? (
          <>
            <Route path="/Logout" element={<Logout />} />
            <Route path="/emailVerification" element={<EmailVerification />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/book" element={<Book />} />
            <Route path="/orders" element={<Order />} />
            <Route path="/" element={<Home />} />
            <Route path="/store" element={<Store />} />
            <Route path="/storeOrders" element={<Orders />} />
            <Route path="/update" element={<UpdateItem />} />
            <Route path="/addItem" element={<AddItem />} />
            <Route path="/itemsList" element={<ItemsList />} />
          </>
        ) : (
          <>
            <Route path="/signIn" element={<SignIn />} />
            <Route path="/signUp" element={<SignUp />} />
          </>
        )}
      </Routes>
    </>
  );
};

export default App;
