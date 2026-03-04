import React, { useEffect, useState } from "react";
import {
  Modal,
  Backdrop,
  Fade,
  Button,
  Box,
  Typography,
} from "@mui/material";
import { styled } from "@mui/system";
import YouTubeIcon from "@mui/icons-material/YouTube";
import axios from "axios";
import { img_500, unavailable, unavailableLandscape } from "../../config/config";
import Carousel from "../Carousel/Carousel";
import "./ContentModal.css";

const Paper = styled(Box)(({ theme }) => ({
  width: "90%",
  height: "80%",
  backgroundColor: "#39445a",
  border: "1px solid #282c34",
  borderRadius: 10,
  color: "white",
  boxShadow: theme.shadows[5],
  padding: theme.spacing(1, 1, 3),
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  overflowY: "auto",
}));

export default function ContentModal({ children, media_type, id }) {
  const [open, setOpen] = useState(false);
  const [content, setContent] = useState(null);
  const [video, setVideo] = useState(null);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const fetchData = async () => {
    try {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/${media_type}/${id}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
      );
      setContent(data);
    } catch (error) {
      console.error("Failed to fetch content:", error);
    }
  };

  const fetchVideo = async () => {
    try {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/${media_type}/${id}/videos?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
      );
      setVideo(data.results[0]?.key || null);
    } catch (error) {
      console.error("Failed to fetch video:", error);
    }
  };

  useEffect(() => {
    fetchData();
    fetchVideo();
    // eslint-disable-next-line
  }, [id, media_type]);

  return (
    <>
      <div
        className="media"
        style={{ cursor: "pointer" }}
        onClick={handleOpen}
      >
        {children}
      </div>

      <Modal
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{ timeout: 500 }}
      >
        <Fade in={open}>
          {content && (
            <Paper>
              <div className="ContentModal">
                <img
                  src={content.poster_path ? `${img_500}${content.poster_path}` : unavailable}
                  alt={content.name || content.title}
                  className="ContentModal__portrait"
                />
                <img
                  src={content.backdrop_path ? `${img_500}${content.backdrop_path}` : unavailableLandscape}
                  alt={content.name || content.title}
                  className="ContentModal__landscape"
                />

                <div className="ContentModal__about">
                  <Typography variant="h5" className="ContentModal__title">
                    {content.name || content.title} (
                    {(content.first_air_date || content.release_date || "----").substring(0, 4)}
                    )
                  </Typography>

                  {content.tagline && <i className="tagline">{content.tagline}</i>}

                  <Typography className="ContentModal__description">
                    {content.overview}
                  </Typography>

                  <Carousel id={id} media_type={media_type} />

                  {video && (
                    <Button
                      variant="contained"
                      startIcon={<YouTubeIcon />}
                      color="secondary"
                      href={`https://www.youtube.com/watch?v=${video}`}
                      target="_blank"
                    >
                      Watch the Trailer
                    </Button>
                  )}
                </div>
              </div>
            </Paper>
          )}
        </Fade>
      </Modal>
    </>
  );
}