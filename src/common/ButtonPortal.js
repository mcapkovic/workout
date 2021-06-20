import React from "react";
import ReactDOM from "react-dom";
import { getClassNames } from "../utils/common";
import Button from "./Button";

function ButtonPortal(props) {
  const { className, destination = "", ...buttonProps } = props;

  const headerStart = React.useRef(document.querySelector(destination));
  if(!headerStart.current) return <span />

  return ReactDOM.createPortal(
    <Button
      {...buttonProps}
      className={getClassNames(className, "button-portal")}
    />,
    headerStart.current
  );
}

export default ButtonPortal;
