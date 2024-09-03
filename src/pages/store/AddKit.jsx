import React, { useState, useEffect } from "react";
import NotificationComponent from "../../components/Notification";
import StoreMenu from "../../components/StoreMenu";
import axios from "axios";
import { useGetBooksQuery } from "../../redux/services/booksApi";
import { useGetItemsQuery } from "../../redux/services/itemsApi";
import { HiOutlineXMark } from "react-icons/hi2";

const AddKit = () => {
  const [notification, setNotification] = useState({ message: "", type: "" });
  const [form, setForm] = useState({
    title: "",
    college: "",
    stockQuantity: "",
    price: "",
    year: "",
    branch: "",
    academicyear: "",
  });
  const [booksData, setBooksData] = useState();
  const { data: getBooksData } = useGetBooksQuery();
  const { data: getItemsData } = useGetItemsQuery();
  const [image, setImage] = useState(null);
  const [menu, setMenu] = useState(false);

  console.log(getBooksData, getItemsData, "items data");

  const handleChange = (event) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  };

  const handleImageChange = (event) => {
    setImage(event.target.files[0]);
  };

  const handleMenu = () => {
    setMenu(!menu);
  };

  const getKit = async () => {
    const response = await axios.get("http://localhost:9000/api/kit/getKit");
  };

  const [books, setBooks] = useState([{ id: "" }]);
  const [items, setItems] = useState([{ id: "" }]);

  // const handleBookChange = (index, e) => {
  //   const newBooks = books.map((book, i) => {
  //     if (i === index) {
  //       return { ...book, [e.target.name]: e.target.value };
  //     }
  //     return book;
  //   });
  //   setBooks(newBooks);
  // };

  const removeBookField = (index) => {
    const newBooks = books.filter((_, i) => i !== index);
    setBooks(newBooks);
  };
  const removeItemField = (index) => {
    const newItems = items.filter((_, i) => i !== index);
    setItems(newItems);
  };

  const handleBookChange = (index, e) => {
    const { value } = e.target;
    const newBooks = [...books];
    newBooks[index].id = value;
    setBooks(newBooks);
  };
  const handleItemChange = (index, e) => {
    const { value } = e.target;
    const newItems = [...items];
    newItems[index].id = value;
    setItems(newItems);
  };

  // const handleItemChange = (index, e) => {
  //   const newItems = items.map((item, i) => {
  //     if (i === index) {
  //       return { ...item, [e.target.name]: e.target.value };
  //     }
  //     return item;
  //   });
  //   setItems(newItems);
  // };

  const addBookField = () => {
    setBooks([...books, { id: "" }]);
  };

  const addItemField = () => {
    setItems([...items, { id: "" }]);
  };

  console.log(books, items, "data");

  const addKit = async () => {
    let formData = new FormData();

    // formData.append("data", "hello");

    formData.append("title", form.title);
    console.log("data", formData);
    formData.append("college", form.college);
    formData.append("year", form.year);
    formData.append("branch", form.branch);
    formData.append("academicyear", form.academicyear);
    formData.append("price", form.price);
    formData.append("stockQuantity", form.stockQuantity);
    if (image) {
      formData.append("image", image);
    }
    // books.forEach((book, index) => {
    //   formData.append(`book[${index}][id]`, book.id);
    // });
    // items.forEach((item, index) => {
    //   formData.append(`item[${index}][id]`, item.id);
    // });
    formData.append("book", JSON.stringify(books));
    formData.append("item", JSON.stringify(items));

    if (formData) {
      try {
        const response = await axios.post(
          "http://localhost:9000/api/kit/createKit",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        for (var pair of formData.entries()) {
          console.log(pair[0] + ", " + pair[1]);
        }
        setNotification({
          message: "Kit added successfully!",
          type: "success",
        });
      } catch (error) {
        setNotification({ message: "Error adding kit!", type: "error" });
      }
    }
  };

  useEffect(() => {
    const calculateTotalPrice = () => {
      let totalPrice = 0;
      console.log("in price");
      books.forEach((book) => {
        const selectedBook = getBooksData?.find(
          (b) => parseInt(b.book_id) === parseInt(book.id)
        );
        if (selectedBook) {
          totalPrice += parseFloat(selectedBook.price);
        }
      });

      items.forEach((item) => {
        const selectedItem = getItemsData?.find(
          (i) => parseInt(i.item_id) === parseInt(item.id)
        );
        if (selectedItem) {
          totalPrice += parseFloat(selectedItem.price);
        }
      });

      setForm((prevForm) => ({
        ...prevForm,
        price: totalPrice.toFixed(2),
      }));
    };

    calculateTotalPrice();
  }, [books, items, getBooksData, getItemsData]);

  useEffect(() => {
    const calculateKitQuantity = () => {
      let quantities = [];

      books.forEach((book) => {
        const selectedBook = getBooksData?.find(
          (b) => parseInt(b.book_id) === parseInt(book.id)
        );
        if (selectedBook) {
          quantities.push(parseInt(selectedBook.stock_quantity));
        }
      });

      items.forEach((item) => {
        const selectedItem = getItemsData?.find(
          (i) => parseInt(i.item_id) === parseInt(item.id)
        );
        if (selectedItem) {
          quantities.push(parseInt(selectedItem.stock_quantity));
        }
      });

      const kitQuantity = quantities.length > 0 ? Math.min(...quantities) : 0;

      setForm((prevForm) => ({
        ...prevForm,
        stockQuantity: kitQuantity,
      }));
    };

    calculateKitQuantity();
  }, [books, items, getBooksData, getItemsData]);

  useEffect(() => {
    if (getBooksData) {
      setBooksData(getBooksData);
    }
  }, [getBooksData]);

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-200">
      {notification.message && <NotificationComponent {...notification} />}
      <div className="bg-white md:w-[60%] shadow-md rounded-lg p-6 flex flex-col my-2 items-center w-[90vw]">
        <div className="flex justify-between w-full items-center">
          <h2 className="text-2xl font-bold mb-4">Add Kit</h2>
          <StoreMenu menu={menu} handleMenu={handleMenu} />
        </div>
        <div className="w-full">
          <div className="mb-4 flex flex-col w-full">
            <label htmlFor="title">Title</label>
            <input
              onChange={handleChange}
              value={form.title}
              id="title"
              placeholder="Enter Title"
              name="title"
              type="text"
              className="border rounded-sm w-full border-gray-400 p-1"
            />
          </div>
          <div className="mb-4 flex flex-col">
            <label htmlFor="college">College</label>
            <input
              onChange={handleChange}
              value={form.college}
              id="college"
              name="college"
              placeholder="Enter College"
              type="text"
              className="border rounded-sm border-gray-400 p-1"
            />
          </div>
          <div className="mb-4 flex flex-col">
            <label htmlFor="year">Course Year</label>
            <input
              onChange={handleChange}
              value={form.year}
              id="year"
              name="year"
              placeholder="Enter Course Year"
              type="text"
              className="border rounded-sm border-gray-400 p-1"
            />
          </div>
          <div className="mb-4 flex flex-col">
            <label htmlFor="branch">Branch</label>
            <input
              onChange={handleChange}
              value={form.branch}
              id="branch"
              name="branch"
              placeholder="Enter Branch"
              type="text"
              className="border rounded-sm border-gray-400 p-1"
            />
          </div>
          <div className="mb-4 flex flex-col">
            <label htmlFor="academicyear">Academic Year</label>
            <input
              onChange={handleChange}
              id="academicyear"
              value={form.academicyear}
              name="academicyear"
              placeholder="Enter Academic Year"
              type="text"
              className="border rounded-sm border-gray-400 p-1"
            />
          </div>
          <div className="mb-4 flex flex-col">
            <label htmlFor="price">Price</label>
            <input
              onChange={handleChange}
              id="price"
              value={form.price}
              placeholder="Enter Price"
              name="price"
              type="text"
              className="border rounded-sm border-gray-400 p-1"
            />
          </div>
          <div className="mb-4 flex flex-col">
            <label htmlFor="quantity">Quantity</label>
            <input
              onChange={handleChange}
              id="quantity"
              value={form.stockQuantity}
              placeholder="Enter Quantity"
              name="stockQuantity"
              type="text"
              className="border rounded-sm border-gray-400 p-1"
            />
          </div>
          <div className="mb-4 flex flex-col">
            <label htmlFor="image">Image</label>
            <input
              onChange={handleImageChange}
              id="image"
              name="image"
              type="file"
              className="border rounded-sm border-gray-400 p-1"
            />
          </div>
          <div className="mb-4 flex flex-col">
            <label>Books</label>
            {books.map((book, index) => (
              <div key={index} className="flex items-center mb-2 ">
                {/* <input
                  onChange={(e) => handleBookChange(index, e)}
                  value={book.id}
                  name="id"
                  placeholder={`Enter Book ID ${index + 1}`}
                  type="text"
                  className="border rounded-sm border-gray-400 p-1 mr-2 w-full"
                /> */}
                <select
                  onChange={(e) => handleBookChange(index, e)}
                  value={book.id}
                  name="id"
                  className=" border rounded-sm border-gray-400 p-1 mr-2 w-full"
                >
                  <option value="">Select a book</option>
                  {getBooksData &&
                    getBooksData.map((bookData) => (
                      <option key={bookData.book_id} value={bookData.book_id}>
                        {bookData.title}
                      </option>
                    ))}
                </select>
                <button
                  type="button"
                  onClick={() => removeBookField(index)}
                  className="mx-1 w-7 h-7 bg-red-500 text-white p-2 flex justify-center items-center rounded-full"
                >
                  <HiOutlineXMark className="w-3 h-3" />
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={addBookField}
              className="w-full bg-blue-500 text-white p-2 rounded-md mt-2"
            >
              Add Book
            </button>
          </div>
          <div className="mb-4 flex flex-col">
            <label>Items</label>
            {items.map((item, index) => (
              <div key={index} className="flex items-center mb-2">
                {/* <input
                  onChange={(e) => handleItemChange(index, e)}
                  value={item.id}
                  name="id"
                  placeholder={`Enter Item ID ${index + 1}`}
                  type="text"
                  className="border rounded-sm border-gray-400 p-1 mr-2 w-full"
                /> */}
                <select
                  onChange={(e) => handleItemChange(index, e)}
                  value={item.id}
                  name="id"
                  className=" border rounded-sm border-gray-400 p-1 mr-2 w-full"
                >
                  <option value="">Select a Item</option>
                  {getItemsData &&
                    getItemsData.map((itemData) => (
                      <option key={itemData.item_id} value={itemData.item_id}>
                        {itemData.title}
                      </option>
                    ))}
                </select>
                <button
                  type="button"
                  onClick={() => removeItemField(index)}
                  className="mx-1 w-7 h-7 bg-red-500 text-white p-2 flex justify-center items-center rounded-full"
                >
                  <HiOutlineXMark className="w-3 h-3" />
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={addItemField}
              className="w-full bg-blue-500 text-white p-2 rounded-md mt-2"
            >
              Add Item
            </button>
          </div>
          <button
            className="w-full bg-[rgb(58,36,74)] text-white p-2 rounded-md"
            onClick={addKit}
          >
            Add to Inventory
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddKit;
