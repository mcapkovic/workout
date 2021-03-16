import React from "react";
import { getClassNames } from "../utils/common";

function Button(props) {
  const { buttonGroup, selected, className, ...otherProps } = props;
  return (
    <button
      {...otherProps}
      className={getClassNames(className, "button", {
        "button--group": buttonGroup,
        "button--selected": selected,
      })}
    />
  );
}

export default Button;
