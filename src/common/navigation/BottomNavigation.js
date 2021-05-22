import React from "react";
import { getClassNames } from "../../utils/common";
import useRipple from "../../hooks/useRipple";

function BottomNavigation(props) {
  const { className, children, ...otherProps } = props;
  const elRef = React.useRef();

  useRipple(elRef);

  return (
    <div
      {...otherProps}
      className={getClassNames(className, "navigation-bottom")}
      ref={elRef}
    >
      {children}
    </div>
  );
}

export default BottomNavigation;
