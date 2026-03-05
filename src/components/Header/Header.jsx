import { motion } from "framer-motion";
import "./Header.css";

const Header = () => {
  return (
    <motion.div
      onClick={() => window.scroll(0, 0)}
      className="header"
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 140 }}
      whileHover={{ scale: 1.05 }}
    >
      🎬 Movie Center
    </motion.div>
  );
};

export default Header;