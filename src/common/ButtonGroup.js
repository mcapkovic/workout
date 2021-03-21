import React from "react";
import { getClassNames } from "../utils/common";

function ButtonGroup(props) {
  const { children, className } = props;
  return (
    <div className={getClassNames(className, "button-group")}>{children}</div>
  );
}

export default ButtonGroup;
