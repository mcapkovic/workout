import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
  useHistory,
  useLocation,
} from "react-router-dom";
import { AnimateSharedLayout } from "framer-motion";

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

function NavDrawer(props) {
  const history = useHistory();
  const { pathname } = useLocation();

  return (
    <NavigationDrawer>
      <AnimateSharedLayout>
        <NavButton
          onClick={() => history.push("/exercises")}
          icon={<TextBulletListSquare24Filled />}
          label="Exercises"
          active={pathname === "/exercises"}
          outline
        />
        <NavButton
          onClick={() => history.push("/rooms")}
          icon={<ConferenceRoom24Filled />}
          label="Rooms"
          active={pathname === "/rooms"}
          outline
        />
        <NavButton
          onClick={() => history.push("/profile")}
          icon={<Person24Filled />}
          label="Profile"
          active={pathname === "/profile"}
          outline
        />
      </AnimateSharedLayout>
    </NavigationDrawer>
  );
}

  export default NavDrawer;