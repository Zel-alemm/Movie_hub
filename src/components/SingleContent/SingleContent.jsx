import { motion } from "framer-motion";
import { Modal, Backdrop, Button } from "@mui/material";
import YouTubeIcon from "@mui/icons-material/YouTube";
import Carousel from "../Carousel/Carousel";
import "./SingleContent.css";

export default function ContentModal({ children, media_type, id, content, video }) {
  return (
    <>
      <div className="media">{children}</div>
      <Modal
        open={!!content}
        onClose={() => {}}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{ timeout: 500 }}
      >
        {content && (
          <motion.div
            className="modalContent"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3 }}
          >
            <img
              src={content.poster_path || ""}
              alt={content.title || content.name}
            />
            <div className="modalDetails">
              <h2>{content.title || content.name}</h2>
              <p>{content.overview}</p>
              <Carousel id={id} media_type={media_type} />
              <Button
                variant="contained"
                startIcon={<YouTubeIcon />}
                color="primary"
                href={`https://youtube.com/watch?v=${video}`}
                target="_blank"
              >
                Watch Trailer
              </Button>
            </div>
          </motion.div>
        )}
      </Modal>
    </>
  );
}