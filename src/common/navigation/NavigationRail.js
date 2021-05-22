import React from "react";
import { getClassNames } from "../../utils/common";
import useRipple from "../../hooks/useRipple";

function NavigationRail(props) {
  const { className, children, ...otherProps } = props;
  const elRef = React.useRef();

  useRipple(elRef);

  return (
    <div
      {...otherProps}
      className={getClassNames(className, "navigation-rail")}
      ref={elRef}
    >
      {children}
    </div>
  );
}

export default NavigationRail;
