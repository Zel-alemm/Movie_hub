import React, { useState, useEffect } from "react";
import { Modal, Box, Typography, Button, Backdrop } from "@mui/material";
import YouTubeIcon from "@mui/icons-material/YouTube";
import { motion } from "framer-motion";
import axios from "axios";
import Carousel from "../Carousel/Carousel";
import { unavailable } from "../../config/config";
import "./ContentModal.css"; // Make sure this file exists

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "90%",
  maxWidth: 900,
  bgcolor: "#1e1e1e",
  borderRadius: 3,
  boxShadow: 24,
  p: 4,
  color: "white",
  maxHeight: "90vh",
  overflow: "auto",
  outline: "none",
};

export default function ContentModal({ children, media_type, id }) {
  const [open, setOpen] = useState(false);
  const [content, setContent] = useState(null);
  const [video, setVideo] = useState(null);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    if (!open) return;

    const fetchData = async () => {
      try {
        const { data } = await axios.get(
          `https://api.themoviedb.org/3/${media_type}/${id}?api_key=${import.meta.env.VITE_APP_API_KEY}&language=en-US`
        );
        setContent(data);
      } catch (err) {
        console.error("Error fetching content:", err);
      }
    };

    const fetchVideo = async () => {
      try {
        const { data } = await axios.get(
          `https://api.themoviedb.org/3/${media_type}/${id}/videos?api_key=${import.meta.env.VITE_APP_API_KEY}&language=en-US`
        );

        const trailer = data.results.find(
          (v) => v.type === "Trailer" && v.site === "YouTube"
        );

        setVideo(trailer?.key);
      } catch (err) {
        console.error("Error fetching video:", err);
      }
    };

    fetchData();
    fetchVideo();
  }, [open, id, media_type]);

  return (
    <>
      <div onClick={handleOpen} style={{ cursor: "pointer" }}>
        {children}
      </div>

      <Modal
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{ timeout: 500 }}
      >
        <Box sx={style}>
          {!content ? (
            <Typography align="center">Loading...</Typography>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
                  <img
                    src={
                      content.poster_path
                        ? `https://image.tmdb.org/t/p/w300${content.poster_path}`
                        : unavailable
                    }
                    alt={content.title || content.name}
                    style={{ width: "200px", borderRadius: "10px" }}
                  />
                  <div style={{ flex: 1 }}>
                    <Typography variant="h4" gutterBottom>
                      {content.title || content.name}
                      {content.release_date && (
                        <Typography variant="subtitle1" color="gray">
                          ({new Date(content.release_date).getFullYear()})
                        </Typography>
                      )}
                    </Typography>

                    {content.tagline && (
                      <Typography variant="subtitle1" color="primary" gutterBottom>
                        "{content.tagline}"
                      </Typography>
                    )}

                    <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
                      Overview
                    </Typography>
                    <Typography variant="body2" paragraph>
                      {content.overview || "No overview available."}
                    </Typography>

                    <div style={{ display: "flex", gap: "20px", flexWrap: "wrap", marginTop: "20px" }}>
                      {content.vote_average > 0 && (
                        <Typography>
                          ⭐ Rating: {content.vote_average.toFixed(1)}/10
                        </Typography>
                      )}
                      {content.runtime > 0 && (
                        <Typography>⏱️ Runtime: {content.runtime} min</Typography>
                      )}
                    </div>
                  </div>
                </div>

                <Typography variant="h6" gutterBottom>
                  Cast
                </Typography>
                <Carousel id={id} media_type={media_type} />

                {video && (
                  <Button
                    variant="contained"
                    startIcon={<YouTubeIcon />}
                    sx={{ mt: 2, alignSelf: "center" }}
                    href={`https://www.youtube.com/watch?v=${video}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    size="large"
                  >
                    Watch Trailer
                  </Button>
                )}
              </div>
            </motion.div>
          )}
        </Box>
      </Modal>
    </>
  );
}