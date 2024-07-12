import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Navigate } from "react-router-dom";
import { UserContext } from "../UserContext";

export default function EditPofile() {
  const { user, setUser } = useContext(UserContext);
  const [type, setType] = useState("");

  useEffect(() => {
    setType(user.type);
  }, [user.type]);

  const dob = new Date(user.date);
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [date, setDate] = useState("");
  const [mob, setMob] = useState("");
  const [post, setPost] = useState("");
  const [desc, setDesc] = useState("");
  const [photos, setAddedPhotos] = useState([]);
  const [redirect, setRedirect] = useState(false);

  const handleUpdate = async (ev) => {
    ev.preventDefault();
    try {
      const response = await axios.post("/update", {
        id: user._id,
        type,
        name,
        address,
        mob,
        date,
        post,
        desc,
        photos,
      });
      if (response) {
        alert("Account updated successfully!");
        setUser(response.data);
        setRedirect(true);
      } else {
        alert("Failed to update Account");
      }
    } catch (error) {
      console.error("Error updating Account:", error);
      alert("Failed to update Account");
    }
  };
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
  if (redirect) {
    return <Navigate to={"/home"} />;
  }

  return (
    <div className="w-3/5 flex mt-14 m-auto font-thin bg-lightGray rounded-lg px-2 py-2">
      <form className="flex w-full font-sans " onSubmit={handleUpdate}>
        <div className="ml-10 w-3/5 flex flex-col gap-2 ">
          <h1 className="text-xl font-thin">1. Enter your name: {user.name}</h1>

          <input
            id="name"
            name="name"
            className="ml-2 bg-gray-100 px-4 py-2 text-gray-800 flex-1 rounded-lg border-none shadow-sm focus:outline-none focus:ring-2  "
            type="text"
            placeholder={user.name}
            value={name}
            onChange={(ev) => setName(ev.target.value)}
          />
          <h1 className="text-xl font-thin   ">2. give your home address</h1>
          <input
            id="address"
            name="address"
            className="ml-2 bg-gray-100 px-4 py-2 text-gray-800 flex-1 rounded-lg border-none shadow-sm focus:outline-none focus:ring-2  "
            type="text"
            placeholder={user.address}
            value={address}
            onChange={(ev) => setAddress(ev.target.value)}
          />
          <div className="flex mt-2 gap-8">
            <div className="flex-1">
              <h1 className="text-xl font-thin ">3. Date of Birth</h1>
              <input
                id="date"
                name="date"
                className="ml-2 mt-2 bg-gray-100 px-4 py-2 text-gray-800 flex-1 rounded-lg border-none shadow-sm focus:outline-none focus:ring-2 w-full  "
                type="date"
                placeholder={user.address}
                value={date}
                onChange={(ev) => setDate(ev.target.value)}
              />
            </div>
            <div className="flex-1">
              <h1 className="text-xl font-thin ">4. Enter your mobile</h1>
              <input
                id="mob"
                name="mob"
                className="ml-2 mt-2 bg-gray-100 px-4 py-2 text-gray-800 flex-1 rounded-lg border-none shadow-sm focus:outline-none focus:ring-2 w-full "
                type="number"
                placeholder={user.mob}
                value={mob}
                onChange={(ev) => setMob(ev.target.value)}
              />
            </div>
          </div>
          <div className="flex  mt-2 gap-8">
            <div className="flex-2">
              <h1 className="text-xl font-thin ">5. Enter the post code</h1>
              <input
                id="post"
                name="post"
                className="ml-2 mt-2 bg-gray-100 px-4 py-2 text-gray-800 flex-1 rounded-lg border-none shadow-sm focus:outline-none focus:ring-2 w-full "
                type="text"
                placeholder={user.post}
                value={post}
                onChange={(ev) => setPost(ev.target.value)}
              />
            </div>
          </div>
          <h1 className="text-xl font-thin ">
            7. Give a brief description about you
          </h1>
          <textarea
            id="desc"
            name="desc"
            className="ml-2 mt-2 bg-gray-100 px-4 py-2 text-gray-800 flex-1 rounded-lg border-none shadow-sm focus:outline-none focus:ring-2 resize-none w-full"
            placeholder={user.desc}
            value={desc}
            onChange={(ev) => setDesc(ev.target.value)}
          />
          <button className="bg-primary-300 py-1 w-1/4 text-lg mt-3 m-auto px-1 rounded-md hover:bg-primary hover:text-white text-gray-800">
            update
          </button>
        </div>

        <div className="ml-10 p-5 w-2/5 flex flex-col gap-3  ">
          <h1 className="text-xl font-thin ml-0 ">10. Add Photos</h1>
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
            {photos.length > 0 ? (
              photos.map((photo, index) => (
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
