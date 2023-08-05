import React, { useEffect } from "react";
import "./listItem.scss";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import ThumbDownAltIcon from "@material-ui/icons/ThumbDownAlt";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import AddIcon from "@material-ui/icons/Add";
import { useState } from "react";
import ReactPlayer from "react-player";
import axios from "axios";
import { Link } from "react-router-dom";
import HoverVideoPlayer from "react-hover-video-player";
export default function ListItem({ index, item }) {
  const [isHovered, setIsHovered] = useState(false);
  const [movie, setMovie] = useState({});
  const [play, setPlay] = useState(false);
  const handleMouseEnter = () => {
    setPlay(true);
  };
  const handleMouseLeave = () => {
    setPlay(false);
  };
  /*  const trailer =
    "https://player.vimeo.com/external/371433846.sd.mp4?s=236da2f3c0fd273d2c6d9a064f3ae35579b2bbdf&profile_id=139&oauth2_token_id=57447761"; */

  useEffect(() => {
    const getMovie = async () => {
      try {
        const res = await axios.get("/movies/find/" + item, {
          headers: {
            token:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxNjViMmFlYmIxM2NkYjEyZjczYjBhZiIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY0MTA1ODcxNSwiZXhwIjoxNjQxNDkwNzE1fQ.kqEjqnX4-A2rLHJI-Shnma0vglcXW9po-Cwjt1lp0wE",
          },
        });
        setMovie(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getMovie();
  }, [item]);

  return (
    <Link to={{ pathname: "/watch", movie: movie }}>
      <div
        className="listItem"
        style={{ left: isHovered && index * 225 - 50 + index * 2.5 }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <img src={movie?.imgSm} alt="" />
        {isHovered && (
          <>
            {<video src={movie.trailer} autoPlay={true} loop />}
            {/* <ReactPlayer
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              playing={play}
              pip
              controls="false"
              config={{ file: { forceHLS: true } }}
              url={movie.trailer}
            /> */}
            <div className="itemInfo">
              <div className="icons">
                <PlayArrowIcon className="icon" />
                <AddIcon className="icon" />
                <ThumbUpAltIcon className="icon" />
                <ThumbDownAltIcon className="icon" />
              </div>
              <div className="itemInfoTop">
                <span>{movie.duration}</span>
                <span className="limit">+{movie.limit}</span>
                <span>{movie.year}</span>
              </div>
              <div className="desc">{movie.desc}</div>
              <div className="genre">{movie.genre}</div>
            </div>
          </>
        )}
      </div>
    </Link>
  );
}
