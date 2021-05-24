import React from "react";
import {
  BottomNavigation,
  NavButton,
  NavigationRail,
  NavigationDrawer,
} from "../common";
import {
  Person24Filled,
  Person24Regular,
  ConferenceRoom24Regular,
  ConferenceRoom24Filled,
  TextBulletListSquare24Regular,
  TextBulletListSquare24Filled,
} from "@fluentui/react-icons";
import { AnimateSharedLayout } from "framer-motion";

export default {
  title: "Navigation",
  component: BottomNavigation,
};

export const BottomNavigationStory = () => {
  const [page, setPage] = React.useState("EXERCISES");

  return (
    <div style={{ border: "1px solid black", overflow: "hidden" }}>
      <div style={{ height: "150px" }}></div>
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
    </div>
  );
};

BottomNavigationStory.storyName = "Bottom Navigation";

export const NavigationRailStory = () => {
  const [page, setPage] = React.useState("EXERCISES");
  return (
    <div
      style={{ height: "500px", border: "1px solid black", overflow: "hidden" }}
    >
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
    </div>
  );
};

NavigationRailStory.storyName = "Navigation Rail";

export const NavigationDrawerStory = () => {
  const [page, setPage] = React.useState("EXERCISES");
  return (
    <div
      style={{ height: "500px", border: "1px solid black", overflow: "hidden" }}
    >
      <NavigationDrawer>
        <AnimateSharedLayout>
          <NavButton
            onClick={() => setPage("EXERCISES")}
            icon={<TextBulletListSquare24Filled />}
            label="Exercises"
            active={page === "EXERCISES"}
            outline
          />
          <NavButton
            onClick={() => setPage("ROOMS")}
            icon={<ConferenceRoom24Filled />}
            label="Rooms"
            active={page === "ROOMS"}
            outline
          />
          <NavButton
            onClick={() => setPage("PROFILE")}
            icon={<Person24Filled />}
            label="Profile"
            active={page === "PROFILE"}
            outline
          />
        </AnimateSharedLayout>
      </NavigationDrawer>
    </div>
  );
};

NavigationDrawerStory.storyName = "Navigation Drawer";
