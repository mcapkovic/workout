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
    activeLabel,
    ...otherProps
  } = props;
  const iconToRender = active && activeIcon ? activeIcon : icon;
  const labelToRender = active && activeLabel ? activeLabel : label;

  return (
    <button
      {...otherProps}
      className={getClassNames(className, "nav-button", {
        "nav-button--active": active,
      })}
      // anim="ripple"
    >
      <div className='nav-button__icon'>{iconToRender}</div>
      <div>{labelToRender}</div>
      <div>{children}</div>
    </button>
  );
}

export default NavButton;
