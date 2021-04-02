import React from "react";
import { motion } from "framer-motion";
import { FirebaseContext } from "../context";
import {
  Button,
  ButtonPortal,
  ContentPortal,
  StatusPage,
  buttonMotion,
} from "../common";
import { DEFAULT_SUB_PAGE, SAVING, SAVED } from "../utils/constants";
import { randomPraise } from "../utils/common";

function PushUpCounter(props) {
  const { workout, setWorkout, setSubPage } = props;
  const { auth, firestore, firebase } = React.useContext(FirebaseContext);
  const [count, setCount] = React.useState(0);
  const { uid, photoURL } = auth.currentUser;
  const [saveStatus, setSaveStatus] = React.useState("");

  const workoutId = workout ? workout.id : -1;
  const pushUp2Ref = firestore.collection(
    `workoutsHistory/${workoutId}/workoutEntries`
  );

  function changeCount(value) {
    let newValue = count + value;
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

  return (
    <div className="push-up-counter">
      <ButtonPortal
        destination="#header-end"
        disabled={!workout || !count}
        onClick={saveCount}
        {...buttonMotion.left}
      >
        Save
      </ButtonPortal>

      <ButtonPortal
        destination="#header-start"
        onClick={() => setSubPage(DEFAULT_SUB_PAGE)}
        {...buttonMotion.right}
      >
        Cancel
      </ButtonPortal>

      <h1 className="push-up-counter__name">{workout.name}</h1>

      <motion.div
        className="push-up-counter__count"
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
        transition={{ duration: 0.5 }}
      >
        {count}
      </motion.div>
      <div className="push-up-counter__controls">
        <ButtonPair changeCount={changeCount} amount={1} count={count} />
        <ButtonPair changeCount={changeCount} amount={5} count={count} />
        <ButtonPair changeCount={changeCount} amount={10} count={count} />
      </div>

      <br />
      <div className="push-up-counter__actions"></div>

      <ContentPortal portalTo="#footer-center">
        <div className="push-up-counter__id"> {workoutId}</div>
      </ContentPortal>
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

export default PushUpCounter;
