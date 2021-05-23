import React from "react";
import { getClassNames } from "../../utils/common";

function MainLayout(props) {
  const {
    navDrawer,
    navRail,
    appBar,
    appContent,
    navBottom,
    small,
    medium,
    large,
  } = props;
  return (
    <div
      className={getClassNames("main-layout", {
        "main-layout--medium": medium,
        "main-layout--large": large,
      })}
    >
      <div id="appBar">{appBar}</div>
      {medium && <div id="navRail">{navRail}</div>}
      {large && <div id="navDrawer">{navDrawer}</div>}
      <div id="appContent">{appContent} </div>
      {small && <div id="navBottom">{navBottom}</div>}
    </div>
  );
}

export default MainLayout;
