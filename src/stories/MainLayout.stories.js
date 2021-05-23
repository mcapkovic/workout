import React from "react";
import {
  BottomNavigation,
  NavButton,
  NavigationRail,
  NavigationDrawer,
  MainLayout,
} from "../common";
import useMedia from "../hooks/useMedia";

import {
  Person24Filled,
  Person24Regular,
  ConferenceRoom24Regular,
  ConferenceRoom24Filled,
  TextBulletListSquare24Regular,
  TextBulletListSquare24Filled,
} from "@fluentui/react-icons";

export default {
  title: "Layout",
  component: MainLayout,
};

export const MainLayoutStory = () => {
  const size = useMedia(
    // Media queries
    ["(min-width: 1000px)", "(min-width: 600px)"],
    // Column counts (relates to above media queries by array index)
    ["large", "medium"],
    // Default column count
    "small"
  );

  return (
    <div
      style={{ border: "1px solid black", overflow: "hidden", height: "500px" }}
    >
      <MainLayout
        small={size === "small"}
        medium={size === "medium"}
        large={size === "large"}
        navRail={
          <div style={{ backgroundColor: "red", height: "100%" }}>navRail</div>
        }
        appBar={
          <div style={{ backgroundColor: "green", height: "100%" }}>appBar</div>
        }
        appContent={
          <div style={{ backgroundColor: "orange", height: "100%" }}>
            appContent
          </div>
        }
        navBottom={
          <div style={{ backgroundColor: "blue", height: "100%" }}>
            navBottom
          </div>
        }
        navDrawer={
          <div style={{ backgroundColor: "yellow", height: "100%" }}>
            navDrawer
          </div>
        }
      />
    </div>
  );
};

MainLayoutStory.storyName = "Main layout empty";

export const MainLayoutStory2 = () => {
  const size = useMedia(
    // Media queries
    ["(min-width: 1000px)", "(min-width: 600px)"],
    // Column counts (relates to above media queries by array index)
    ["large", "medium"],
    // Default column count
    "small"
  );
  const [page, setPage] = React.useState("EXERCISES");

  return (
    <div
      style={{ border: "1px solid black", overflow: "hidden", height: "500px" }}
    >
      <MainLayout
        small={size === "small"}
        medium={size === "medium"}
        large={size === "large"}
        navRail={
          <NavigationRail>
            <NavButton
              onClick={() => setPage("EXERCISES")}
              icon={<TextBulletListSquare24Regular />}
              activeIcon={<TextBulletListSquare24Filled />}
              label="Exercises"
              active={page === "EXERCISES"}
              ripple
            />
            <NavButton
              onClick={() => setPage("ROOMS")}
              icon={<ConferenceRoom24Regular />}
              activeIcon={<ConferenceRoom24Filled />}
              label="Rooms"
              active={page === "ROOMS"}
              ripple
            />
            <NavButton
              onClick={() => setPage("PROFILE")}
              icon={<Person24Regular />}
              activeIcon={<Person24Filled />}
              label="Profile"
              active={page === "PROFILE"}
              ripple
            />
          </NavigationRail>
        }
        appBar={<div style={{ height: "100%" }}>appBar</div>}
        appContent={<div style={{ height: "100%" }}>appContent</div>}
        navBottom={
          <BottomNavigation>
            <NavButton
              onClick={() => setPage("EXERCISES")}
              icon={<TextBulletListSquare24Regular />}
              activeIcon={<TextBulletListSquare24Filled />}
              activeLabel="Exercises"
              active={page === "EXERCISES"}
              ripple
            />
            <NavButton
              onClick={() => setPage("ROOMS")}
              icon={<ConferenceRoom24Regular />}
              activeIcon={<ConferenceRoom24Filled />}
              activeLabel="Rooms"
              active={page === "ROOMS"}
              ripple
            />
            <NavButton
              onClick={() => setPage("PROFILE")}
              icon={<Person24Regular />}
              activeIcon={<Person24Filled />}
              activeLabel="Profile"
              active={page === "PROFILE"}
              ripple
            />
          </BottomNavigation>
        }
        navDrawer={
          <NavigationDrawer>
            <NavButton
              onClick={() => setPage("EXERCISES")}
              icon={<TextBulletListSquare24Filled />}
              // activeIcon={<Person24Filled />}
              label="Exercises"
              active={page === "EXERCISES"}
            />
            <NavButton
              onClick={() => setPage("ROOMS")}
              icon={<ConferenceRoom24Filled />}
              // activeIcon={<Person24Filled />}
              label="Rooms"
              active={page === "ROOMS"}
            />
            <NavButton
              onClick={() => setPage("PROFILE")}
              icon={<Person24Filled />}
              // activeIcon={<Person24Filled />}
              label="Profile"
              active={page === "PROFILE"}
            />
          </NavigationDrawer>
        }
      />
    </div>
  );
};

MainLayoutStory2.storyName = "Main layout example";
