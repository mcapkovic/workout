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
import { AnimateSharedLayout } from "framer-motion";

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
      style={{
        border: "1px solid black",
        overflow: "hidden",
        margin: "-1rem",
        height: "500px",
      }}
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
          <div style={{ backgroundColor: "orange" }}>{contentText}</div>
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

/**
 * example with real components
 */
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
      style={{
        border: "1px solid black",
        overflow: "hidden",
        margin: "-1rem",
        height: "500px",
      }}
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
        appBar={
          <AppBar
            startComponent={<ChevronLeft24Regular />}
            centerComponent={page === "EXERCISES" ? "Center" : "Detail Center"}
            endComponent="End"
            hideStart={page === "EXERCISES"}
          />
        }
        appContent={
          <div>{page === "EXERCISES" ? <ListExample /> : contentText}</div>
        }
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
            <AnimateSharedLayout>
              <NavButton
                onClick={() => setPage("EXERCISES")}
                icon={<TextBulletListSquare24Filled />}
                // activeIcon={<Person24Filled />}
                label="Exercises"
                active={page === "EXERCISES"}
                outline
              />
              <NavButton
                onClick={() => setPage("ROOMS")}
                icon={<ConferenceRoom24Filled />}
                // activeIcon={<Person24Filled />}
                label="Rooms"
                active={page === "ROOMS"}
                outline
              />
              <NavButton
                onClick={() => setPage("PROFILE")}
                icon={<Person24Filled />}
                // activeIcon={<Person24Filled />}
                label="Profile"
                active={page === "PROFILE"}
                outline
              />
            </AnimateSharedLayout>
          </NavigationDrawer>
        }
      />
    </div>
  );
};

MainLayoutStory2.storyName = "Main layout example";

const contentText = `
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi non
lectus sit amet tortor auctor ornare. Duis non blandit felis, quis
imperdiet augue. Fusce leo velit, imperdiet in pretium ut, rutrum id
leo. Fusce et efficitur dui. In lorem tortor, auctor sed nisl ut,
vulputate fringilla felis. Etiam aliquet tortor in purus varius, at
imperdiet nisl bibendum. Vivamus vehicula vehicula eros nec
molestie. Pellentesque nec eros accumsan diam bibendum ultrices non
ut massa. Ut vitae facilisis mauris. Pellentesque habitant morbi
tristique senectus et netus et malesuada fames ac turpis egestas.
Curabitur ullamcorper pharetra enim ac gravida. Nullam viverra
porttitor dui. Sed eu massa enim. Mauris porta est et purus
consectetur, in ultricies lectus placerat. Sed dictum, tortor nec
venenatis bibendum, odio ante dictum metus, ac feugiat nisl velit in
magna. Sed mauris velit, vehicula at sollicitudin quis, commodo non
orci. Aliquam ultricies libero nisl, et molestie tellus scelerisque
ac. Sed imperdiet est ac est aliquam, sed mattis dolor molestie.
Orci varius natoque penatibus et magnis dis parturient montes,
nascetur ridiculus mus. Morbi scelerisque lorem aliquam ex rhoncus,
ornare convallis dui lacinia. Mauris elementum at mauris venenatis
volutpat. Integer efficitur lorem hendrerit dignissim tempus. Fusce
sem leo, volutpat convallis consectetur molestie, accumsan at
sapien. Vestibulum ut ultrices augue. Maecenas sit amet mi sit amet
lectus pellentesque suscipit et et tellus. Curabitur vehicula
maximus tortor vel placerat. Ut cursus leo ut diam placerat accumsan
in non risus. Integer quam eros, sodales non ex sit amet, volutpat
semper ipsum. Duis sed porttitor libero, at aliquam massa. Aliquam
erat volutpat. Sed mattis pulvinar orci, vitae dapibus erat
malesuada eget. Cras dignissim neque in nisl iaculis, sit amet porta
ligula venenatis. Fusce consequat pharetra orci at ultrices. Nulla
eget ligula eu ante consequat blandit. Donec imperdiet, sem ut
molestie condimentum, nunc leo volutpat diam, lacinia egestas velit
nisi id ligula. Lorem ipsum dolor sit amet, consectetur adipiscing
elit. Sed sagittis ex ac nunc molestie, nec finibus leo hendrerit.
Suspendisse malesuada libero a augue interdum, vitae convallis velit
tincidunt. Vivamus porttitor sem non lorem fermentum tempor. Nulla
imperdiet erat turpis, quis cursus sem vehicula interdum. Curabitur
ut cursus lorem. Nulla auctor fermentum ligula in cursus. Cras sed
nisl neque. Phasellus posuere luctus odio et commodo. Curabitur sed
ultricies enim. Praesent ac metus ut ex pellentesque efficitur.
Suspendisse efficitur nisl ut risus auctor, eget hendrerit eros
commodo. Nunc placerat eget ante nec luctus. Integer tristique
lectus in mollis auctor. Pellentesque sollicitudin ornare facilisis.
Quisque nibh dolor, scelerisque id pellentesque vitae, mattis nec
ante. Sed arcu elit, tincidunt eu lorem quis, eleifend luctus leo.
Maecenas viverra laoreet leo nec viverra. Pellentesque mi lacus,
vehicula eget egestas vel, lobortis et est. Nam eget porta lorem.
`;

function ListExample() {
  const items = contentText.split(" ").slice(0, 30);
  return (
    <div>
      List
      <ul>
        {items.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>
    </div>
  );
}
