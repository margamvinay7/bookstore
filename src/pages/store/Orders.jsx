import React, { useState, useEffect } from "react";
import Image from "../../assets/book.jpg";
import { FaMonero, FaRupeeSign } from "react-icons/fa";
import {
  useGetOrdersByStudentIdQuery,
  useGetOrdersByDateQuery,
  useGetOrdersByDateRangeQuery,
  useGetOrdersByMonthYearQuery,
} from "../../redux/services/ordersApi";
import { Link } from "react-router-dom";
import StoreMenu from "../../components/StoreMenu";

const Orders = () => {
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
  console.log(startDate, endDate);

  const {
    data: orderByDateData,
    error: dateError,
    isError: isDateError,
    refetch: refetchOrdersByDate,
  } = useGetOrdersByDateQuery(date);

  console.log(isDateError);
  const {
    data: ordersByRangeData,
    isError: isRangeError,
    refetch: refetchOrdersByRange,
  } = useGetOrdersByDateRangeQuery({
    startDate: startDate,
    endDate: endDate,
  });
  const {
    data: ordersByMonthData,
    isError: isMonthError,
    refetch: refetchOrdersByMonth,
  } = useGetOrdersByMonthYearQuery({
    month: month?.split("-")[1],
    year: month?.split("-")[0],
  });

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
    refetchOrdersByDate({ date: date });
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
    });
  }, [month]);

  useEffect(() => {
    refetchOrdersByRange({
      startDate: startDate,
      endDate: endDate,
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
      console.log("changed 1");
      setOrderDataByRange(ordersByRangeData);
    }
  }, [ordersByRangeData]);
  useEffect(() => {
    if (ordersByMonthData) {
      console.log("changed 1");
      setOrderDataByMonth(ordersByMonthData);
    }
  }, [ordersByMonthData]);
  const arrayItems = [1, 2, 3, 4, 5];
  return (
    <div className="min-h-[100vh] sm:p-5 p-2 bg-gray-200 flex flex-col-reverse justify-end  sm:justify-center  sm:flex-row  ">
      <div className="bg-white sm:p-5 rounded-md  p-3 sm:w-[75%] md:w-[60%] ">
        <div className="flex flex-row items-center justify-between">
          <div className="text-3xl font-medium">STORE</div>

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
          <div className="mt-2">
            {dateBtn && (
              <div className="flex flex-col">
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
              <>
                <div className="flex flex-col gap-y-1 mb-1">
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
                <div className="flex flex-col gap-y-1 mb-1">
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
              </>
            )}
            {monthBtn && (
              <div className="flex flex-col gap-y-1">
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
          </div>
        </div>
        <hr className="border border-black/20 my-3" />
        {/* mapping of items in cart is start from here */}
        {dateBtn &&
          !isDateError &&
          orderDataByDate?.map((item) => (
            <>
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

                  <div className="text-sm">{item?.book_details?.college}</div>

                  <div className="text-sm">{item?.book_details?.year}</div>

                  <div className="text-sm">{item?.payment_method}</div>
                  <div className="text-sm">{item?.status}</div>

                  <div className="font-medium text-lg flex items-center">
                    <FaRupeeSign
                      style={{
                        width: 12,
                        height: 12,
                      }}
                    />
                    {item?.total_amount}
                  </div>
                </div>
              </div>
              <hr className="border border-black/20 my-3" />
            </>
          ))}
        {rangeBtn &&
          !isRangeError &&
          orderDataByRange?.map((item) => (
            <>
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

                  <div className="text-sm">{item?.book_details?.college}</div>

                  <div className="text-sm">{item?.book_details?.year}</div>

                  <div className="text-sm">{item?.payment_method}</div>
                  <div className="text-sm">{item?.status}</div>

                  <div className="font-medium text-lg flex items-center">
                    <FaRupeeSign
                      style={{
                        width: 12,
                        height: 12,
                      }}
                    />
                    {item?.total_amount}
                  </div>
                </div>
              </div>
              <hr className="border border-black/20 my-3" />
            </>
          ))}
        {monthBtn &&
          !isMonthError &&
          orderDataByMonth?.map((item) => (
            <>
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

                  <div className="text-sm">{item?.book_details?.college}</div>

                  <div className="text-sm">{item?.book_details?.year}</div>

                  <div className="text-sm">{item?.payment_method}</div>
                  <div className="text-sm">{item?.status}</div>

                  <div className="font-medium text-lg flex items-center">
                    <FaRupeeSign
                      style={{
                        width: 12,
                        height: 12,
                      }}
                    />
                    {item?.total_amount}
                  </div>
                </div>
              </div>
              <hr className="border border-black/20 my-3" />
            </>
          ))}

        {/* mapping of items in cart end here */}
      </div>
    </div>
  );
};

export default Orders;
