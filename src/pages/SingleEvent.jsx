import React, { useContext, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import useFetch from "../components/hooks/useFetch";
import { UserContext } from "../UserContext";
import axios from "axios";
import { Link } from "react-router-dom";

function SingleEvent() {
  const { user } = useContext(UserContext);
  const { id } = useParams();
  const { data, loading, error } = useFetch(`/getEvent/${id}`);
  const [redirect, setRedirect] = useState(false);
  const handleRegister = async () => {
    try {
      // Register the user for the event
      const response = await axios.post("/registerEvent", {
        id,
        user,
      });
      await axios.put(`/updateEventList/${user._id}`, {
        userType: user.type, // Updated to userType
        eventId: data._id,
        image: data.addedPhotos ? data.addedPhotos[0] : "",
        name: data.name,
        post: data.post,
      });
      alert("Registerd successfully");
      setRedirect(true);
    } catch (error) {
      if (error.response) {
        alert(error.response.data.message);
      } else if (error.request) {
        alert("No response from server");
      } else {
        alert("An error occurred while registering");
      }
    }
  };

  if (!id) {
    return <div>No event ID specified.</div>;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!data) {
    return <div>No event data found.</div>;
  }
  if (redirect) {
    return <Navigate to={`/index?category=${data.category}`} />;
  }

  return (
    <div className="w-full h-2/4 flex  justify-center items-center align-center h-screen">
      <div className="w-3/4 flex  align-center items-center mt-10 bg-gray-100 px-4">
        <div className="w-1/2 py-16 gap-4 px-2 flex flex-col">
          <h1 className="text-xl">
            {data.name}
            <br />
            {user.name}
          </h1>
          <div className="text-sm flex flex-col gap-2  border-gray-400">
            <label className="font-bold">Details:</label>
            <label>Category:&nbsp;&nbsp;{data.category}</label>
            <label>
              Address:&nbsp;&nbsp;{data.address}&nbsp;, {data.post}{" "}
            </label>

            <label className="">
              Date:&nbsp;&nbsp;{data.time} &nbsp;&nbsp; Time: {data.time}{" "}
            </label>
            <label className="">
              <b>Description</b>
              <br />
            </label>
            <p>{data.desc}</p>
          </div>

          <div className="flex align-center justify-center gap-4 py-8 mt-4">
            <Link to={`/index?category=${data.category}`}>
              <button className="w-4/4 px-2 py-1 rounded-lg bg-transparent border border-gray-400 text-sm font-semibold hover:bg-primary hover:text-white">
                Cancel
              </button>
            </Link>
            <button
              className="w-2/4 px-2 py-1 rounded-lg bg-transparent border border-gray-400 text-sm font-semibold hover:bg-primary hover:text-white"
              onClick={handleRegister}
            >
              Register
            </button>
          </div>
        </div>
        <div className="w-1/2 p-4 h-[600px]">
          <div className="flex flex-col h-3/4 gap-2">
            <div className=" h-1/2">
              <img
                src={
                  data.addedPhotos
                    ? data.addedPhotos[0]
                    : "http://localhost:4000/uploads/0aa8d855f91d696e31c8080edb27d047.jpg"
                }
                className="w-full h-full  object-cover"
              />
            </div>
            <div className="flex gap-2 b h-1/2">
              <img
                src={
                  data.addedPhotos
                    ? data.addedPhotos[0]
                    : "http://localhost:4000/uploads/0aa8d855f91d696e31c8080edb27d047.jpg"
                }
                className="w-1/2 object-cover"
              />
              <img
                src={
                  data.addedPhotos
                    ? data.addedPhotos[2]
                    : "http://localhost:4000/uploads/0aa8d855f91d696e31c8080edb27d047.jpg"
                }
                className="w-1/2 object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SingleEvent;
