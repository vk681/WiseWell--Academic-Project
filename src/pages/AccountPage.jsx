import { useContext } from "react";
import { UserContext } from "../UserContext";
import { Navigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import Profile from "./profile";
import EventCreation from "./eventCreation";
import Summary from "./Summary";

export default function AccountPage() {
  const { ready, user } = useContext(UserContext);

  let { subpage } = useParams();
  if (subpage == undefined) {
    subpage = "profile";
  }
  //
  if (!ready) {
    return "Loading..";
  }
  if (ready && !user) {
    return <Navigate to={"/login"} />;
  }

  //
  function linkClasses(type = null) {
    let classes = "py-2 px-6";
    if (type === subpage) {
      classes += " bg-primary text-white rounded-full";
    }
    return classes;
  }
  //
  return (
    <div>
      <nav className="w-full flex mt-10 justify-center gap-10">
        <Link className={linkClasses("profile")} to={"/account"}>
          My Profile
        </Link>
        {user.type === "Tutor" && (
          <Link className={linkClasses("booking")} to={"/account/booking"}>
            Create Event
          </Link>
        )}
        <Link className={linkClasses("summary")} to={"/account/summary"}>
          Summary
        </Link>
        <Link className="ml-40 mt-2" to={"/home"}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-5 h-5"
          >
            <path
              fillRule="evenodd"
              d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z"
              clipRule="evenodd"
            />
          </svg>
        </Link>
      </nav>

      {subpage === "profile" && <Profile />}

      {subpage === "booking" && <EventCreation />}

      {subpage === "summary" && <Summary />}
    </div>
  );
}
