import { motion } from "framer-motion";
import "./Header.css";

const Header = () => {
  return (
    <motion.span
      onClick={() => window.scroll(0, 0)}
      className="header"
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 120, damping: 12 }}
    >
      🎬 Movie Center 🎥
    </motion.span>
  );
};

export default Header;