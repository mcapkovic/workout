import React from "react";
import { getClassNames } from "../../utils/common";

function NavButton(props) {
  const {
    className,
    label,
    icon,
    children,
    active,
    activeIcon,
    ...otherProps
  } = props;
  const iconToRender = active && activeIcon ? activeIcon : icon;
  return (
    <button
      {...otherProps}
      className={getClassNames(className, "nav-button", {
        "nav-button--active": active,
      })}
    >
      <div>{iconToRender}</div>
      <div>{label}</div>
      <div>{children}</div>
    </button>
  );
}

export default NavButton;
