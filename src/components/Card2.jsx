import React from "react";
import { Link } from "react-router-dom";

export default function Card2({ event }) {
  const date = new Date(event.date).toLocaleDateString();

  return (
    <div className="flex h-[100px] rounded-lg shadow-md p-4 mb-4">
      <img
        src={event.addedPhotos[0]}
        alt="Event Image"
        className="w-1/6 rounded-lg mr-4"
      />
      <div className="flex  justify-between w-5/6">
        <div>
          <h2 className="text-lg font-semibold mb-2">{event.name}</h2>
          <p className="text-sm text-gray-600 mb-2">{event.category}</p>
        </div>
        <div>
          <p className="text-sm font-semibold text-gray-600 mb-2">Date:</p>
          <p>{date}</p>
        </div>
        <div className="self-end h-[50px] ">
          <Link to={`/event/${event._id}`} className="hover:underline">
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}
