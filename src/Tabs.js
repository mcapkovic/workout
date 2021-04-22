import React from "react";
import { useHistory, useLocation } from "react-router-dom";

import { ButtonGroup, ButtonGroupItem, ContentPortal } from "./common";

function Tabs() {
  const history = useHistory();
  const { pathname } = useLocation();
  return (
    <ContentPortal portalTo="#header-center">
      <ButtonGroup className="header__center__tabs">
        <ButtonGroupItem
          isSelected={pathname === "/exercises"}
          onClick={() => history.push("/exercises")}
        >
          EXERCISES
        </ButtonGroupItem>
        <ButtonGroupItem
          isSelected={pathname === "/rooms"}
          onClick={() => history.push("/rooms")}
        >
          ROOMS
        </ButtonGroupItem>
        <ButtonGroupItem
          isSelected={pathname === "/profile"}
          onClick={() => history.push("/profile")}
        >
          PROFILE
        </ButtonGroupItem>
      </ButtonGroup>
    </ContentPortal>
  );
}

export default Tabs;
