import React from "react";
import ReactDOM from "react-dom";
import { getClassNames } from "../utils/common";
import Button from "./Button";

function ContentPortal(props) {
  const { className, portalTo = "", ...otherProps } = props;

  const headerStart = React.useRef(document.querySelector(portalTo));
  return ReactDOM.createPortal(
    <div
      {...otherProps}
      className={getClassNames(className, "content-portal")}
    />,
    headerStart.current
  );
}

export default ContentPortal;
