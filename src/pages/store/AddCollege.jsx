import React, { useState } from "react";
import axios from "axios";
import NotificationComponent from "../../components/Notification";
import StoreMenu from "../../components/StoreMenu";

const AddCollege = () => {
  const [notification, setNotification] = useState({ message: "", type: "" });
  const [name, setName] = useState("");
  const [menu, setMenu] = useState(false);

  const [image, setImage] = useState(null);
  const [response, setResponse] = useState("");

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleMenu = () => {
    setMenu(!menu);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("image", image);

    try {
      const res = await axios.post(
        "http://localhost:9000/api/college/addCollege",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setNotification({
        message: "College Added Successfully",
        type: "success",
      });
      setResponse(res.data.res);
    } catch (error) {
      setResponse("Error: " + error.message);
      setNotification({ message: "Failed to Added college", type: "error" });
    }
  };

  //   <div>
  //     <form onSubmit={handleSubmit}>
  //       <div>
  //         <label htmlFor="name">Name:</label>
  //         <input
  //           type="text"
  //           id="name"
  //           value={name}
  //           onChange={handleNameChange}
  //           required
  //         />
  //       </div>
  //       <div>
  //         <label htmlFor="image">Image:</label>
  //         <input
  //           type="file"
  //           id="image"
  //           accept="image/*"
  //           onChange={handleImageChange}
  //           required
  //         />
  //       </div>
  //       <button type="submit">Submit</button>
  //     </form>
  //     {response && <p>{response}</p>}
  //   </div>;

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-200">
      {notification.message && <NotificationComponent {...notification} />}
      <div className="bg-white shadow-md rounded-lg p-6 flex flex-col items-center w-[90vw] ">
        <div className="flex justify-between w-full items-center">
          <h2 className="text-2xl font-bold mb-4">Add College</h2>
          <StoreMenu menu={menu} handleMenu={handleMenu} />
        </div>
        <form onSubmit={handleSubmit} className="w-full">
          <div className="mb-4 flex flex-col ">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={handleNameChange}
              placeholder="Enter a College Name"
              required
              className="border rounded-sm border-gray-400 p-1"
            />
          </div>
          <div className="mb-4 flex flex-col ">
            <label htmlFor="image">Image</label>
            <input
              type="file"
              id="image"
              accept="image/*"
              placeholder="Select Image"
              onChange={handleImageChange}
              required
              className="border rounded-sm  border-gray-400 p-1"
            />
          </div>

          <button
            className="w-full bg-[rgb(58,36,74)] text-white p-2 rounded-md"
            type="submit"
          >
            Add College
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddCollege;
