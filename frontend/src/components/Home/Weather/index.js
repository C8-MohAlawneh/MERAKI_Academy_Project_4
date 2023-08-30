import React from "react";
import Weather from "./Weather.png";
import "./style.css";
export default function CardUI() {
  return (
    <div>
      <img src={Weather} id="weather-img" />
    </div>
  );
}
