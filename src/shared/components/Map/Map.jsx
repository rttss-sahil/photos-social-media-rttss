import React, { useEffect, useRef, useState } from "react";
import "./Map.css";
import mapboxgl from "mapbox-gl";

function Map(props) {
  const [lat, setlat] = useState(5);
  const [lon, setlon] = useState(43);
  const [zoom, setZoom] = useState(14);
  const mapContainer = useRef();
  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [props.lon, props.lat],
      zoom,
    });
    map.on("move", () => {
      setlat(map.getCenter().lat.toFixed(2));
      setlon(map.getCenter().lng.toFixed(2));
      setZoom(map.getZoom().toFixed(2));
    });
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <div className="sidebarStyle">
        <div>
          Longitude: {lon} | Latitude: {lat} | Zoom: {zoom}
        </div>
      </div>
      <div
        ref={(el) => (mapContainer.current = el)}
        className="mapContainer"
      ></div>
    </div>
  );
}

export default Map;
