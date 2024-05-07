import React, { useState, useEffect } from "react";
import Image from "../../assets/book.jpg";
import { FaRupeeSign } from "react-icons/fa";
import { FaTrashCan } from "react-icons/fa6";
import {
  useGetCartByIdQuery,
  useDeleteMutation,
  useUpdateMutation,
} from "../../redux/services/cartApi";
import { Link } from "react-router-dom";
import Menu from "../../components/Menu";

const CartList = ({ item }) => {
  const [quantity, setQuantity] = useState(item?.quantity);

  const incrementQuantity = () => {
    setQuantity(quantity + 1);
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const [deleteCart] = useDeleteMutation();
  const [updateCart] = useUpdateMutation();

  const handleDelete = async (id) => {
    console.log(id);
    try {
      const response = await deleteCart({ cartId: id });
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const handleQuantity = async (e) => {
    let updateQuantity = "";
    if (e.target.id === "increment") {
      updateQuantity = quantity + 1;
    } else {
      if (quantity > 1) {
        updateQuantity = quantity - 1;
      }
    }
    console.log("update");
    try {
      const response = await updateCart({
        cartId: item?.cart_id,
        quantity: updateQuantity,
      });
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div
        id="items-list"
        className=" h-56 md:h-64 flex  p-3 border border-black/10 shadow-sm shadow-gray-400"
      >
        <img
          src={Image}
          className="min-w-[50%] max-w-[50%] md:min-w-[40%] md:max-w-[40%] h-[100%]"
        />

        <div className="ms-4">
          <div className="font-medium text-sm sm:text-base ">
            {item?.book_details?.title}
          </div>
          {item?.book_details?.stock_quantity > 10 ? (
            <div className="text-xs text-green-600">In Stock</div>
          ) : (
            <div className="text-xs text-red-600">{`only ${item?.book_details?.stock_quantity} stocks left`}</div>
          )}
          <div className="text-sm">{item?.book_details?.college}</div>
          <div className="text-sm">{item?.book_details?.year}</div>

          <div className="font-medium text-lg flex items-center">
            <FaRupeeSign
              style={{
                width: 12,
                height: 12,
              }}
            />
            {item?.book_details?.price}
          </div>
          <div className="flex-col  items-center p-0 ">
            <div
              className="border border-[rgb(58,36,74)] rounded-md flex items-center justify-between"
              onClick={(e) => handleQuantity(e)}
            >
              <button
                id="decrement"
                onClick={decrementQuantity}
                className="bg-gray-200 w-7 rounded-s-md text-xl h-full text-center"
              >
                -
              </button>
              <input
                type="text"
                value={quantity}
                className="w-8 h-full text-center outline-none cursor-none"
                // onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
              />

              <button
                id="increment"
                onClick={incrementQuantity}
                className="bg-gray-200 w-7 rounded-e-md text-xl m-0 p-0 h-full text-center"
              >
                +
              </button>
            </div>

            <div
              className="text-sm flex items-center gap-x-2 mt-2 cursor-pointer border border-[#D72638] p-1 hover:bg-red-600 hover:text-white rounded-md"
              onClick={() => handleDelete(item?.cart_id)}
            >
              <FaTrashCan /> Delete Item
            </div>
          </div>
        </div>
      </div>
      <hr className="border border-black/20 my-3" />
    </div>
  );
};

const Cart = () => {
  // const [searchList, setSearchList] = useState([]);
  const [cart, setCart] = useState([]);
  const [menu, setMenu] = useState(false);

  const savedEmail = localStorage.getItem("email");

  const { data: cartData } = useGetCartByIdQuery(savedEmail);
  console.log(cartData);

  const getTotalAmount = () => {
    let totalAmount = 0;
    cart.map((item) => {
      totalAmount += Number(item?.book_details?.price);
    });
    return totalAmount;
  };

  const handleMenu = () => {
    setMenu(!menu);
  };
  // const handleSearch = (e) => {
  //   console.log("in serach");
  //   const serachResults = cart?.filter((item) => {
  //     return (
  //       item.title.toLowerCase().includes(e.target.value) ||
  //       item.college.toLowerCase().includes(e.target.value.toLowerCase()) ||
  //       item.price.toLowerCase().includes(e.target.value.toLowerCase()) ||
  //       item.academicyear.includes(e.target.value) ||
  //       item.year.toLowerCase().includes(e.target.value.toLowerCase())
  //     );
  //   });
  //   setSearchList(serachResults);
  // };
  useEffect(() => {
    if (cartData) {
      setCart(cartData);
      // setSearchList(cartData);
    }
  }, [cartData]);

  return (
    <div className="min-h-[100vh] sm:p-5 p-2 bg-gray-200 flex flex-col-reverse justify-end  md:justify-end sm:flex-row  ">
      <div className="bg-white sm:p-5 rounded-md  p-3 sm:w-[75%] md:w-[60%] ">
        <div className="flex flex-row items-center justify-between">
          <div className="text-3xl font-medium">Student Book Store</div>
          <div className="sm:flex hidden flex-row gap-x-5">
            <div className="hover:bg-blue-100 hidden md:block p-1 px-2 rounded-md">
              <Link to="/">Home</Link>
            </div>
            <div className="hover:bg-blue-100 hidden md:block p-1 px-2 rounded-md">
              <Link to="/Orders">Orders</Link>
            </div>
            <div className="hover:bg-blue-100 hidden md:block p-1 px-2 rounded-md">
              <Link to="/logout">Logout</Link>
            </div>
          </div>
          <Menu menu={menu} handleMenu={handleMenu} />
        </div>
        <hr className="border border-black/20 my-3" />
        {/* mapping of items in cart is start from here */}
        {cart?.map((item) => (
          <CartList item={item} />
        ))}

        {/* mapping of items in cart end here */}
      </div>
      <hr className="border border-black/20 my-3 sm:hidden" />
      <div className="p-5  bg-white sm:ms-4 rounded-md   md:w-[25%] h-fit ">
        <div className="flex text-xl justify-between font-medium mb-5">
          Subtotal ({cart.length} items):
          <div className="font-medium text-lg flex items-center">
            <FaRupeeSign
              style={{
                width: 12,
                height: 12,
              }}
            />
            {getTotalAmount()}
          </div>
        </div>
        <button className="bg-[rgb(58,36,74)] text-center w-full text-white p-2  rounded-md">
          Proceed to buy
        </button>
      </div>
    </div>
  );
};

export default Cart;
