import { useContext } from "react";
import { UserContext } from "../UserContext";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export default function Profile() {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    setUser(null);
    navigate("/login");
  };

  return (
    <div className="w-full flex flex-col items-center mt-8 px-4">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-lg gap-2 mt-8">
        <div className="flex flex-col items-center">
          <div className="w-20 h-20 rounded-full overflow-hidden mb-4">
            <img
              src={
                user.photos ? user.photos[0] : "https://via.placeholder.com/150"
              }
              alt="User"
              className="w-full h-full object-contain"
            />
          </div>
          <h1 className="text-lg font-semibold text-gray-800 mb-2">
            {user.name}
          </h1>
        </div>
        <div className="flex flex-col space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-gray-600">Address:</span>
            <span className="text-gray-800">{user.address}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-600">Mobile No:</span>
            <span className="text-gray-800">{user.mob}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-600">Email:</span>
            <span className="text-gray-800">{user.email}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-600">Postcode:</span>
            <span className="text-gray-800">{user.post}</span>
          </div>
        </div>
        <div className="flex justify-between mt-4">
          <button className="bg-gray-300 text-gray-800 py-2 px-4 rounded-full hover:bg-gray-400 transition duration-300">
            <Link to={`/edit/${user._id}`}>Edit</Link>
          </button>
          <button
            className="bg-red-500 text-white py-2 px-4 rounded-full hover:bg-red-600 transition duration-300"
            onClick={handleLogout}
          >
            Log Out
          </button>
        </div>
      </div>
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md mt-4">
        <div className="flex flex-col items-center">
          <h2 className="text-lg font-semibold text-gray-800 mb-2">Quote</h2>
          <div className="italic text-gray-600 text-center">
            "Your Quote Goes Here"
          </div>
        </div>
      </div>
    </div>
  );
}
