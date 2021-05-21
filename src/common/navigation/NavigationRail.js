import React from "react";
import { getClassNames } from "../../utils/common";

function NavigationRail(props) {
  const { className, children, ...otherProps } = props;
  return (
    <div {...otherProps} className={getClassNames(className, "navigation-rail")}>
      {children}
    </div>
  );
}

export default NavigationRail;
