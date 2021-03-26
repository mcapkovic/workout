import React from "react";
import { getClassNames } from "../utils/common";

function TextBox(props) {
  const { className, ...otherProps } = props;
  return (
    <input
      {...otherProps}
      autoComplete="off"
      className={getClassNames("textbox", className)}
    />
  );
}

export default TextBox;
