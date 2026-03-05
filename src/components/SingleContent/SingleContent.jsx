import React from "react";
import Badge from "@mui/material/Badge";
import { img_300, unavailable } from "../../config/config";
import ContentModal from "../ContentModal/ContentModal";
import "./SingleContent.css";

const SingleContent = ({
  id,
  poster,
  title,
  date,
  media_type,
  vote_average,
}) => {
  return (
    <ContentModal media_type={media_type} id={id}>
      <div className="media">

        <Badge
          badgeContent={vote_average ? vote_average.toFixed(1) : "N/A"}
          color={vote_average > 6 ? "primary" : "secondary"}
        >
          <img
            className="poster"
            src={poster ? `${img_300}${poster}` : unavailable}
            alt={title}
          />
        </Badge>

        <b className="title">{title}</b>

        <div className="subTitle">
          <span>{media_type === "tv" ? "TV Series" : "Movie"}</span>
          <span>{date ? date.substring(0, 4) : "N/A"}</span>
        </div>

      </div>
    </ContentModal>
  );
};

export default SingleContent;