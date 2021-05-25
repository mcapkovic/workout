import React from "react";
import {
  BottomNavigation,
  NavButton,
  NavigationRail,
  NavigationDrawer,
  MainLayout,
  AppBar,
} from "../common";
import useMedia from "../hooks/useMedia";

import {
  Person24Filled,
  Person24Regular,
  ConferenceRoom24Regular,
  ConferenceRoom24Filled,
  TextBulletListSquare24Regular,
  TextBulletListSquare24Filled,
  ChevronLeft24Regular,
} from "@fluentui/react-icons";

export default {
  title: "Infornation",
  component: AppBar,
};

export const AppBarStory = () => {
  const [isStartVisible, setIsStartVisible] = React.useState(true);
  return (
    <div
      style={{
        border: "1px solid black",
        overflow: "hidden",
        margin: "-1rem",
        height: "500px",
      }}
    >
      <AppBar
        startComponent={<ChevronLeft24Regular />}
        centerComponent={isStartVisible ? "Detail Center" : "Center"}
        endComponent="End"
        hideStart={!isStartVisible}
      />
      <button
        onClick={() => setIsStartVisible(!isStartVisible)}
        style={{ margin: "50px" }}
      >
        toggle chevron
      </button>
    </div>
  );
};

AppBarStory.storyName = "AppBar";
