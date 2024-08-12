"use client";

import L from "leaflet";
import MarkerIcon from "../node_modules/leaflet/dist/images/marker-icon.png";
import MarkerShadow from "../node_modules/leaflet/dist/images/marker-shadow.png";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import { useEffect, useState } from "react";

interface coor {
  lat: number;
  lng: number;
  zoom: number;
}
const Recenter = ({ lat, lng, zoom }: coor) => {
  console.log(lat);
  console.log(lng);
  const map = useMap();
  map.setView([lat, lng], zoom, {
    animate: true,
  });
  return null;
};

const LocatieUpdateModule = () => {
  const [coord, setCoord] = useState<[number, number, number]>([0, 0, 5]);

  useEffect(() => {
    let geolocation = navigator.geolocation.watchPosition((position) => {
      setCoord([position.coords.latitude ,position.coords.longitude,20])
    });
  }, []);
  const GetMyLocation = () => {
    const getMyLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          setCoord([position.coords.latitude, position.coords.longitude, 20]);
        });
      } else {
        console.log("Geolocation is not supported by this browser.");
      }
    };

    return (
      <div className="get-my-location">
        <button onClick={getMyLocation}>Get My Location</button>
      </div>
    );
  };

  return (
    <>
      <GetMyLocation />
      <MapContainer
        center={coord}
        zoom={5}
        scrollWheelZoom={true}
        style={{
          height: "100vh",
          width: "100vw",
        }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker
          icon={
            new L.Icon({
              iconUrl: MarkerIcon.src,
              iconRetinaUrl: MarkerIcon.src,
              iconSize: [25, 41],
              iconAnchor: [12.5, 41],
              popupAnchor: [0, -41],
              shadowUrl: MarkerShadow.src,
              shadowSize: [41, 41],
            })
          }
          position={[coord[0], coord[1]]}
        />

        <Recenter lat={coord[0]} lng={coord[1]} zoom={coord[2]} />
      </MapContainer>
    </>
  );
};

export default LocatieUpdateModule;
