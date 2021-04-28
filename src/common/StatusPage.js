import React from "react";
import { getClassNames } from "../utils/common";
import { SAVING, ERROR, SAVED } from "../utils/constants";
import { SuccesState, LoadingState } from "./index";

function StatusPage(props) {
  const { status, className, message, ...otherProps } = props;

  if (status === SAVING)
    return (
      <div {...otherProps} className={getClassNames(className, "succes-page")}>
       <LoadingState />
      </div>
    );

  return (
    <div {...otherProps} className={getClassNames(className, "succes-page")}>
      {status === SAVED && <SuccesState />}
      {message && <div className="succes-page__message">{message}</div>}
    </div>
  );
}

export default StatusPage;
