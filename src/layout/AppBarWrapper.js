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
import { PAGES } from "../utils/constants";

import { AppContext, FirebaseContext } from "../context";

function getDefaultTitle(pathname) {
  const currentPage =
    Object.values(PAGES).find((page) => page.path === pathname) || {};
  const { title = "" } = currentPage;
  return title;
}

function AppBarWrapper() {
  const { pathname } = useLocation();
  const [appState = {}] = React.useContext(AppContext);
  const defaultTitle = React.useMemo(() => getDefaultTitle(pathname), []);
  const { appBarData = {} } = appState;
  const { title = defaultTitle, hideStart } = appBarData;

  return (
    <AppBar
      // startComponent={<ChevronLeft24Regular />}
      centerComponent={title}
      // endComponent="End"
      hideStart={hideStart}
    />
  );
}

export default AppBarWrapper;
