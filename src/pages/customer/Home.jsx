import React, { useState, useEffect } from "react";
import { useGetBooksQuery } from "../../redux/services/booksApi";
import Image from "../../assets/book.jpg";
import { FiSearch } from "react-icons/fi";
import { Link } from "react-router-dom";
import Menu from "../../components/Menu";

const Home = () => {
  const [searchList, setSearchList] = useState([]);
  const [books, setBooks] = useState([]);
  const [menu, setMenu] = useState(false);
  const { data: booksData } = useGetBooksQuery();
  console.log(booksData);
  const handleMenu = () => {
    setMenu(!menu);
  };

  const handleSearch = (e) => {
    console.log("in serach");
    const serachResults = books.filter((item) => {
      return (
        item.title.toLowerCase().includes(e.target.value) ||
        item.college.toLowerCase().includes(e.target.value.toLowerCase()) ||
        item.price.toLowerCase().includes(e.target.value.toLowerCase()) ||
        item.academicyear.includes(e.target.value) ||
        item.year.toLowerCase().includes(e.target.value.toLowerCase())
      );
    });
    setSearchList(serachResults);
  };
  useEffect(() => {
    setBooks(booksData);
    setSearchList(booksData);
  }, [booksData]);
  return (
    <div className="min-h-[100vh] p-5 bg-gray-200   ">
      <div className="bg-white p-5 rounded-md ">
        <div className="flex  items-center justify-between">
          <div className="sm:text-3xl text-2xl font-medium">
            Student Book Store
          </div>
          <div className="sm:flex hidden flex-row gap-x-5">
            <div className="flex items-center bg-white pe-2 gap-x-1 rounded-md">
              <input
                onChange={handleSearch}
                className="w-[25vw] bg-gray-200 outline-none rounded-md text-black ps-2 p-1  placeholder-slate-600"
                placeholder="Search Student"
              />
              <FiSearch
                style={{
                  color: "black",

                  height: 25,
                  width: 25,
                }}
              />
            </div>
            <div className="hover:bg-blue-100 hidden md:block p-1 px-2 rounded-md">
              <Link to="/cart">Cart</Link>
            </div>
            <div className="hover:bg-blue-100 hidden md:block p-1 px-2 rounded-md">
              <Link to="/orders">Orders</Link>
            </div>
            <div className="hover:bg-blue-100 hidden md:block p-1 px-2 rounded-md">
              <Link to="/logout">Logout</Link>
            </div>
          </div>
          <Menu menu={menu} handleMenu={handleMenu} />
        </div>
        <hr className="border border-black/20 my-3" />
        <div className="flex mb-3 sm:hidden items-center bg-white w-full  gap-x-2 rounded-md">
          <input
            onChange={handleSearch}
            className="w-[90%] bg-gray-200 outline-none rounded-md text-black ps-2 p-1  placeholder-slate-600"
            placeholder="Search Student"
          />
          <FiSearch
            style={{
              color: "black",

              height: 25,
              width: 25,
            }}
          />
        </div>
        {/* mapping of items in cart is start from here */}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
          {searchList?.map((item) => (
            <Link to="/book" state={{ item: item }}>
              <div
                id="items-list"
                className=" h-[30rem] w-full  rounded-md  p-3 border flex-col border-black/10 shadow-sm shadow-gray-400"
              >
                <img src={Image} className="w-[100%] h-[75%]" />

                <div className="ms-4">
                  <div className="font-medium">{item.title}</div>

                  <div>{item.college}</div>
                  <div>{item.year}</div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* mapping of items in cart end here */}
      </div>
    </div>
  );
};

export default Home;
