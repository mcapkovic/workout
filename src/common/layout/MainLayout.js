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

  const barRef = React.useRef();
  const contentRef = React.useRef();
  const prevScrollpos = React.useRef(0);

  React.useEffect(() => {
    if (medium || large) {
      contentRef.current.onscroll = undefined;
      return;
    }
    prevScrollpos.current = contentRef.current.scrollTop;

    contentRef.current.onscroll = function () {
      var currentScrollPos = contentRef.current.scrollTop;
      if (prevScrollpos.current > currentScrollPos) {
        barRef.current.style.transform = "translateY(0px)";
      } else {
        barRef.current.style.transform = "translateY(-60px)";
      }
      prevScrollpos.current = currentScrollPos;
    };
  }, [small, medium, large]);

  return (
    <div
      className={getClassNames("main-layout", {
        "main-layout--medium": medium,
        "main-layout--large": large,
      })}
    >
      <div ref={barRef} id="appBar">
        {appBar}
      </div>
      {medium && <div id="navRail">{navRail}</div>}
      {large && <div id="navDrawer">{navDrawer}</div>}
      <div ref={contentRef} id="appContent">
        {appContent}{" "}
      </div>
      {small && <div id="navBottom">{navBottom}</div>}
    </div>
  );
}

export default MainLayout;
