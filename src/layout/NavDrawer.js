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
import usePageChange from "../hooks/usePageChange";
import { PAGES } from "../utils/constants";

function NavDrawer(props) {
  const { pageChange, pathname } = usePageChange();
  const exercisePath = PAGES.exercise.path;
  const roomsPath = PAGES.rooms.path;

  return (
    <NavigationDrawer>
      <AnimateSharedLayout>
        <NavButton
          onClick={() =>
            pathname !== exercisePath && pageChange(PAGES.exercise)
          }
          icon={<TextBulletListSquare24Filled />}
          label={PAGES.exercise.label}
          active={pathname === exercisePath}
          outline
        />
        <NavButton
          onClick={() => pathname !== roomsPath && pageChange(PAGES.rooms)}
          icon={<ConferenceRoom24Filled />}
          label={PAGES.rooms.label}
          active={pathname === roomsPath}
          outline
        />
        <NavButton
          onClick={() => pageChange(PAGES.profile)}
          icon={<Person24Filled />}
          label={PAGES.profile.label}
          active={pathname === PAGES.profile.path}
          outline
        />
      </AnimateSharedLayout>
    </NavigationDrawer>
  );
}

export default NavDrawer;
