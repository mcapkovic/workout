import React from "react";
import { getClassNames } from "../utils/common";
import { SAVING, ERROR, SAVED } from "../utils/constants";
import { SuccesState } from "./index";

function StatusPage(props) {
  const { status, className, message, ...otherProps } = props;
  return (
    <div {...otherProps} className={getClassNames(className, "succes-page")}>
      {status === SAVED && <SuccesState />}
      {message && <div className="succes-page__message">{message}</div>}
    </div>
  );
}

export default StatusPage;
