import React from "react";

function ButtonGroup(props) {
  const { children } = props;
  return <div className="button-group">{children}</div>;
}

export default ButtonGroup;
