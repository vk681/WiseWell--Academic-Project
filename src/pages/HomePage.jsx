import { Link } from "react-router-dom";
import useFetch from "../components/hooks/useFetch";
import Card1 from "../components/Card1";
import Card2 from "../components/Card2";
import { motion } from "framer-motion";
export default function Homepage() {
  const { data, loading, error } = useFetch(
    "countByType?categories=Physical_Events:,Social_Events:,Mental-Health_Events:,Entertaining_Events:,Relaxation_Events:"
  );
  const {
    data: recentEventData,
    loading: recentEventLoading,
    error: recentEventError,
    reFetch: refetchRecentEvents,
  } = useFetch("/recent-events");
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }
  return (
    <div className="h-screen overflow-hidden bg-gradient-to-t to-white">
      {loading ? (
        "Loading..."
      ) : (
        <>
          <div className="flex h-3/5 px-4 py-6">
            <div className="w-4/6   px-1 py-10 flex flex-col justify-between">
              <div className="ml-16">
                <div className="flex flex-col">
                  <span className="text-2xl font-bold text-gray-200">
                    The time
                  </span>
                  <span className="text-3xl font-bold text-gray-300">
                    has come to change
                  </span>
                  <span className="text-5xl font-bold text-gray-400 mb-4">
                    change your routine
                  </span>
                </div>
                <p className="text-[18px] leading-relaxed w-4/5 px-2">
                  " Wise Well, the ultimate event hub for pensioners, offers````
                  seamless navigation, intuitive registration, and diverse event
                  choices. Empowering seniors with enriching experiences and
                  fostering community connections for a vibrant retirement."
                </p>
                <div className="flex justify-center w-3/4">
                  <Link to={`/index?category=Social_Events:`}>
                    <button className="w-[150px] font-semibold   text-gray-500 w-1/2 h-8  border border-solid  border-1 border-third mt-10 px-4 rounded-lg hover:bg-third hover:text-white bg-transparent focus:border-third ">
                      Explore
                    </button>
                  </Link>
                </div>
              </div>
            </div>

            <div className="w-3/6 px-4 mt-4 max-h-[400px] overflow-y-auto hide-scrollbar">
              <div
                className="  left-0 bg-geen-100 top-0 rounded-sm  pb-2  h-[50px] bg-white w-[560px]"
                style={{ position: "sticky", zInex: 20 }}
              >
                <h2 className="text-xl px-2 py-2 font-bold rounded-xl ">
                  Most Recent Events
                </h2>
              </div>
              <div
                className="flex flex-col gap-1 mt-2 mt-5 mr-5 pt-2"
                // style={{ zIndex: 10 }}
              >
                {recentEventData.map((event, index) => (
                  <Card2 key={index} event={event} />
                ))}
              </div>
            </div>
          </div>

          <div className="h-2/5">
            <h2 className="mb-1 ml-6 text-xl text-gray-800 tracking-wide  shadow-sm hover:shadow-md">
              Select Your Interests
            </h2>

            <div className="h-full w-full flex justify-between pb-4 gap-3">
              <div className=" flex-grow flex-shrink-0 relative align-center ml-6 mt-4 justify-center">
                <Link to={`/index?category=Physical_Events:`}>
                  <div className=" absolute inset-0 flex p-4  bg-[url('health.jpg')] bg-cover w-/6 h-5/6 rounded transition duration-300 ease-in-out hover:opacity-75 hover:scale-105 text-white">
                    <div className="flex flex-col justify-between">
                      <h1 className="font-bold text-lg">Physical Events:</h1>
                      <div className="flex justify-between gap-4 mb-10 font-bold text-sm text-white">
                        <div className="flex flex-col items-center">
                          <h6>Free Events</h6>
                          <h2>Free</h2>
                        </div>
                        <div className="flex flex-col items-center">
                          <h2>Free Events</h2>
                          <h2>{data[0]}</h2>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>

              <div className=" flex-grow flex-shrink-0 relative align-center ml-6 mt-4 justify-center">
                <Link to={`/index?category=Social_Events:`}>
                  <div className=" absolute inset-0 flex p-4 bg-[url('science.jpg')] bg-cover w-6/6 h-5/6 rounded transition duration-300 ease-in-out hover:opacity-75 hover:scale-105 text-white">
                    {" "}
                    <div className="flex flex-col justify-between">
                      <h1 className="font-bold text-lg">Social Events:</h1>
                      <div className="flex justify-between gap-4 mb-5 font-bold text-sm">
                        <div className="flex flex-col items-center">
                          <h6>Free Events</h6>
                          <h2>Free</h2>
                        </div>
                        <div className="flex flex-col items-center">
                          <h2>Free Events</h2>
                          <h2>{data[1]}</h2>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
              <div className=" flex-grow flex-shrink-0 relative align-center ml-6 mt-4 justify-center">
                <Link to={`/index?category=Mental-Health_Events:`}>
                  <div className=" absolute inset-0 flex p-4 bg-[url('tech.jpg')] bg-cover w-6/6 h-5/6 rounded transition duration-300 ease-in-out hover:opacity-75 hover:scale-105 text-white">
                    {" "}
                    <div className="flex flex-col justify-between">
                      <h1 className="font-bold text-lg">
                        Mental-Health Events:
                      </h1>
                      <div className="flex justify-between gap-4 mb-5 font-bold text-sm">
                        <div className="flex flex-col items-center">
                          <h6>Free Events</h6>
                          <h2>Free</h2>
                        </div>
                        <div className="flex flex-col items-center">
                          <h2>Free Events</h2>
                          <h2>{data[2]}</h2>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
              <div className=" flex-grow flex-shrink-0 relative align-center ml-6 mt-4 justify-center">
                <Link to={`/index?category=Entertaining_Events:`}>
                  <div className=" absolute inset-0 flex p-4 bg-[url('sports.jpg')] bg-cover w-/6 h-5/6 rounded transition duration-300 ease-in-out hover:opacity-75 hover:scale-105 text-white">
                    {" "}
                    <div className="flex flex-col justify-between">
                      <h1 className="font-bold text-lg">
                        Entertaining Events:
                      </h1>
                      <div className="flex justify-between gap-4 mb-5 font-bold text-sm">
                        <div className="flex flex-col items-center">
                          <h6>Free Events</h6>
                          <h2>Free</h2>
                        </div>
                        <div className="flex flex-col items-center">
                          <h2>Free Events</h2>
                          <h2>{data[3]}</h2>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
              <div className=" flex-grow flex-shrink-0 relative align-center ml-6 mt-4 justify-center">
                <Link to={`/index?category=Relaxation_Events:`}>
                  <div className=" absolute inset-0 flex p-4  bg-[url('arts.jpg')] bg-opacity-100 bg-cover w-6/6 h-5/6 rounded transition duration-300 ease-in-out hover:opacity-75 hover:scale-105 text-white">
                    {" "}
                    <div className="flex flex-col justify-between">
                      <h1 className="font-bold text-lg">Relaxation Events:</h1>
                      <div className="flex justify-between gap-4 mb-5 font-bold text-sm">
                        <div className="flex flex-col items-center">
                          <h6>Free Events</h6>
                          <h2>Free</h2>
                        </div>
                        <div className="flex flex-col items-center">
                          <h2>Free Events</h2>
                          <h2>{data[4]}</h2>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
