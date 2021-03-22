import React from "react";
import { FirebaseContext } from "./context";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { Button, TextBox, ButtonPortal, ContentPortal } from "./common";
import {
  DEFAULT_SUB_PAGE,
  WORKOUT_SUB_PAGE,
  DETAILS_SUB_PAGE,
} from "./utils/constants";

function PushUpCounter(props) {
  const { workout, setWorkout, setSubPage } = props;
  const { auth, firestore, firebase } = React.useContext(FirebaseContext);
  const [count, setCount] = React.useState(0);

  const { uid, photoURL } = auth.currentUser;

  const workoutId = workout ? workout.id : -1;
  const pushUp2Ref = firestore.collection(
    `workoutsHistory/${workoutId}/workoutEntries`
  );

  function changeCount(value) {
    let newValue = count + value;
    if (newValue < 0) newValue = 0;
    setCount(newValue);
  }

  async function saveCount2() {
    console.log(count);

    await pushUp2Ref.add({
      count,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      uid,
      workoutId,
      type: "pushUp",
      unit: "",
    });
    setCount(0);
    setWorkout(null);
  }

  console.log(props);
  return (
    <div className="push-up-counter">
      <ButtonPortal
        destination="#header-end"
        disabled={!workout || !count}
        onClick={saveCount2}
      >
        Save
      </ButtonPortal>

      <ButtonPortal
        destination="#header-start"
        onClick={() => setSubPage(DEFAULT_SUB_PAGE)}
      >
        Cancel
      </ButtonPortal>

      <h1 className="push-up-counter__name">{workout.name}</h1>

      <div className="push-up-counter__count"> {count}</div>
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
      <Button disabled={count <= 0} onClick={() => changeCount(-amount)}>
        -{amount}
      </Button>
      <Button onClick={() => changeCount(amount)}>+{amount}</Button>
    </div>
  );
}

export default PushUpCounter;
