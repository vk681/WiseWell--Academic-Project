import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function Card3({ event, onDelete }) {
  // Format the event date
  const date = new Date(event.date).toLocaleDateString();

  // Handle delete event function
  const handleDelete = async () => {
    try {
      // Make a DELETE request to your backend API to delete the event
      await axios.delete(`/events/${event._id}`);

      // Call the onDelete function passed from the parent component
      onDelete(event._id);
    } catch (error) {
      console.error("Error deleting event:", error);
      // Handle error if necessary
    }
  };

  return (
    <div className="flex h-[100px] rounded-lg shadow-md p-4 mb-4 bg-lightGreen">
      <img
        src={event.image}
        alt="Event Image"
        className="w-1/6 rounded-lg mr-4"
      />
      <div className="flex justify-between w-5/6">
        <div>
          {/* Display event name */}
          <h2 className="text-lg font-semibold mb-2">{event.name}</h2>
          {/* Display event category */}
          <p className="text-sm text-gray-600 mb-2">{event.category}</p>
        </div>
        <div>
          {/* Display event date */}
          <p className="text-sm font-semibold text-gray-600 mb-2">Date:</p>
          <p>{date}</p>
        </div>
        <div className="self-end h-[50px]">
          {/* Button to delete event */}
          <button
            onClick={handleDelete}
            className="hover:underline bg-transparent"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
