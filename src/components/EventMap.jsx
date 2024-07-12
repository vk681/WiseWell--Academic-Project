import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Link } from "react-router-dom";

export default function EventMap({ events }) {
  if (!events || events.length === 0) return null;

  // Use the coordinates of the first event to center the map
  const centerPosition = [
    events[0].coordinates.latitude,
    events[0].coordinates.longitude,
  ];

  return (
    <MapContainer
      center={centerPosition}
      zoom={12}
      scrollWheelZoom={false}
      style={{ height: "100%" }}
      className="h-full"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {events.map((event, index) => (
        <Marker
          key={index}
          position={[event.coordinates.latitude, event.coordinates.longitude]}
        >
          <Popup>
            <div className="h-[160px]">
              <div className="h-4/ ">
                <div className="flex h-32">
                  <div className="w-1.5/4 mr-4">
                    <img
                      src={event.addedPhotos[0] || "default-image-url.jpg"}
                      alt="Event"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="w-3]2.5/4 overflow-auto">
                    <h3 className="font-bolder italic bg-orange-100">
                      {event.name}
                    </h3>
                    <p>
                      <strong>Date:</strong>{" "}
                      {new Date(event.date).toLocaleDateString()}
                    </p>
                    <p>
                      <strong>Time:</strong> {event.time}
                    </p>
                    <p>
                      <strong>Address:</strong> {event.address}, {event.post}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex justify-center mt-2">
                <button className="bg-yellow-500 text-red px-4 py-2 rounded">
                  <Link to={`/event/${event._id}`}> Register</Link>
                </button>
              </div>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
