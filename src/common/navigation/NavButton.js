import React from "react";
import { getClassNames } from "../../utils/common";
import { motion } from "framer-motion";
import PropTypes from "prop-types";

/**
 * Button for BottomNavigation, NavigationRail, NavigationDrawer
 */
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
    outline,
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
      <div
        className={getClassNames("nav-button__icon", {
          "nav-button__icon--with-label": isLabelVisible,
        })}
      >
        {iconToRender}
      </div>

      <div
        className={getClassNames("nav-button__label", {
          "nav-button__label--hidden": !isLabelVisible,
          "nav-button__label--visible": isLabelVisible,
        })}
      >
        {activeLabel || label}
      </div>
      <div>{children}</div>
      {active && outline && (
        <motion.div
          layoutId="outline"
          className="nav-button__outline"
          initial={false}
          transition={spring}
        />
      )}
    </button>
  );
}

NavButton.propTypes = {
  className: PropTypes.string,
  label: PropTypes.string,
  icon: PropTypes.func,
  children: PropTypes.func,
  /**
   * active state for the button
   */
  active: PropTypes.bool,
  /**
   * icon for active state
   */
  activeIcon: PropTypes.func,
  /**
   * laber for active state
   */
  activeLabel: PropTypes.string,
  /**
   * ripple effect on click
   */
  ripple: PropTypes.bool,
  /**
   * outline for NavigationDrawer with AnimateSharedLayout
   */
  outline: PropTypes.bool,
};

export default NavButton;

const spring = {
  type: "spring",
  stiffness: 500,
  damping: 30,
};
