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
import usePageChange from "../hooks/usePageChange";
import { PAGES } from "../utils/constants";

function NavBottom(props) {
  const { pageChange, pathname } = usePageChange();
  const exercisePath = PAGES.exercise.path;
  const roomsPath = PAGES.rooms.path;

  return (
    <BottomNavigation style={{ position: "fixed", bottom: "0", width: "100%" }}>
      <NavButton
        onClick={() => pathname !== exercisePath && pageChange(PAGES.exercise)}
        icon={<TextBulletListSquare24Regular />}
        activeIcon={<TextBulletListSquare24Filled />}
        activeLabel={PAGES.exercise.label}
        active={pathname === exercisePath}
        ripple
      />

      <NavButton
        onClick={() => pathname !== roomsPath && pageChange(PAGES.rooms)}
        icon={<ConferenceRoom24Regular />}
        activeIcon={<ConferenceRoom24Filled />}
        activeLabel={PAGES.rooms.label}
        active={pathname === roomsPath}
        ripple
      />

      <NavButton
        onClick={() => pageChange(PAGES.profile)}
        icon={<Person24Regular />}
        activeIcon={<Person24Filled />}
        activeLabel={PAGES.profile.label}
        active={pathname === PAGES.profile.path}
        ripple
      />
    </BottomNavigation>
  );
}

export default NavBottom;
