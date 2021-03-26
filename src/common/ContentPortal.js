import React from "react";
import ReactDOM from "react-dom";
import { getClassNames } from "../utils/common";

function ContentPortal(props) {
  const { className, portalTo = "", ...otherProps } = props;

  const element = React.useRef(document.querySelector(portalTo));
  return ReactDOM.createPortal(
    <div
      {...otherProps}
      className={getClassNames(className, "content-portal")}
    />,
    element.current
  );
}

export default ContentPortal;
