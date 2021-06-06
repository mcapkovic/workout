import React from "react";
import { motion } from "framer-motion";
import { FirebaseContext } from "../context";
import {
  Button,
  ButtonPortal,
  ContentPortal,
  StatusPage,
  buttonMotion,
  NavButton,
} from "../common";
import { DEFAULT_SUB_PAGE, SAVING, SAVED } from "../utils/constants";
import { randomPraise, roundNumber } from "../utils/common";
import { ChevronLeft24Regular, Save24Regular } from "@fluentui/react-icons";

function Clicker(props) {
  const { workout, setWorkout, setSubPage, unit, options } = props;
  const { auth, firestore, firebase } = React.useContext(FirebaseContext);
  const [count, setCount] = React.useState(0);
  const { uid, photoURL } = auth.currentUser;
  const [saveStatus, setSaveStatus] = React.useState("");

  const workoutId = workout ? workout.id : -1;
  const pushUp2Ref = firestore.collection(
    `workoutsHistory/${workoutId}/workoutEntries`
  );

  function changeCount(value) {
    let newValue = roundNumber(count + value);
    if (newValue < 0) newValue = 0;
    setCount(newValue);
  }

  const saveCalled = React.useRef(false);
  async function saveCount() {
    if (saveCalled.current) return;

    saveCalled.current = true;
    setSaveStatus(SAVING);

    pushUp2Ref
      .add({
        count,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        uid,
        workoutId,
        type: workout.template || "",
        unit: "",
      })
      .then(() => {
        setSaveStatus(SAVED);

        setTimeout(function () {
          setWorkout(null);
        }, 1000);
      })
      .catch((error) => {
        saveCalled.current = false;
        console.error("Error writing document: ", error);
        // setSaveStatus(ERROR);

        // setTimeout(function () {
        //   setSaveStatus("");
        // }, 1000);
      });
  }

  if (saveStatus === SAVED)
    return <StatusPage status={saveStatus} message={randomPraise()} />;

  if (saveStatus === SAVING) return <StatusPage status={saveStatus} />;

  return (
    <div className="clicker">
      <ContentPortal portalTo="#app-bar-end-main">
        <NavButton disabled={!workout || !count} onClick={saveCount}>
          Save
        </NavButton>
      </ContentPortal>

      <ContentPortal portalTo="#app-bar-start-main">
        <NavButton onClick={() => setSubPage(DEFAULT_SUB_PAGE)}>
          <ChevronLeft24Regular />
        </NavButton>
      </ContentPortal>

      <h1 className="clicker__name">{workout.name}</h1>
      <motion.div
        className="clicker__display"
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
        transition={{ duration: 0.5 }}
      >
        <span className="clicker__display__count">{count}</span>
        {unit && (
          <span className="clicker__display__unit">
            {count > 0 && count < 2 ? unit.singular : unit.plural}
          </span>
        )}
      </motion.div>
      <div className="clicker__controls">
        {options.map((option) => (
          <ButtonPair
            key={option}
            changeCount={changeCount}
            amount={option}
            count={count}
          />
        ))}
      </div>
      <br />
      <div className="clicker__actions"></div>
      <div className="clicker__spacer"/>
      <div className="clicker__id"> {workoutId}</div>
    </div>
  );
}

function ButtonPair(props) {
  const { changeCount, amount, count } = props;
  return (
    <div>
      <Button
        disabled={count <= 0}
        onClick={() => changeCount(-amount)}
        {...buttonMotion.left}
      >
        -{amount}
      </Button>
      <Button onClick={() => changeCount(amount)} {...buttonMotion.right}>
        +{amount}
      </Button>
    </div>
  );
}

export default Clicker;
