import { useContext } from "react";
import { UserContext } from "../UserContext";
import useFetch from "../components/hooks/useFetch";
import Card3 from "../components/Card3";

export default function Summary() {
  const { user } = useContext(UserContext);
  const { data, loading, error } = useFetch(
    `/eventsOfUser/${user._id}?type=${user.type}`,
    user.type
  );

  return (
    <div className="flex justify-center h-[700px] mt-6 overflow-y-auto">
      <div className="w-[700px] gap-4">
        <h2 className="text-xl px-2 py-2 font-bold rounded-xl text-center ">
          Your events
        </h2>

        {loading && <div>Loading...</div>}
        {error && <div>Error: {error.message}</div>}
        {data && data.length === 0 && <div>No events found</div>}
        {data && data.length > 0 && (
          <div className="flex flex-col overflow-y-auto mt-4 gap-2">
            {data.map((event, index) => (
              <Card3 key={index} event={event} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
