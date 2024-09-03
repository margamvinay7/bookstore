import React, { useState, useEffect } from "react";
import NotificationComponent from "../../components/Notification";
import StoreMenu from "../../components/StoreMenu";
import axios from "axios";
import { useGetBooksQuery } from "../../redux/services/booksApi";
import { useLocation } from "react-router-dom";
import { useGetItemsQuery } from "../../redux/services/itemsApi";
import { HiOutlineXMark } from "react-icons/hi2";

const UpdateKit = () => {
  const location = useLocation();
  const { id: kitId } = location?.state;
  const [notification, setNotification] = useState({ message: "", type: "" });
  const [form, setForm] = useState({
    id: "",
    title: "",
    college: "",
    stockQuantity: "",
    price: "",
    year: "",
    branch: "",
    academicyear: "",
    image: null,
  });
  const [booksData, setBooksData] = useState();
  const { data: getBooksData } = useGetBooksQuery();
  const { data: getItemsData } = useGetItemsQuery();
  const [books, setBooks] = useState([{ id: "" }]);
  const [items, setItems] = useState([{ id: "" }]);
  const [imagePreview, setImagePreview] = useState(null);
  const [existingImageUrl, setExistingImageUrl] = useState(null); // State to store existing image URL

  const handleChange = (event) => {
    if (event.target.name === "image") {
      // Handle image change separately
      setForm({
        ...form,
        image: event.target.files[0], // Update the image field with the selected file
      });
      setImagePreview(URL.createObjectURL(event.target.files[0])); // Preview the selected image
    } else {
      setForm({
        ...form,
        [event.target.name]: event.target.value,
      });
    }
  };

  const [menu, setMenu] = useState(false);

  const handleMenu = () => {
    setMenu(!menu);
  };

  // const handleBookChange = (index, e) => {
  //   const newBooks = books.map((book, i) => {
  //     if (i === index) {
  //       return { ...book, [e.target.name]: e.target.value };
  //     }
  //     return book;
  //   });
  //   setBooks(newBooks);
  // };

  // const handleItemChange = (index, e) => {
  //   const newItems = items.map((item, i) => {
  //     if (i === index) {
  //       return { ...item, [e.target.name]: e.target.value };
  //     }
  //     return item;
  //   });
  //   setItems(newItems);
  // };

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

  const removeBookField = (index) => {
    const newBooks = books.filter((_, i) => i !== index);
    setBooks(newBooks);
  };
  const removeItemField = (index) => {
    const newItems = items.filter((_, i) => i !== index);
    setItems(newItems);
  };

  const addBookField = () => {
    setBooks([...books, { id: "" }]);
  };

  const addItemField = () => {
    setItems([...items, { id: "" }]);
  };
  console.log(books, items, "items data");

  const updateKit = async () => {
    const formData = new FormData();
    formData.append("id", form.id);
    formData.append("title", form.title);
    formData.append("college", form.college);
    formData.append("stockQuantity", form.stockQuantity);
    formData.append("price", form.price);
    formData.append("year", form.year);
    formData.append("branch", form.branch);
    formData.append("academicyear", form.academicyear);

    if (form.image) {
      formData.append("image", form.image); // Append the new image file to the form data
    } else if (existingImageUrl) {
      formData.append("existingImage", existingImageUrl); // Append the existing image URL if no new image is selected
    }

    formData.append("book", JSON.stringify(books));
    formData.append("item", JSON.stringify(items));

    try {
      const response = await axios.post(
        `http://localhost:9000/api/kit/updateKit`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setNotification({
        message: "Kit Updated Successfully!",
        type: "success",
      });
      setTimeout(() => {
        setNotification({
          message: "",
          type: "",
        });
      }, 3000);
    } catch (error) {
      setNotification({ message: "Error updating kit", type: "error" });
      setTimeout(() => {
        setNotification({
          message: "",
          type: "",
        });
      }, 3000);
    }
  };

  useEffect(() => {
    if (getBooksData) {
      setBooksData(getBooksData);
    }
  }, [getBooksData]);

  useEffect(() => {
    const calculateTotalPrice = () => {
      let totalPrice = 0;

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
    // Fetch the existing kit data
    const fetchKitData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:9000/api/kit/getKit?id=${kitId}`
        );
        const data = response.data.data;
        setForm({
          id: data.kitId,
          title: data.title,
          college: data.collegeId,
          stockQuantity: data.stock_quantity,
          price: data.price,
          year: data.courseyear,
          branch: data.branch,
          academicyear: data.academicyear,
        });
        setBooks(data.books.map((book) => ({ id: book.book_id })));
        setItems(data.items.map((item) => ({ id: item.item_id })));
        setExistingImageUrl(data.image); // Set the existing image URL from the response data
      } catch (error) {
        setNotification({ message: "Error fetching kit data", type: "error" });
      }
    };
    fetchKitData();
  }, [kitId]);

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-200">
      {notification.message && <NotificationComponent {...notification} />}
      <div className="bg-white shadow-md rounded-lg p-6 flex flex-col my-2 items-center w-[90vw] md:w-[60%]">
        <div className="flex justify-between w-full items-center">
          <h2 className="text-2xl font-bold mb-4">Update Kit</h2>
          <StoreMenu menu={menu} handleMenu={handleMenu} />
        </div>
        <div className="w-full">
          <div className="mb-4 flex flex-col w-full;">
            <label htmlFor="title">Title</label>
            <input
              onChange={(e) => handleChange(e)}
              value={form.title}
              id="title"
              placeholder="Enter item Title"
              name="title"
              type="text"
              className="border rounded-sm w-full border-gray-400 p-1"
            />
          </div>
          <div className="mb-4 flex flex-col">
            <label htmlFor="college">College</label>
            <input
              onChange={(e) => handleChange(e)}
              value={form.college}
              id="college"
              name="college"
              placeholder="Enter item College"
              type="text"
              className="border rounded-sm border-gray-400 p-1"
            />
          </div>
          <div className="mb-4 flex flex-col">
            <label htmlFor="year">Course Year</label>
            <input
              onChange={(e) => handleChange(e)}
              value={form.year}
              id="year"
              name="year"
              placeholder="Enter item Course Year"
              type="text"
              className="border rounded-sm border-gray-400 p-1"
            />
          </div>
          <div className="mb-4 flex flex-col">
            <label htmlFor="academicyear">Academic Year</label>
            <input
              onChange={(e) => handleChange(e)}
              value={form.academicyear}
              id="academicyear"
              name="academicyear"
              placeholder="Enter item Academic Year"
              type="text"
              className="border rounded-sm border-gray-400 p-1"
            />
          </div>
          <div className="mb-4 flex flex-col">
            <label htmlFor="price">Price</label>
            <input
              onChange={(e) => handleChange(e)}
              value={form.price}
              id="price"
              placeholder="Enter item Price"
              name="price"
              type="text"
              className="border rounded-sm border-gray-400 p-1"
            />
          </div>
          <div className="mb-4 flex flex-col">
            <label htmlFor="quantity">Quantity</label>
            <input
              onChange={(e) => handleChange(e)}
              value={form.stockQuantity}
              id="quantity"
              placeholder="Enter item Quantity"
              name="stockQuantity"
              type="text"
              className="border rounded-sm border-gray-400 p-1"
            />
          </div>
          <div className="mb-4 flex flex-col">
            <label htmlFor="image">Image</label>
            <input
              onChange={(e) => handleChange(e)}
              id="image"
              name="image"
              type="file"
              accept="image/*"
              className="border rounded-sm border-gray-400 p-1"
            />
            {imagePreview ? (
              <img
                src={imagePreview}
                alt="Preview"
                className="mt-2 max-w-[200px]"
              />
            ) : (
              existingImageUrl && (
                <img
                  src={`data:image/jpeg;base64,${existingImageUrl}`}
                  alt="Existing"
                  className="mt-2 max-w-[200px]"
                />
              )
            )}
          </div>
          <div className="mb-4 flex flex-col">
            <label>Books</label>
            {books.map((book, index) => (
              <div key={index} className="flex items-center mb-2">
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
              onClick={() => addBookField()}
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
            onClick={() => updateKit()}
          >
            Update Kit
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateKit;
