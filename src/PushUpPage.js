import React, { useRef, useState } from "react";
import { FirebaseContext } from "./context";
import { useCollectionData } from "react-firebase-hooks/firestore";

function PushUpPage(props) {
  const { auth, firestore, firebase } = React.useContext(FirebaseContext);
  const [count, setCount] = React.useState(0);

  const [workout, setWorkout] = React.useState(null);

  const pushUpRef = firestore.collection("pushUp");
  const { uid, photoURL } = auth.currentUser;

  const workoutId = "1l1oXP6osY0YYGaQd7zu";
  const pushUp2Ref = firestore.collection(
    `users/${uid}/workouts/${workoutId}/history`
  );

  const workoutsRef = firestore.collection(`users/${uid}/workouts`);
  const query = workoutsRef.orderBy("createdAt", "asc").limitToLast(25);
  const [workouts = []] = useCollectionData(query, { idField: "id" });

  const pushUp3Ref = firestore.collection(`users/${uid}/workouts/`);

  function changeCount(value) {
    let newValue = count + value;
    if (newValue < 0) newValue = 0;
    setCount(newValue);
  }

  async function saveCount() {
    console.log(count);

    await pushUpRef.add({
      count,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      uid,
      collection: "default",
    });
    setCount(0);
  }

  async function saveCount2() {
    console.log(count);

    await pushUp2Ref.add({
      count,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      uid,
    });
    setCount(0);
  }

  return (
    <div>
      {!workout && <WorkoutsManager workouts={workouts} setWorkout={setWorkout} />}
      {workout && <PushUpCounter workout={workout} setWorkout={setWorkout} />}
    </div>
  );
}
export default PushUpPage;

function WorkoutItem(props) {
  const { item = {}, setWorkout } = props;
  const { id, name } = item;
  console.log("item", props.item);
  return (
    <button onClick={() => setWorkout(item)}>
      {id} - {name}
    </button>
  );
}

function WorkoutsManager(props) {
  const { setWorkout, workouts } = props;
  const { auth, firestore, firebase } = React.useContext(FirebaseContext);
  const { uid, photoURL } = auth.currentUser;

  const workoutsRef = firestore.collection(`users/${uid}/workouts`);

  async function createWorkout() {
    await workoutsRef.add({
      template: "pushUp",
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      name: "Push up",
      uid,
    });
  }

  return (
    <div>
      <div style={{ maxHeight: "200px", overflow: "auto" }}>
        {workouts.length > 0 &&
          workouts.map((item) => (
            <WorkoutItem setWorkout={setWorkout} item={item} />
          ))}
      </div>
      <hr/>
      <div>
        <button onClick={createWorkout}>create new workout</button>
      </div>
    </div>
  );
}

function PushUpCounter(props) {
  const { workout, setWorkout } = props;
  const { auth, firestore, firebase } = React.useContext(FirebaseContext);
  const [count, setCount] = React.useState(0);

  const { uid, photoURL } = auth.currentUser;

  const workoutId = workout ? workout.id : -1;
  const pushUp2Ref = firestore.collection(`users/${uid}/workoutsHistory`);

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
    });
    setCount(0);
    setWorkout(null);
  }

  return (
    <div>
     {workoutId}
      <div style={{ color: "white" }}> {count}</div>
    
      <button onClick={() => changeCount(-1)}>-1</button>
      <button onClick={() => changeCount(1)}>+1</button>
      <button onClick={() => changeCount(-5)}>-5</button>
      <button onClick={() => changeCount(5)}>+5</button>
      <button onClick={() => changeCount(-10)}>-10</button>
      <button onClick={() => changeCount(10)}>+10</button>
      <br/>
      <button disabled={!workout || !count} onClick={saveCount2}>
        save2
      </button>
      <button onClick={() => setWorkout(null)}>cancel</button>
    </div>
  );
}
