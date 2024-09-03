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
import { FaInfoCircle } from "react-icons/fa";

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
      <div className="bg-white p-5 w-full sm:w-[60%] h-fit md:w-[30%] rounded-md ">
        <div className="flex  items-center justify-between">
          <div className="sm:text-3xl text-2xl font-medium">Order Details</div>
          <Menu menu={menu} handleMenu={handleMenu} />
        </div>
        <hr className="border border-black/20 my-3" />

        {/* mapping of items in cart is start from here */}

        <div className="min-h-[32rem] w-full  rounded-md  p-3 border flex-col border-black/10 shadow-sm shadow-gray-400">
          <div id="receipt">
            <div className="border border-gray-300 p-2 rounded-md text-orange-500">
              <div className="flex  items-center gap-x-2 text-orange-500">
                <FaInfoCircle className="w-5 h-5 text-orange-500" /> Note :
              </div>
              Please collect the books from College Store
            </div>
            {/* <img src={Image} className="w-[100%] h-[20%]" /> */}
            <div className="flex justify-center items-center my-2 ">
              <QRCodeCanvas
                size={240}
                value={`http://localhost:9000/updateOrder?id=${order?.order_id}`}
              />
            </div>

            <div className="ms-4">
              <div className="font-medium">{order?.kit_details?.title}</div>
              <div className="font-medium flex flex-row items-center">
                {" "}
                <FaRupeeSign
                  style={{
                    width: 12,
                    height: 12,
                  }}
                />{" "}
                {order?.kit_details?.price}
              </div>
              <span>{order?.kit_details?.collegeId}</span> |{" "}
              <span>{order?.kit_details?.courseyear}</span> |{" "}
              <span>{order?.kit_details?.academicyear}</span>
            </div>
            <div className="font-medium ">Ordered By : {order?.student_id}</div>
            <div className="font-medium ">
              Transaction Id : {order?.transactionId}
            </div>
            <div className="font-medium ">
              Order Date &nbsp;: {order?.order_date?.split(" ")[0]}
            </div>
            {order.created_at !== order.updated_at && (
              <div className="font-medium">
                Issued Data : {order?.updated_at?.split(" ")[0]}
              </div>
            )}
          </div>
          <div className="font-medium mt-2">Order Status : {order?.status}</div>
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
