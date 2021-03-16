import React from "react";
import { getClassNames } from "../utils/common";

function Separator(props) {
  const { horizontal, vertical, className, ...otherProps } = props;
  return (
    <div
      {...otherProps}
      className={getClassNames(className, "separator", {
        "separator--horizontal": horizontal,
        "separator--vertical": vertical,
      })}
    />
  );
}

export default Separator;
