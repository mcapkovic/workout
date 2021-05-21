import React from "react";
import { getClassNames } from "../../utils/common";

function NavigationDrawer(props) {
  const { className, children, ...otherProps } = props;
  return (
    <div {...otherProps} className={getClassNames(className, "navigation-drawer")}>
      {children}
    </div>
  );
}

export default NavigationDrawer;
