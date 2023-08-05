import React from "react";
import "./watch.scss";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import Iframe from "react-iframe";
export default function Watch() {
  const location = useLocation();
  const movie = location.movie;
  console.log(location);
  return (
    <div className="watch">
      <Link to="/">
        <div className="back">
          <ArrowBackIcon />
          Home
        </div>
      </Link>
      <iframe
        className="video"
        src={movie.video}
        target="_blank"
        frameborder="0"
      ></iframe>
    </div>
  );
}
