import React from "react";
import { img_300, unavailable } from "../../config/config";
import ContentModal from "../ContentModal/ContentModal";
import "./SingleContent.css";

const SingleContent = ({ 
  id, 
  poster, 
  title, 
  date, 
  media_type, 
  vote_average 
}) => {
  return (
    <ContentModal media_type={media_type} id={id}>
      <div className="media">
        <img
          className="poster"
          src={poster ? `${img_300}${poster}` : unavailable}
          alt={title}
        />
        <b className="title">{title}</b>
        <div className="subTitle">
          <span>{media_type === "tv" ? "TV Series" : "Movie"}</span>
          <span>{date ? date.substring(0, 4) : "N/A"}</span>
        </div>
        <span className="subTitle">
          ⭐ {vote_average ? vote_average.toFixed(1) : "N/A"}
        </span>
      </div>
    </ContentModal>
  );
};

export default SingleContent;