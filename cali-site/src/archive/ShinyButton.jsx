import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const ShinyButton = ({ to, text, textColor, backgroundColor, maskColor }) => {
  return (
    <Link to={to}>
      <motion.button
        initial={{ "--x": "100%", scale: 1 }}
        animate={{ "--x": "-100%" }}
        whileTap={{ scale: 0.97 }}
        transition={{
          repeat: Infinity,
          repeatType: "loop",
          repeatDelay: 1,
          type: "spring",
          stiffness: 30, // Adjusted stiffness
          damping: 20,   // Adjusted damping
          mass: 1,       // Adjusted mass
          scale: {
            type: "spring",
            stiffness: 15, // Adjusted stiffness
            damping: 10,   // Adjusted damping
            mass: 0.5,     // Adjusted mass
          },
        }}
        className={`px-6 py-2 rounded-md relative radial-gradient ${backgroundColor} ${textColor}`} // Apply background and text color
      >
        <span className={`relative rounded-full px-3 py-1.5 text-sm font-medium transition focus-visible:outline-2 ${maskColor}`}>
          {text}
        </span>
        <span className="block  absolute inset-0 rounded-md p-px linear-overlay" />
      </motion.button>
    </Link>
  );
};

ShinyButton.propTypes = {
  to: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  textColor: PropTypes.string,
  backgroundColor: PropTypes.string,
  maskColor: PropTypes.string,
};

ShinyButton.defaultProps = {
  textColor: "text-white", // Default to white text
  backgroundColor: "bg-blue-500", // Default to blue background
  maskColor: "linear-mask", // Default to the mask class
};

export default ShinyButton;
