import React from "react";
import { BottomNavigation, NavButton, NavigationRail, NavigationDrawer } from "../common";
import { Person24Filled, Person24Regular } from "@fluentui/react-icons";

export default {
  title: "Navigation",
  component: BottomNavigation,
};

export const BottomNavigationStory = () => {
  const [page, setPage] = React.useState("");
  return (
    <div style={{ border: "1px solid black" }}>
      <div style={{ height: "150px" }}></div>
      <BottomNavigation>
        <NavButton
          onClick={() => setPage("EXERCISES")}
          icon={<Person24Regular />}
          activeIcon={<Person24Filled />}
          label="EXERCISES"
          active={page === "EXERCISES"}
        />
        <NavButton
          onClick={() => setPage("ROOMS")}
          icon={<Person24Regular />}
          activeIcon={<Person24Filled />}
          label="ROOMS"
          active={page === "ROOMS"}
        />
        <NavButton
          onClick={() => setPage("PROFILE")}
          icon={<Person24Regular />}
          activeIcon={<Person24Filled />}
          label="PROFILE"
          active={page === "PROFILE"}
        />
      </BottomNavigation>
    </div>
  );
};

BottomNavigationStory.storyName = "Bottom Navigation";

export const NavigationRailStory = () => {
  const [page, setPage] = React.useState("");
  return (
    <div style={{ height: "500px", border: "1px solid black" }}>
      <NavigationRail>
        <NavButton
          onClick={() => setPage("EXERCISES")}
          icon={<Person24Regular />}
          activeIcon={<Person24Filled />}
          label="Exercises"
          active={page === "EXERCISES"}
        />
        <NavButton
          onClick={() => setPage("ROOMS")}
          icon={<Person24Regular />}
          activeIcon={<Person24Filled />}
          label="Rooms"
          active={page === "ROOMS"}
        />
        <NavButton
          onClick={() => setPage("PROFILE")}
          icon={<Person24Regular />}
          activeIcon={<Person24Filled />}
          label="Profile"
          active={page === "PROFILE"}
        />
      </NavigationRail>
    </div>
  );
};

NavigationRailStory.storyName = "Navigation Rail";

export const NavigationDrawerStory = () => {
  const [page, setPage] = React.useState("");
  return (
    <div style={{ height: "500px", border: "1px solid black" }}>
      <NavigationDrawer>
        <NavButton
          onClick={() => setPage("EXERCISES")}
          icon={<Person24Filled />}
          // activeIcon={<Person24Filled />}
          label="Exercises"
          active={page === "EXERCISES"}
        />
        <NavButton
          onClick={() => setPage("ROOMS")}
          icon={<Person24Filled />}
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
    </div>
  );
};

NavigationDrawerStory.storyName = "Navigation Drawer";


