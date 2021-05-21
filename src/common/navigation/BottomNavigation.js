import React from "react";
import { getClassNames } from "../../utils/common";

function BottomNavigation(props) {
  const { className, children, ...otherProps } = props;
  return (
    <div {...otherProps} className={getClassNames(className, "navigation-bottom")}>
      {children}
    </div>
  );
}

export default BottomNavigation;
