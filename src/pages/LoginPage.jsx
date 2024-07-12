import axios from "axios";
import { useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { UserContext } from "../UserContext";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [type, setType] = useState("");
  const [redirect, setRedirect] = useState(false);
  const { setUser } = useContext(UserContext);
  async function handleLoginSubmit(ev) {
    ev.preventDefault();
    try {
      const response = await axios.post("/login", { email, pwd, type });
      if (response) {
        setUser(response.data);
        alert("Login Successful");
        setRedirect(true);
      } else {
        alert("Login Failed");
      }
    } catch (error) {
      console.error("Login Error:", error);
      alert("Login Failed");
    }
  }

  if (redirect) {
    return <Navigate to={"/home"} />;
  }

  return (
    <div className="mt-4 grow flex items-center justify-around">
      <div className="mb-60">
        <h1 className="text-4xl text-center mb-4">Login</h1>
        <form className="max-w-md mx-auto" onSubmit={handleLoginSubmit}>
          <input
            type="email"
            placeholder="vk@gmail.com"
            value={email}
            onChange={(ev) => setEmail(ev.target.value)}
          />
          <input
            type="password"
            placeholder="password"
            value={pwd}
            onChange={(ev) => setPwd(ev.target.value)}
          />

          <select
            id="type"
            name="type"
            className=" ml-2 bg-gray-100 px-4 py-2 text-gray-800 flex-1 b rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
            value={type}
            onChange={(ev) => setType(ev.target.value)}
          >
            <option value="" disabled selected>
              Select Type
            </option>
            <option value="Tutor">Tutor</option>
            <option value="User">User</option>
          </select>
          <button class="bg-red-500 mt-2 border-2 border-red-500 rounded-lg w-[100px] ml-10 transform transition-transform duration-300 hover:scale-110">
            Login
          </button>
          <div className="text-center text-500-gray- py-2">
            Dont have an acoount yet?{" "}
            <Link to={"/register"} className="underline text-black-800">
              Register Now
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
