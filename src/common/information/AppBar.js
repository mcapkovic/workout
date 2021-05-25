import React from "react";
import { getClassNames } from "../../utils/common";

function AppBar(props) {
  const {
    startComponent,
    centerComponent,
    endComponent,
    hideStart,
  } = props;
  return (
    <div className="app-bar">
      <div
        className={getClassNames("app-bar__start", {
          "app-bar__start--hidden": hideStart,
        })}
      >
        {startComponent}
      </div>
      <div
        className={getClassNames("app-bar__center", {
          "app-bar__center--push-left": hideStart,
        })}
      >
        {centerComponent}
      </div>
      <div className="app-bar__end">{endComponent}</div>
    </div>
  );
}

export default AppBar;
