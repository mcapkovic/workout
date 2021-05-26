import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
  useHistory,
  useLocation,
} from "react-router-dom";

import {
  BottomNavigation,
  NavButton,
  NavigationRail,
  NavigationDrawer,
  MainLayout,
  AppBar,
} from "../common";

import {
  Person24Filled,
  Person24Regular,
  ConferenceRoom24Regular,
  ConferenceRoom24Filled,
  TextBulletListSquare24Regular,
  TextBulletListSquare24Filled,
  ChevronLeft24Regular,
} from "@fluentui/react-icons";

function NavBottom(props) {
    const history = useHistory();
    const { pathname } = useLocation();
  
    return (
      <BottomNavigation style={{ position: "fixed", bottom: "0", width: "100%" }}>
        <NavButton
          onClick={() => history.push("/exercises")}
          icon={<TextBulletListSquare24Regular />}
          activeIcon={<TextBulletListSquare24Filled />}
          activeLabel="Exercises"
          active={pathname === "/exercises"}
          ripple
        />
        <NavButton
          onClick={() => history.push("/rooms")}
          icon={<ConferenceRoom24Regular />}
          activeIcon={<ConferenceRoom24Filled />}
          activeLabel="Rooms"
          active={pathname === "/rooms"}
          ripple
        />
        <NavButton
          onClick={() => history.push("/profile")}
          icon={<Person24Regular />}
          activeIcon={<Person24Filled />}
          activeLabel="Profile"
          active={pathname === "/profile"}
          ripple
        />
      </BottomNavigation>
    );
  }

  export default NavBottom;