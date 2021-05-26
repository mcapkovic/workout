import React from "react";
import { NavButton, NavigationRail } from "../common";
import {
  Person24Filled,
  Person24Regular,
  ConferenceRoom24Regular,
  ConferenceRoom24Filled,
  TextBulletListSquare24Regular,
  TextBulletListSquare24Filled,
} from "@fluentui/react-icons";
import { PAGES } from "../utils/constants";
import usePageChange from "../hooks/usePageChange";

function NavRail(props) {
  const { pageChange, pathname } = usePageChange();

  return (
    <NavigationRail>
      <NavButton
        onClick={() => pageChange(PAGES.exercise)}
        icon={<TextBulletListSquare24Regular />}
        activeIcon={<TextBulletListSquare24Filled />}
        label={PAGES.exercise.label}
        active={pathname === PAGES.exercise.path}
        ripple
      />
      <NavButton
        onClick={() => pageChange(PAGES.rooms)}
        icon={<ConferenceRoom24Regular />}
        activeIcon={<ConferenceRoom24Filled />}
        label={PAGES.rooms.label}
        active={pathname === PAGES.rooms.path}
        ripple
      />
      <NavButton
        onClick={() => pageChange(PAGES.profile)}
        icon={<Person24Regular />}
        activeIcon={<Person24Filled />}
        label={PAGES.profile.label}
        active={pathname === PAGES.profile.path}
        ripple
      />
    </NavigationRail>
  );
}

export default NavRail;
