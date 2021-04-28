import React from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";

function LoadingState(props) {

  return (
    <motion.div
    className="loading-state"      
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 1 }}
    >
     <div class="lds-ripple"><div></div><div></div></div>
    </motion.div>
  );
}

export default LoadingState;
