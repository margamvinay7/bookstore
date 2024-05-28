import React, { useEffect, useState } from "react";
import {
  Link,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import html2pdf from "html2pdf.js";
import Image from "../../assets/book.jpg";
import { useGetOrderByIdQuery } from "../../redux/services/ordersApi";
import { FaRupeeSign } from "react-icons/fa";

import { QRCodeCanvas } from "qrcode.react";

import Menu from "../../components/Menu";

const OrderDetails = () => {
  const location = useLocation();
  const [order, setOrder] = useState("");
  const [menu, setMenu] = useState(false);
  const [searchParams] = useSearchParams();
  console.log(location?.state?.id);
  const id = location?.state?.id || searchParams.get("id");
  const { data: orderData } = useGetOrderByIdQuery(id);

  const handleMenu = () => {
    setMenu(!menu);
  };
  console.log(orderData);

  const downloadReceipt = () => {
    const receiptElement = document.getElementById("receipt");

    if (!receiptElement) {
      console.error("Receipt element not found");
      return;
    }

    html2pdf()
      .set({
        margin: 10,
        filename: "receipt.pdf",
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: {
          scale: 2,
          logging: true,
          dpi: 192,
          letterRendering: true,
        },
        jsPDF: {
          unit: "mm",
          format: "a4",
          orientation: "portrait",
          width: 100,
        },
      })
      .from(receiptElement)
      .save();
  };

  useEffect(() => {
    if (orderData) {
      setOrder(orderData);
    }
  }, [orderData]);

  return (
    <div className="min-h-[100vh] p-5 bg-gray-200 flex justify-center    ">
      <div className="bg-white p-5 w-full sm:w-[50%] h-fit md:w-[30%] rounded-md ">
        <div className="flex  items-center justify-between">
          <div className="sm:text-3xl text-2xl font-medium">
            Student Book Store
          </div>
          <Menu menu={menu} handleMenu={handleMenu} />
        </div>
        <hr className="border border-black/20 my-3" />

        {/* mapping of items in cart is start from here */}

        <div
          id="receipt"
          className=" h-[32rem] w-full  rounded-md  p-3 border flex-col border-black/10 shadow-sm shadow-gray-400"
        >
          <img src={Image} className="w-[100%] h-[20%]" />
          <div className="flex justify-center items-center my-2 ">
            <QRCodeCanvas
              size={240}
              value={`http://localhost:9000/updateOrder?id=${order?.order_id}`}
            />
          </div>

          <div className="ms-4">
            <div className="font-medium">{order?.book_details?.title}</div>
            <div className="font-medium flex flex-row items-center">
              {" "}
              <FaRupeeSign
                style={{
                  width: 12,
                  height: 12,
                }}
              />{" "}
              {order?.book_details?.price}
            </div>
            <span>{order?.book_details?.college}</span> |{" "}
            <span>{order?.book_details?.year}</span> |{" "}
            <span>{order?.book_details?.academicyear}</span>
            <div className="font-medium">{order?.status}</div>
          </div>
          <div className="flex justify-center">
            <button
              onClick={() => downloadReceipt()}
              className="bg-[rgb(58,36,74)] p-2 text-white rounded-md"
            >
              Download Receipt
            </button>
          </div>
        </div>

        {/* mapping of items in cart end here */}
      </div>
    </div>
  );
};

export default OrderDetails;
