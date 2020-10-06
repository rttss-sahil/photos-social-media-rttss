import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import mapboxgl from "mapbox-gl";
import App from "./App";

mapboxgl.accessToken =
  "pk.eyJ1IjoicnR0c3MiLCJhIjoiY2tmYzJzMzNjMTR6ODJyb2YwcnpnaTlsOCJ9.pSn2vZX1NPYmQHVe3aDbMQ";
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
