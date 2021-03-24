import React from "react";
import { getClassNames } from "../utils/common";
import { motion } from "framer-motion";

const spring = {
  type: "spring",
  stiffness: 500,
  damping: 30,
};

function ButtonGroupItem(props) {
  const { isSelected, onClick, children } = props;
  return (
    <button onClick={onClick} className={getClassNames("btn-group-item")}>
      {children}
      {isSelected && (
        <motion.div
          layoutId="outline"
          className="btn-group-item__outline"
          initial={false}
          //   animate={{ borderColor: color }}
          transition={spring}
        />
      )}
    </button>
  );
}

export default ButtonGroupItem;
