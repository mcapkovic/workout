import React from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";

function SuccesState(props) {
  const pathLength = useMotionValue(0);
  const opacity = useTransform(pathLength, [0.05, 0.15], [0, 1]);

  return (
    <motion.div
      className="succes-state"
      initial={{ scale: 0.8 }}
      animate={{ scale: 1 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="150" height="150">
        <motion.path
          d="M38 74.707l24.647 24.646L116.5 45.5"
          fill="transparent"
          strokeWidth="20"
          stroke="#28b5a0"
          strokeLinecap="round"
          animate={{ pathLength: 0.9 }}
          style={{ pathLength: pathLength, opacity: opacity }}
        />
      </svg>
    </motion.div>
  );
}

export default SuccesState;
