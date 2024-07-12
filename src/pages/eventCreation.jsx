import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Navigate } from "react-router-dom";

export default function EventCreation() {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [max, setMax] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [address, setAddress] = useState("");
  const [post, setPost] = useState("");
  const [price, setPrice] = useState(0);
  const [desc, setDesc] = useState(false);
  const [addedPhotos, setAddedPhotos] = useState([]);
  const [photoLink, setphotoLink] = useState("");
  const [redirect, setRedirect] = useState(false);
  const [coordinates, setCoordinates] = useState({
    latitude: null,
    longitude: null,
  });

  const handleCreate = async (ev) => {
    ev.preventDefault();
    try {
      const response = await axios.post("/eventCreate", {
        name,
        category,
        max,
        date,
        time,
        address,
        post,
        desc,
        addedPhotos,
        coordinates,
        price,
      });
      if (response) {
        alert("Event created successfully!");
        setRedirect(true);
      } else {
        alert("Failed to create event");
      }
    } catch (error) {
      console.error("Error creating event:", error);
      alert("Failed to create event");
    }
  };

  if (redirect) {
    return <Navigate to={"/account"} />;
  }

  //
  const handlePostalAddress = async (postalAddress) => {
    try {
      const encodedPostalCode = encodeURIComponent(
        postalAddress.replace(/\s+/g, "")
      );
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodedPostalCode}`
      );
      if (response.ok) {
        const data = await response.json();
        if (data.length > 0) {
          const { lat, lon } = data[0];
          setCoordinates({
            latitude: parseFloat(lat),
            longitude: parseFloat(lon),
          });
          console.log(parseFloat(lat), parseFloat(lon));
        } else {
          throw new Error("No results found");
        }
      } else {
        throw new Error("Network response was not ok");
      }
    } catch (error) {
      console.error("Error fetching geocoding data:", error);
      // alert("Failed to fetch geocoding data");
    }
  };

  //

  function UploadPhoto(ev) {
    const files = ev.target.files;
    const data = new FormData();
    for (let i = 0; i < files.length; i++) {
      data.append("photos", files[i]);
    }
    axios
      .post("/upload", data, {
        headers: { "content-type": "multipart/form-data" },
      })
      .then((response) => {
        const { data: filenames } = response;
        if (filenames) {
          const imagePaths = filenames.map(
            (filename) => `http://localhost:4000/uploads/${filename}`
          );
          setAddedPhotos((prev) => [...prev, ...imagePaths]);
        }
      })
      .catch((error) => {
        console.error("Error uploading photos:", error);
      });
  }
  return (
    <div className="w-4/6 flex mt-14 m-auto font-thin  bg-lightGray rounded-lg py-4">
      <form className="flex w-full font-sans " onSubmit={handleCreate}>
        <div className="ml-10 w-3/5 flex flex-col gap-2 ">
          <h1 className="text-xl font-thin">1. Enter the event name</h1>

          <input
            id="name"
            name="name"
            className="ml-2 bg-gray-100 px-4 py-2 text-gray-800 flex-1 rounded-lg border-none shadow-sm focus:outline-none focus:ring-2  "
            type="text"
            placeholder="Enter the event name"
            value={name}
            onChange={(ev) => setName(ev.target.value)}
          />
          <h1 className="text-xl font-thin   ">
            2. Choose the category of event
          </h1>
          <select
            id="category"
            name="category"
            className=" ml-2 bg-gray-100 px-4 py-2 text-gray-800 flex-1 b rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
            value={category}
            onChange={(ev) => setCategory(ev.target.value)}
          >
            <option value="" disabled selected>
              Select Category
            </option>
            <option value="">Choose</option>
            <option value="Physical_Events:">Physical Events:</option>
            <option value="Social_Events:">Social Events:</option>
            <option value="Mental-Health_Events:">Mental health events</option>
            <option value="Entertaining_Events:">Entertaining events:</option>
            <option value="Relaxation_Events:">Relaxation Events:</option>
          </select>
          <div className="flex mt-2 gap-8">
            <div className="flex-1">
              <h1 className="text-xl font-thin ">3. Start Date</h1>
              <input
                id="date"
                name="date"
                className="ml-2 mt-2 bg-gray-100 px-4 py-2 text-gray-800 flex-1 rounded-lg border-none shadow-sm focus:outline-none focus:ring-2 w-full  "
                type="date"
                placeholder="Enter the event name"
                value={date}
                onChange={(ev) => setDate(ev.target.value)}
              />
            </div>
            <div className="flex-1">
              <h1 className="text-xl font-thin ">4. Number of People</h1>
              <input
                id="max"
                name="max"
                className="ml-2 mt-2 bg-gray-100 px-4 py-2 text-gray-800 flex-1 rounded-lg border-none shadow-sm focus:outline-none focus:ring-2 w-full "
                type="number"
                placeholder="Enter the maximum number"
                value={max}
                onChange={(ev) => setMax(ev.target.value)}
              />
            </div>
          </div>
          <div className="flex  mt-2 gap-8">
            <div className="flex-1">
              <h1 className="text-xl font-thin ">5. location</h1>
              <input
                id="address"
                name="address"
                className="ml-2 mt-2 bg-gray-100 px-4 py-2 text-gray-800 flex-1 rounded-lg border-none shadow-sm focus:outline-none focus:ring-2 w-full  "
                type="text"
                placeholder="Enter the location Details"
                value={address}
                onChange={(ev) => setAddress(ev.target.value)}
              />
            </div>
            <div className="flex-2">
              <h1 className="text-xl font-thin ">6. Enter the post code</h1>
              <input
                id="post"
                name="post"
                className="ml-2 mt-2 bg-gray-100 px-4 py-2 text-gray-800 flex-1 rounded-lg border-none shadow-sm focus:outline-none focus:ring-2 w-full "
                type="text"
                placeholder="Enter the postal code"
                value={post}
                onChange={(ev) => {
                  const value = ev.target.value;
                  setPost(value);
                  handlePostalAddress(value); // Pass the updated value directly to the function
                }}
              />
            </div>
            <div className="flex-1">
              <h1 className="text-xl font-thin ">7. Enter the time</h1>
              <input
                id="time"
                name="time"
                className="ml-2 mt-2 bg-gray-100 px-4 py-2 text-gray-800 flex-1 rounded-lg border-none shadow-sm focus:outline-none focus:ring-2 w-full "
                type="text"
                placeholder="Enter the post code"
                value={time}
                onChange={(ev) => setTime(ev.target.value)}
              />
            </div>
          </div>
          <h1 className="text-xl font-thin ">8. Give a brief description</h1>
          <textarea
            id="desc"
            name="desc"
            className="ml-2 mt-2 bg-gray-100 px-4 py-2 text-gray-800 flex-1 rounded-lg border-none shadow-sm focus:outline-none focus:ring-2 resize-none w-full"
            placeholder="Give a brief description"
            value={desc}
            onChange={(ev) => setDesc(ev.target.value)}
          />
          <button className="bg-primary-300 py-1 w-1/4 text-lg mt-3 m-auto px-1 rounded-md hover:bg-primary hover:text-white text-gray-800">
            Create
          </button>
        </div>
        <div className="ml-10 p-5 w-2/5 flex flex-col gap-3  ">
          <div className="flex-2">
            <h1 className="text-xl font-thin ">6. Enter the price</h1>
            <input
              id="price"
              name="price"
              className="ml-2 mt-2 bg-gray-100 px-4 py-2 text-gray-800 flex-1 rounded-lg border-none shadow-sm focus:outline-none focus:ring-2 w-full "
              type="number"
              placeholder="Enter the Price"
              value={price}
              onChange={(ev) => setPrice(ev.target.value)}
            />
          </div>
          <h1 className="text-xl font-thin ml-0 ">9. Add Photos</h1>
          <div className="flex mt-3 gap-2 ">
            <label htmlFor="fileInput" className="cursor-pointer flex r gap-1">
              <input
                id="fileInput"
                className="hidden"
                type="file"
                multiple
                onChange={UploadPhoto}
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-10 h-10"
              >
                <path d="M9.97.97a.75.75 0 0 1 1.06 0l3 3a.75.75 0 0 1-1.06 1.06l-1.72-1.72v3.44h-1.5V3.31L8.03 5.03a.75.75 0 0 1-1.06-1.06l3-3ZM9.75 6.75v6a.75.75 0 0 0 1.5 0v-6h3a3 3 0 0 1 3 3v7.5a3 3 0 0 1-3 3h-7.5a3 3 0 0 1-3-3v-7.5a3 3 0 0 1 3-3h3Z" />
                <path d="M7.151 21.75a2.999 2.999 0 0 0 2.599 1.5h7.5a3 3 0 0 0 3-3v-7.5c0-1.11-.603-2.08-1.5-2.599v7.099a4.5 4.5 0 0 1-4.5 4.5H7.151Z" />
              </svg>
              Upload
            </label>
          </div>
          <div className="grid grid-cols-3 gap-4">
            {addedPhotos.length > 0 ? (
              addedPhotos.map((photo, index) => (
                <div key={index} className="relative aspect-w-1 aspect-h-1">
                  <img
                    src={photo}
                    alt={`Uploaded ${index}`}
                    className="object-cover w-full h-full"
                  />
                </div>
              ))
            ) : (
              <p>No photos added</p>
            )}
          </div>
        </div>
      </form>
    </div>
  );
}
