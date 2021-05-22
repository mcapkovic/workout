import React from "react";
import { BottomNavigation, NavButton, NavigationRail, NavigationDrawer } from "../common";
import { Person24Filled, Person24Regular , ConferenceRoom24Regular, ConferenceRoom24Filled, TextBulletListSquare24Regular, TextBulletListSquare24Filled} from "@fluentui/react-icons";

export default {
  title: "Navigation",
  component: BottomNavigation,
};

export const BottomNavigationStory = () => {
  const [page, setPage] = React.useState("EXERCISES");

  // React.useEffect(()=>{
  //   [].map.call(document.querySelectorAll('[anim="ripple"]'), el=> {
  //     el.addEventListener('click',e => {
  //         e = e.touches ? e.touches[0] : e;
  //         const r = el.getBoundingClientRect(), d = Math.sqrt(Math.pow(r.width,2)+Math.pow(r.height,2)) * 2;
  //         el.style.cssText = `--s: 0; --o: 1;`;  
  //         // el.offsetTop; 
  //         console.log(el.offsetTop)
  //         el.style.cssText = `--t: 1; --o: 0; --d: ${d}; --x:${e.clientX - r.left}; --y:${e.clientY - r.top};`
  //     })
  // })
  // },[])

  return (
    <div style={{ border: "1px solid black", overflow: 'hidden' }}>
      <button anim="ripple">dfadfadfadsf</button>
      <div style={{ height: "150px" }}></div>
      <BottomNavigation>
        <NavButton
          onClick={() => setPage("EXERCISES")}
          icon={<TextBulletListSquare24Regular />}
          activeIcon={<TextBulletListSquare24Filled />}
          activeLabel='Exercises'
          active={page === "EXERCISES"}
        />
        <NavButton
          onClick={() => setPage("ROOMS")}
          icon={<ConferenceRoom24Regular />}
          activeIcon={<ConferenceRoom24Filled />}
          activeLabel='Rooms'
          active={page === "ROOMS"}
        />
        <NavButton
          onClick={() => setPage("PROFILE")}
          icon={<Person24Regular />}
          activeIcon={<Person24Filled />}
          activeLabel='Profile'
          active={page === "PROFILE"}
        />
      </BottomNavigation>
    </div>
  );
};

BottomNavigationStory.storyName = "Bottom Navigation";

export const NavigationRailStory = () => {
  const [page, setPage] = React.useState("EXERCISES");
  return (
    <div style={{ height: "500px", border: "1px solid black", overflow: 'hidden' }}>
      <NavigationRail>
        <NavButton
          onClick={() => setPage("EXERCISES")}
          icon={<TextBulletListSquare24Regular />}
          activeIcon={<TextBulletListSquare24Filled />}
          label="Exercises"
          active={page === "EXERCISES"}
        />
        <NavButton
          onClick={() => setPage("ROOMS")}
          icon={<ConferenceRoom24Regular />}
          activeIcon={<ConferenceRoom24Filled />}
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
  const [page, setPage] = React.useState("EXERCISES");
  return (
    <div style={{ height: "500px", border: "1px solid black", overflow: 'hidden'}}>
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
    </div>
  );
};

NavigationDrawerStory.storyName = "Navigation Drawer";


