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
import { useGetStudentQuery } from "../../redux/services/authApi";

const CartList = ({ item }) => {
  const [quantity, setQuantity] = useState(item?.quantity);
  const [student, setStudent] = useState();

  const incrementQuantity = () => {
    setQuantity(quantity + 1);
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };
  console.log("hi here", item, "here");
  const savedEmail = localStorage.getItem("email");
  const { data: studentData } = useGetStudentQuery(savedEmail);
  console.log("student", student, studentData);
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

  const handleBuyNow = async () => {
    try {
      window.location.replace(
        `http://localhost:9000/api/pay.php?bookId=${item?.kitId}&studentId=${savedEmail}&amount=${item?.kit_details?.price}&name=${student?.full_name}&book=${item?.kit_details?.title}&college=${item?.kit_details?.collegeId}`
      );

      console.log(response);
    } catch (error) {
      console.log("err", error);
    }
  };

  function copyFunction() {
    // Get the text to be copied (use the text field if available)
    var textToCopy = document.getElementById("copyText")
      ? document.getElementById("copyText").value
      : window.getSelection().toString();

    // Check for Clipboard API support
    if (navigator.clipboard) {
      navigator.clipboard.writeText(textToCopy).then(
        function () {
          console.log("Copied to clipboard successfully!");
        },
        function (err) {
          console.error("Failed to copy to clipboard: ", err);
        }
      );
    } else {
      // For older browsers without Clipboard API
      var textArea = document.createElement("textarea");
      textArea.value = textToCopy;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
      console.log("Copied to clipboard (fallback method)");
    }

    // Optional: Alert the user about successful copy
    alert("Text copied to clipboard!");
  }

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

  useEffect(() => {
    if (studentData) {
      setStudent(studentData[0]);
    }
  }, [studentData]);

  return (
    <div>
      <div
        id="items-list"
        className=" h-56 md:h-64 flex  p-3 border border-black/10 shadow-sm shadow-gray-400"
      >
        <img
          src={`data:image/jpg;charset=utf8;base64,${item?.kit_details?.image}`}
          className="min-w-[50%] max-w-[50%] md:min-w-[40%] md:max-w-[40%] h-[100%]"
        />

        <div className="ms-4 w-full ">
          <div className=" flex flex-col sm:flex sm:flex-row   justify-between w-full items-start">
            <div>
              <div className="font-medium text-sm sm:text-base ">
                {item?.kit_details?.title}
              </div>
              {item?.kit_details?.stock_quantity > 10 ? (
                <div className="text-xs text-green-600">In Stock</div>
              ) : (
                <div className="text-xs text-red-600">{`only ${item?.kit_details?.stock_quantity} stocks left`}</div>
              )}
              <div className="text-sm">{item?.kit_details?.collegeId}</div>
              <div className="text-sm">{item?.kit_details?.courseyear}</div>
            </div>

            <div className="font-medium text-lg flex items-center">
              <FaRupeeSign
                style={{
                  width: 12,
                  height: 12,
                }}
              />
              {item?.kit_details?.price}
            </div>
          </div>
          <div className="flex-col flex gap-y-2   p-0 ">
            {/* <div
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
            </div> */}

            <div
              className="text-sm flex items-center w-28 gap-x-2 mt-2 cursor-pointer border border-[#D72638] p-1 hover:bg-red-600 hover:text-white rounded-md"
              onClick={() => handleDelete(item?.cart_id)}
            >
              <FaTrashCan /> Delete Item
            </div>
            <Link>
              <div
                onClick={handleBuyNow}
                className="text-center flex w-28  justify-center cursor-pointer bg-[rgb(58,36,74)] p-1 text-white rounded-md"
              >
                Buy Now
              </div>
            </Link>
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
    <div className="min-h-[100vh] sm:p-5 p-2 bg-gray-200 flex justify-center ">
      <div className="bg-white sm:p-5 rounded-md  p-3 w-full md:w-[60%] ">
        <div className="flex flex-row items-center justify-between">
          <div className="text-3xl font-medium">Cart</div>
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
      {/* <div className="p-5  bg-white sm:ms-4 rounded-md   md:w-[25%] h-fit ">
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
      </div> */}
    </div>
  );
};

export default Cart;
