import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../UserContext";

export default function Card1({ event }) {
  const { ready, user } = useContext(UserContext);
  const temp = new Date(event.date);
  const formattedDate = temp.toISOString().split("T")[0];

  const handleRegister = () => {
    if (!user) {
      alert("Please login or register to proceed.");
    }
  };

  const registerButton = user ? (
    <Link
      to={`/event/${event._id}`}
      className="w-2/4 rounded-[5px]  flex justify-center text-[14px] font-medium px-4 py-1 bg-yellow-300 border border-solid hover:bg-yellow-400 transition duration-200 hover:text-[15px]"
    >
      Register
    </Link>
  ) : (
    <Link
      to="/login"
      onClick={handleRegister}
      className="w-2/4 rounded-[5px] flex justify-center text-[14px] font-medium px-4 py-1 bg-yellow-300 border border-solid hover:bg-yellow-400 transition duration-200 hover:text-[15px]"
    >
      Register
    </Link>
  );

  return (
    <div className="ml-4 w-[90vh] h-[30vh] mt-2 px-4 py-4 flex border border-solid border-gray-300 rounded-lg">
      <div className="w-1/3 h-full">
        <img
          src={
            event.addedPhotos
              ? event.addedPhotos[0]
              : "http://localhost:4000/uploads/0aa8d855f91d696e31c8080edb27d047.jpg"
          }
          className="w-full h-full object-cover"
        />
      </div>
      <div className="w-2/3 h-full px-4 flex flex-col">
        <div className="flex justify-between bg-gray-100 px-1 py-1 rounded-lg gap-4 items-center">
          <h1 className="font-bold ml-2 text-[13px] w-3/4">{event.name}</h1>
          <h2 className="text-orange-500 text-[13px] mr-1 font-bold relative">
            {formattedDate}
          </h2>
        </div>
        <div className="mt-4 flex ml-2 gap-2 items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
            />
          </svg>
          <span>
            {event.address}, {event.post}
          </span>
        </div>
        <div className="w-full mt-4 flex ml-2 gap-2 items-center justify-between mr-8">
          <div className="flex">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z"
              />
            </svg>
            <span>&nbsp;Available for : {event.max}</span>
          </div>
          <span className="bg-green-400 px-6 py-1 rounded-lg text-white text-[14px] font-semibold">
            Free
          </span>
        </div>
        <div className="mt-6 flex ml-2 gap-4 items-center justify-around w-full">
          <Link to={`/view/${event.Tutor_id}`}>
            <button className="w-[100px] rounded-[5px] text-[12px] font-medium px-4 py-1 bg-white border border-solid hover:bg-gray-300">
              View Tutor
            </button>
          </Link>
          <button className="w-[100px] rounded-[5px] text-[12px] font-medium px-4 py-1 bg-white border border-solid hover:bg-gray-300">
            Ask
          </button>
          {registerButton}
        </div>
      </div>
    </div>
  );
}
