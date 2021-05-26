import React from "react";
import { getClassNames } from "../../utils/common";

function AppBar(props) {
  const {
    startComponent,
    centerComponent,
    endComponent,
    hideStart,
    id = "main",
  } = props;
  return (
    <div className="app-bar">
      <div
        id={`app-bar-start-${id}`}
        className={getClassNames("app-bar__start", {
          "app-bar__start--hidden": hideStart,
        })}
      >
        {startComponent}
      </div>
      <div
        id={`app-bar-center-${id}`}
        className={getClassNames("app-bar__center", {
          "app-bar__center--push-left": hideStart,
        })}
      >
        {centerComponent}
      </div>
      <div id={`app-bar-end-${id}`} className="app-bar__end">
        {endComponent}
      </div>
    </div>
  );
}

export default AppBar;
