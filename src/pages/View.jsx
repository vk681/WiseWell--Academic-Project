import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import useFetch from "../components/hooks/useFetch";

export default function View() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, loading, error } = useFetch(`/getTutor/${id}`);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-full">Loading...</div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-full">
        Error: {error.message}
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex justify-center items-center h-full">
        No tutor data found.
      </div>
    );
  }

  return (
    <div className="w- flex flex-col items-center mt-16 px-4">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-xl">
        <div className="flex flex-col items-center">
          <div className="w-32 h-32 rounded-full overflow-hidden mb-6">
            <img
              src={
                data.photos && data.photos.length > 0
                  ? data.photos[0]
                  : "https://via.placeholder.com/150"
              }
              alt="Tutor"
              className="w-full h-full object-contain"
            />
          </div>
          <h1 className="text-2xl font-semibold text-gray-800 mb-4">
            {data.name}
          </h1>
        </div>
        <div className="flex flex-col space-y-4">
          <div className="flex items-center justify-between border-b pb-4">
            <span className="text-gray-600">Address:</span>
            <span className="text-gray-800">
              {data.address}, {data.post}
            </span>
          </div>
          <div className="flex items-center justify-between border-b pb-4">
            <span className="text-gray-600">Mobile No:</span>
            <span className="text-gray-800">{data.mob}</span>
          </div>
          <div className="flex items-center justify-between border-b pb-4">
            <span className="text-gray-600">Email:</span>
            <span className="text-gray-800">{data.email}</span>
          </div>
          <div className="flex items-center justify-between border-b pb-4">
            <span className="text-gray-600">Postcode:</span>
            <span className="text-gray-800">{data.post}</span>
          </div>
        </div>
        <div className="flex justify-between mt-8">
          <button
            className="bg-red-500 text-white py-2 px-6 rounded-full hover:bg-red-600 transition duration-300"
            onClick={() => navigate(-1)}
          >
            Go Back
          </button>
        </div>
      </div>
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-4xl mt-8">
        <div className="flex flex-col items-center">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Quote</h2>
          <div className="italic text-gray-600 text-center">
            "Your Quote Goes Here"
          </div>
        </div>
      </div>
    </div>
  );
}
