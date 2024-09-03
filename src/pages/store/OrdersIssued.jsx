import React, { useState, useEffect } from "react";
import Image from "../../assets/book.jpg";
import { FaMonero, FaRupeeSign } from "react-icons/fa";
import {
  useGetOrdersByStudentIdQuery,
  useGetDeliveredOrdersByDateQuery,
  useGetDeliveredOrdersByMonthYearQuery,
  useGetDeliveredOrdersByDateRangeQuery,
} from "../../redux/services/ordersApi";
import { Link } from "react-router-dom";
import StoreMenu from "../../components/StoreMenu";
import axios from "axios";
import html2pdf from "html2pdf.js";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import Excel from "../../assets/excel.jpg";
import Pdf from "../../assets/pdf.jpg";
import Print from "../../assets/print.jpg";
import * as XLSX from "xlsx";

const OrdersIssued = () => {
  // const [searchList, setSearchList] = useState([]);
  const [orderDataByDate, setOrderDataByDate] = useState([]);
  const [orderDataByRange, setOrderDataByRange] = useState([]);
  const [orderDataByMonth, setOrderDataByMonth] = useState([]);
  const [menu, setMenu] = useState(false);
  const [date, setDate] = useState();
  const [startDate, setStartDate] = useState("");
  const [endDate, setendDate] = useState("");
  const [month, setMonth] = useState("");

  const [dateBtn, setDateBtn] = useState(false);
  const [rangeBtn, setRangeBtn] = useState(false);
  const [monthBtn, setMonthBtn] = useState(false);
  const [collegeValue, setCollegeValue] = useState();
  const [colleges, setColleges] = useState([]);
  const [storedata, setStoreData] = useState({});
  console.log(startDate, endDate);

  const getColleges = async () => {
    try {
      console.log("getcolleges called");
      const response = await axios.get(
        "http://localhost:9000/api/college/getColleges"
      );
      console.log(response.data);
      setColleges(response?.data);
    } catch (error) {
      console.log(error);
    }
  };

  const downloadReceipt = () => {
    const receiptElement = document.getElementById("receipt");

    if (!receiptElement) {
      console.error("Receipt element not found");
      return;
    }

    html2pdf()
      .set({
        margin: [10, 10, 10, 10], // Increased margin to avoid overlapping
        filename: "IssuedOrders.pdf",
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: {
          scale: 2, // Adjusting the scale factor
          logging: true,
          dpi: 192,
          letterRendering: true,
        },
        jsPDF: {
          unit: "mm",
          format: "a4",
          orientation: "portrait",
        },
      })
      .from(receiptElement)
      .save();
  };

  const TableToExcel = ({ tableData }) => {
    const columnHeaders = [
      "Order Id",
      "Student Id",
      "Payment Id",
      "Order Status",
      "Price",
      "College",
      "Kit Id",
      "Kit Name",
    ];

    const exportToExcel = () => {
      const filteredData = tableData.map((row) => ({
        Order_Id: row.order_id,
        Student_Id: row.student_id,
        Payment_Id: row.transactionId,
        Order_Status: row.status,
        Price: row.total_amount,
        College: row.collegeId,
        Kit_Id: row.kitId,
        Kit_Name: row.kit_details?.title,
      }));
      const wb = XLSX.utils.book_new();
      const ws = XLSX.utils.json_to_sheet(filteredData);
      ws["!cols"] = columnHeaders.map(() => ({ wpx: 100 })); // Set column widths
      ws["!cols"].forEach((col, index) => {
        col.wch = Math.max(col.wch || 0, columnHeaders[index].length); // Set column widths based on header length
      });
      ws["!rows"] = [{ hpx: 30 }]; // Set row height for header row
      columnHeaders.forEach((header, index) => {
        const cellRef = XLSX.utils.encode_cell({ r: 0, c: index });
        ws[cellRef] = { v: header, t: "s" }; // Assign new header name
      });
      XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
      const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
      const data = new Blob([excelBuffer], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      const url = window.URL.createObjectURL(data);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "Orders_Issued.xlsx");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    };

    return (
      <img
        src={Excel}
        width={30}
        height={20}
        className="rounded-sm"
        onClick={exportToExcel}
      />
    );
  };

  const printReceipt = () => {
    const receiptElement = document.getElementById("receipt");

    if (!receiptElement) {
      console.error("Receipt element not found");
      return;
    }

    html2canvas(receiptElement, {
      scale: 2, // Adjust the scale factor if needed
      dpi: 192,
      letterRendering: true,
    })
      .then((canvas) => {
        const imgData = canvas.toDataURL("image/jpeg", 0.98);
        const pdf = new jsPDF({
          unit: "mm",
          format: "a4",
          orientation: "portrait",
        });

        const imgProps = pdf.getImageProperties(imgData);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

        pdf.addImage(imgData, "JPEG", 10, 10, pdfWidth - 20, pdfHeight - 20); // Adjust margins if needed

        // Open the PDF in a new window
        const pdfUrl = pdf.output("bloburl");
        const pdfWindow = window.open(pdfUrl);
        pdfWindow.addEventListener("load", () => {
          pdfWindow.print();
        });
      })
      .catch((error) => {
        console.error("Error generating PDF:", error);
      });
  };

  const handleCollege = (e) => {
    console.log(e.target.value);
    if (e.target.value === "All") {
      setCollegeValue(null);
    } else {
      setCollegeValue(e.target.value);
    }
  };

  const {
    data: orderByDateData,
    error: dateError,
    isError: isDateError,
    refetch: refetchOrdersByDate,
  } = useGetDeliveredOrdersByDateQuery({ date: date, college: collegeValue });
  console.log(orderByDateData);
  console.log(isDateError);
  const {
    data: ordersByRangeData,
    isError: isRangeError,
    refetch: refetchOrdersByRange,
  } = useGetDeliveredOrdersByDateRangeQuery({
    startDate: startDate,
    endDate: endDate,
    college: collegeValue,
  });

  const {
    data: ordersByMonthData,
    isError: isMonthError,
    refetch: refetchOrdersByMonth,
  } = useGetDeliveredOrdersByMonthYearQuery({
    month: month?.split("-")[1],
    year: month?.split("-")[0],
    college: collegeValue,
  });

  const savedEmail = localStorage.getItem("email");
  const role = localStorage.getItem("role");

  const getStore = async () => {
    const response = await axios.get(
      `http://localhost:9000/api/auth/getStore?username=${savedEmail}`
    );
    console.log(response?.data[0]);
    storedata(response?.data[0]);
  };

  useEffect(() => {
    setCollegeValue(storedata?.collegeId);
  }, [storedata]);

  useEffect(() => {
    getColleges();
    if (role === "store") {
      getStore();
    }
  }, []);

  const handleMenu = () => {
    setMenu(!menu);
  };

  const handleDateChange = (e) => {
    const selectedDate = e.target.value;
    setDate(selectedDate);
    console.log("Selected Date:", selectedDate);
    // Refetch data when date changes
  };

  // const handleRangeChange = (e) => {
  //   let startDateChanged = startDate;
  //   let endDateChanged = endDate;
  //   if (e.target.id === "fromInput") {
  //     startDateChanged = e.target.value;
  //     setStartDate(e.target.value);
  //   }
  //   if (e.target.id === "toInput") {
  //     endDateChanged = e.target.value;
  //     setendDate(e.target.value);
  //   }

  //   // if (startDateChanged !== "" && endDateChanged !== "") {

  //   // }
  // };
  console.log(dateError);
  useEffect(() => {
    refetchOrdersByDate({ date: date, college: collegeValue });
  }, [date]);

  // const handleMonthChange = (e) => {
  //   const selectedMonth = e.target.value;
  //   setMonth(selectedMonth);
  //   // Refetch data when month changes
  // };

  useEffect(() => {
    refetchOrdersByMonth({
      month: month?.split("-")[1],
      year: month?.split("-")[0],
      college: collegeValue,
    });
  }, [month]);

  useEffect(() => {
    refetchOrdersByRange({
      startDate: startDate,
      endDate: endDate,
      college: collegeValue,
    });
  }, [startDate, endDate]);

  const handleBtn = (e) => {
    if (e.target.id === "dateId") {
      setDateBtn(!dateBtn);
      setMonthBtn(false);
      setRangeBtn(false);
    }
    if (e.target.id === "monthId") {
      setMonthBtn(!monthBtn);
      setDateBtn(false);
      setRangeBtn(false);
    }
    if (e.target.id === "rangeId") {
      setRangeBtn(!rangeBtn);
      setDateBtn(false);
      setMonthBtn(false);
    }
  };

  useEffect(() => {
    if (orderByDateData) {
      console.log("changed 1");
      setOrderDataByDate(orderByDateData);
    }
  }, [orderByDateData]);
  useEffect(() => {
    if (ordersByRangeData) {
      console.log("changed 2");
      setOrderDataByRange(ordersByRangeData);
    }
  }, [ordersByRangeData]);
  useEffect(() => {
    if (ordersByMonthData) {
      console.log("changed 3");
      setOrderDataByMonth(ordersByMonthData);
    }
  }, [ordersByMonthData]);
  const arrayItems = [1, 2, 3, 4, 5];
  return (
    <div className="min-h-[100vh]  sm:p-5 p-2 bg-gray-200 flex flex-col-reverse justify-end  sm:justify-center  sm:flex-row   ">
      <div className="bg-white sm:p-5 rounded-md  p-3 w-full  ">
        <div className="flex flex-row items-center justify-between">
          <div className="text-3xl font-medium">Order Issued</div>

          <StoreMenu menu={menu} handleMenu={handleMenu} />
        </div>
        <hr className="border border-black/20 my-3" />
        <div>
          <div className="flex justify-around">
            <button
              id="dateId"
              className="border border-gray-400 p-1 rounded-md text-sm sm:text-base"
              onClick={(e) => handleBtn(e)}
            >
              Select Date
            </button>
            <button
              id="rangeId"
              className="border border-gray-400 p-1 rounded-md text-sm sm:text-base"
              onClick={(e) => handleBtn(e)}
            >
              Select Custom Range
            </button>
            <button
              id="monthId"
              className="border border-gray-400 p-1 rounded-md text-sm sm:text-base"
              onClick={(e) => handleBtn(e)}
            >
              Select Month
            </button>
          </div>
          <div className="mt-2 flex  justify-between items-center">
            {dateBtn && (
              <div className="flex flex-col w-36 sm:w-48">
                <label htmlFor="dateInput" className="text-sm sm:text-base">
                  Select Date
                </label>
                <input
                  id="dateInput"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  type="date"
                  className=" border border-gray-300 p-1 rounded-md "
                />
              </div>
            )}
            {rangeBtn && (
              <div className="flex flex-col ">
                <div className="flex flex-col gap-y-1 mb-1 w-36 sm:w-48">
                  <label htmlFor="fromInput" className="text-sm sm:text-base">
                    From
                  </label>
                  <input
                    id="fromInput"
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className=" border border-gray-300 p-1 rounded-md "
                  />
                </div>
                <div className="flex flex-col gap-y-1 mb-1 w-36 sm:w-48">
                  <label htmlFor="toInput" className="text-sm sm:text-base">
                    To
                  </label>
                  <input
                    onChange={(e) => setendDate(e.target.value)}
                    id="toInput"
                    value={endDate}
                    type="date"
                    className=" border border-gray-300 p-1 rounded-md "
                  />
                </div>
              </div>
            )}
            {monthBtn && (
              <div className="flex flex-col gap-y-1 w-36 sm:w-48">
                <label htmlFor="dateInput" className="text-sm sm:text-base">
                  Select Month
                </label>
                <input
                  id="dateInput"
                  type="month"
                  value={month}
                  onChange={(e) => setMonth(e.target.value)}
                  className=" border border-gray-300 p-1 rounded-md"
                />
              </div>
            )}

            <div className="flex">
              <div
                className="border border-gray-300 cursor-pointer p-1 rounded-md"
                onClick={downloadReceipt}
              >
                <img src={Pdf} width={30} height={20} className="rounded-sm" />
              </div>
              <div
                className="border border-gray-300 cursor-pointer p-1 rounded-md"
                onClick={printReceipt}
              >
                <img
                  src={Print}
                  width={30}
                  height={20}
                  className="rounded-sm"
                />
              </div>
              <div className="border border-gray-300 cursor-pointer p-1 rounded-md">
                {dateBtn && !isDateError && (
                  <TableToExcel tableData={orderDataByDate} />
                )}
                {rangeBtn && !isRangeError && (
                  <TableToExcel tableData={orderDataByRange} />
                )}
                {monthBtn && !isMonthError && (
                  <TableToExcel tableData={orderDataByMonth} />
                )}
              </div>
            </div>
            {role !== "store" && (
              <div>
                <div className="text-sm sm:text-base">Select College</div>
                <select
                  onChange={handleCollege}
                  className="border border-gray-300 drop-shadow-2xl p-1 rounded-md w-36 sm:w-48 "
                >
                  <option>Select College</option>
                  <option>All</option>
                  {colleges?.map((item) => (
                    <option value={item?.name}>{item?.name}</option>
                  ))}
                </select>
              </div>
            )}
          </div>
        </div>
        <hr className="border border-black/20 my-3" />
        {/* mapping of items in cart is start from here */}
        {dateBtn && !isDateError && (
          <div className="" id="receipt">
            <div className="flex justify-between mb-2">
              <div>Orders Issued</div>
              <div>Date :{date}</div>
            </div>
            <table className="w-full  border   text-xs border-black ">
              <thead>
                <tr className="border border-black">
                  <th className="text-nowrap border border-black text-left font-normal p-1 ps-2 py-2">
                    Order Id
                  </th>
                  <th className="text-nowrap border  border-black text-left font-normal p-1 ps-2">
                    Student Id
                  </th>
                  <th className="text-nowrap border border-black text-left font-normal p-1 ps-2">
                    Payment Id
                  </th>
                  <th className="text-nowrap border  border-black text-left font-normal p-1 ps-2">
                    Order Status
                  </th>
                  <th className="text-nowrap border border-black text-left font-normal p-1 ps-2">
                    Price
                  </th>
                  <th className="text-nowrap border border-black text-left font-normal p-1 ps-2">
                    College
                  </th>
                  <th className="text-nowrap border border-black text-left font-normal p-1 ps-2">
                    Kit Id
                  </th>
                  <th className="text-nowrap border border-black text-left font-normal p-1 ps-2">
                    Kit Name
                  </th>
                </tr>
              </thead>
              <tbody>
                {orderDataByDate?.map((item) => (
                  <tr className="border border-black">
                    <td className="border border-black p-1 ps-2 py-2">
                      {item?.order_id}
                    </td>
                    <td className="border border-black p-1 ps-2">
                      {item?.student_id}
                    </td>
                    <td className="border border-black p-1 ps-2">
                      {item?.transactionId}
                    </td>
                    <td className="border border-black p-1 ps-2">
                      {item?.status}
                    </td>
                    <td className="border border-black p-1 ps-2">
                      {item?.total_amount}
                    </td>
                    <td className="border border-black p-1 ps-2">
                      {item?.collegeId}
                    </td>
                    <td className="border border-black p-1 ps-2">
                      {item?.kitId}
                    </td>
                    <td className="border border-black p-1 ps-2">
                      {item?.kit_details?.title}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        {rangeBtn && !isRangeError && (
          <div className=" " id="receipt">
            <div className="flex justify-between mb-2">
              <div>Orders Issued</div>
              <div>
                <div>Start Date : {startDate}</div>
                <div>End Date &nbsp;&nbsp;: {endDate}</div>
              </div>
            </div>
            <table className="w-full table-auto border text-xs border-black ">
              <thead>
                <tr className="border border-black">
                  <th className="text-nowrap border border-black text-left font-normal p-1 ps-2 py-2">
                    Order Id
                  </th>
                  <th className="text-nowrap border  border-black text-left font-normal p-1 ps-2">
                    Student Id
                  </th>
                  <th className="text-nowrap border border-black text-left font-normal p-1 ps-2">
                    Payment Id
                  </th>
                  <th className="text-nowrap border  border-black text-left font-normal p-1 ps-2">
                    Order Status
                  </th>
                  <th className="text-nowrap border border-black text-left font-normal p-1 ps-2">
                    Price
                  </th>
                  <th className="text-nowrap border border-black text-left font-normal p-1 ps-2">
                    College
                  </th>
                  <th className="text-nowrap border border-black text-left font-normal p-1 ps-2">
                    Kit Id
                  </th>
                  <th className="text-nowrap border border-black text-left font-normal p-1 ps-2">
                    Kit Name
                  </th>
                </tr>
              </thead>
              <tbody>
                {orderDataByRange?.map((item) => (
                  <tr className="border border-black">
                    <td className="border border-black p-1 ps-2 py-2">
                      {item?.order_id}
                    </td>
                    <td className="border border-black p-1 ps-2">
                      {item?.student_id}
                    </td>
                    <td className="border border-black p-1 ps-2">
                      {item?.transactionId}
                    </td>
                    <td className="border border-black p-1 ps-2">
                      {item?.status}
                    </td>
                    <td className="border border-black p-1 ps-2">
                      {item?.total_amount}
                    </td>
                    <td className="border border-black p-1 ps-2">
                      {item?.collegeId}
                    </td>
                    <td className="border border-black p-1 ps-2">
                      {item?.kitId}
                    </td>
                    <td className="border border-black p-1 ps-2">
                      {item?.kit_details?.title}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        {monthBtn && !isMonthError && (
          <div className=" " id="receipt">
            <div className="flex justify-between mb-2">
              <div>Orders Issued</div>
              <div>
                Month & Year : {month?.split("-")[1]}-{month?.split("-")[0]}
              </div>
            </div>
            <table className="w-full  text-xs table-auto border  border-black ">
              <thead>
                <tr className="border border-black">
                  <th className="text-nowrap border border-black text-left font-normal p-1 ps-2 py-2">
                    Order Id
                  </th>
                  <th className="text-nowrap border  border-black text-left font-normal p-1 ps-2">
                    Student Id
                  </th>
                  <th className="text-nowrap border border-black text-left font-normal p-1 ps-2">
                    Payment Id
                  </th>
                  <th className="text-nowrap border  border-black text-left font-normal p-1 ps-2">
                    Order Status
                  </th>
                  <th className="text-nowrap border border-black text-left font-normal p-1 ps-2">
                    Price
                  </th>
                  <th className="text-nowrap border border-black text-left font-normal p-1 ps-2">
                    College
                  </th>
                  <th className="text-nowrap border border-black text-left font-normal p-1 ps-2">
                    Kit Id
                  </th>
                  <th className="text-nowrap border border-black text-left font-normal p-1 ps-2">
                    Kit Name
                  </th>
                </tr>
              </thead>
              <tbody>
                {orderDataByMonth?.map((item) => (
                  <tr className="border border-black">
                    <td className="border border-black p-1 ps-2 py-2">
                      {item?.order_id}
                    </td>
                    <td className="border border-black p-1 ps-2">
                      {item?.student_id}
                    </td>
                    <td className="border border-black p-1 ps-2">
                      {item?.transactionId}
                    </td>
                    <td className="border border-black p-1 ps-2">
                      {item?.status}
                    </td>
                    <td className="border border-black p-1 ps-2">
                      {item?.total_amount}
                    </td>
                    <td className="border border-black p-1 ps-2">
                      {item?.collegeId}
                    </td>
                    <td className="border border-black p-1 ps-2">
                      {item?.kitId}
                    </td>
                    <td className="border border-black p-1 ps-2">
                      {item?.kit_details?.title}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* mapping of items in cart end here */}
      </div>
    </div>
  );
};

export default OrdersIssued;
