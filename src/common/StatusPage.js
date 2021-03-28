import React from "react";
import { getClassNames } from "../utils/common";
import { SAVING, ERROR, SAVED } from "../utils/constants";
import { SuccesState } from "./index";

function StatusPage(props) {
  const { status, className, ...otherProps } = props;
  return (
    <div {...otherProps} className={getClassNames(className, "succes-page")}>
      {status === SAVED && <SuccesState />}
    </div>
  );
}

export default StatusPage;
