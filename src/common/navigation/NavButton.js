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
    ripple,
    ...otherProps
  } = props;
  const iconToRender = active && activeIcon ? activeIcon : icon;
  const isLabelVisible = active && activeLabel ? !!activeLabel : !!label;

  return (
    <button
      {...otherProps}
      className={getClassNames(className, "nav-button", {
        "nav-button--active": active,
      })}
      data-animation={ripple ? "ripple" : ""}
    >
      <div className={getClassNames("nav-button__icon", {
          "nav-button__icon--with-label": isLabelVisible,
        })}>{iconToRender}</div>

      <div
        className={getClassNames("nav-button__label", {
          "nav-button__label--hidden": !isLabelVisible,
          "nav-button__label--visible": isLabelVisible,
        })}
      >
        {activeLabel || label}
      </div>
      <div>{children}</div>
    </button>
  );
}

export default NavButton;
