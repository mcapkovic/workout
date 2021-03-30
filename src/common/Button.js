import React from "react";
import { getClassNames } from "../utils/common";
import { motion } from "framer-motion";

function Button(props) {
  const {
    buttonGroup,
    selected,
    className,
    animate,
    disabled,
    ...otherProps
  } = props;

  const updatedAnimate =
    animate && disabled ? { ...animate, opacity: 0.4 } : animate;
    
  return (
    <motion.button
      {...otherProps}
      animate={updatedAnimate}
      disabled={disabled}
      className={getClassNames(className, "button", {
        "button--group": buttonGroup,
        "button--selected": selected,
      })}
    />
  );
}

export default Button;
